'use client'

import { useState, useCallback } from 'react'
import { GeneratedAttributes } from '../hooks/useCharacterCreation'

interface AttributeRollerProps {
  attributes?: GeneratedAttributes
  onAttributesGenerated: (attributes?: GeneratedAttributes) => void
  onNext: () => void
}

interface DiceResult {
  id: number
  value: number
  assigned?: boolean
}

interface AttributeAssignment {
  twitch?: number
  flesh?: number
  mojo?: number
  zimes?: number
}

export function AttributeRoller({ attributes, onAttributesGenerated, onNext }: AttributeRollerProps) {
  const [isRolling, setIsRolling] = useState(false)
  const [diceResults, setDiceResults] = useState<DiceResult[]>([])
  const [assignments, setAssignments] = useState<AttributeAssignment>({})
  const [selectedDie, setSelectedDie] = useState<number | null>(null)
  const [isAssignmentPhase, setIsAssignmentPhase] = useState(false)

  const rollDice = () => {
    const results: DiceResult[] = []
    for (let i = 0; i < 4; i++) {
      results.push({
        id: i,
        value: Math.floor(Math.random() * 4) + 1,
        assigned: false
      })
    }
    return results
  }

  const handleRoll = useCallback(async () => {
    setIsRolling(true)
    setIsAssignmentPhase(false)
    setAssignments({})
    setSelectedDie(null)
    
    // Simulate dice rolling animation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const results = rollDice()
    setDiceResults(results)
    setIsAssignmentPhase(true)
    setIsRolling(false)
  }, [])

  const handleReroll = useCallback(() => {
    if (window.confirm('Are you sure you want to reroll your attributes? This will generate completely new values.')) {
      // Reset all state and start over
      setIsAssignmentPhase(false)
      setAssignments({})
      setSelectedDie(null)
      setDiceResults([])
      handleRoll()
    }
  }, [handleRoll])

  const handleDieClick = (dieId: number) => {
    const die = diceResults.find(d => d.id === dieId)
    if (die && !die.assigned) {
      setSelectedDie(dieId)
    }
  }

  const handleAttributeClick = (attributeName: keyof AttributeAssignment) => {
    if (selectedDie === null) return

    const selectedDieData = diceResults.find(d => d.id === selectedDie)
    if (!selectedDieData) return

    // If attribute already has a value, return that die to the pool
    const currentValue = assignments[attributeName]
    if (currentValue !== undefined) {
      const currentDie = diceResults.find(d => d.value === currentValue && d.assigned)
      if (currentDie) {
        currentDie.assigned = false
      }
    }

    // Assign the selected die to this attribute
    setAssignments(prev => ({
      ...prev,
      [attributeName]: selectedDieData.value
    }))

    // Mark the die as assigned
    selectedDieData.assigned = true
    setDiceResults([...diceResults])
    setSelectedDie(null)
  }

  const handleAttributeClear = (attributeName: keyof AttributeAssignment) => {
    const currentValue = assignments[attributeName]
    if (currentValue !== undefined) {
      // Find the die with this value and mark it as unassigned
      const die = diceResults.find(d => d.value === currentValue && d.assigned)
      if (die) {
        die.assigned = false
        setDiceResults([...diceResults])
      }

      // Clear the assignment
      setAssignments(prev => {
        const newAssignments = { ...prev }
        delete newAssignments[attributeName]
        return newAssignments
      })
    }
  }

  const allAssigned = Object.keys(assignments).length === 4

  const handleFinishAssignment = () => {
    if (allAssigned) {
      // Convert assignments to the expected format and call the parent function
      const finalAttributes: GeneratedAttributes = {
        twitch: assignments.twitch!,
        flesh: assignments.flesh!,
        mojo: assignments.mojo!,
        zimes: assignments.zimes!
      }
      
      // Pass the assigned attributes to the parent component
      onAttributesGenerated(finalAttributes)
      
      // Advance to the next step
      onNext()
    }
  }

  // If we have finalized attributes and we're not in assignment phase, show the final view
  if (attributes && !isAssignmentPhase && allAssigned) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Your Character Attributes</h2>
          <p className="text-gray-300">
            Your attributes have been assigned. You can reroll if you want to try again.
          </p>
        </div>

        {/* Final Attribute Results */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <AttributeCard
            name="TWITCH"
            value={attributes.twitch}
            description="Speed and dexterity"
            color="bg-green-600/20 border-green-500/30"
          />
          <AttributeCard
            name="FLESH"
            value={attributes.flesh}
            description="Strength and endurance"
            color="bg-red-600/20 border-red-500/30"
          />
          <AttributeCard
            name="MOJO"
            value={attributes.mojo}
            description="Magic and willpower"
            color="bg-blue-600/20 border-blue-500/30"
          />
          <AttributeCard
            name="ZIMES"
            value={attributes.zimes}
            description="Starting currency"
            color="bg-yellow-600/20 border-yellow-500/30"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleReroll}
            className="px-6 py-2 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors"
          >
            Reroll Attributes
          </button>
          
          <button
            onClick={onNext}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Continue to Race Selection →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Generate Your Attributes</h2>
        <p className="text-gray-300">
          Roll 4d4, then assign each result to your preferred attribute: TWITCH, FLESH, MOJO, and ZIMES.
        </p>
      </div>

      {/* Dice Rolling Area */}
      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-8 mb-8">
        <div className="text-center mb-6">
          {!isAssignmentPhase ? (
            <>
              <div className="flex justify-center space-x-4 mb-6">
                {[1, 2, 3, 4].map((die) => (
                  <div
                    key={die}
                    className={`
                      w-16 h-16 border-2 border-purple-400 rounded-lg bg-purple-800/50 
                      flex items-center justify-center text-2xl font-bold text-white
                      ${isRolling ? 'animate-bounce' : ''}
                    `}
                    style={{ animationDelay: `${die * 0.1}s` }}
                  >
                    {isRolling ? '?' : '?'}
                  </div>
                ))}
              </div>

              <button
                onClick={handleRoll}
                disabled={isRolling}
                className={`
                  px-8 py-3 rounded-lg font-semibold text-white transition-colors
                  ${isRolling
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                  }
                `}
              >
                {isRolling ? 'Rolling...' : 'Roll 4d4'}
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white mb-4">Your Dice Results</h3>
              <div className="flex justify-center space-x-4 mb-6">
                {diceResults.map((die) => (
                  <div
                    key={die.id}
                    onClick={() => handleDieClick(die.id)}
                    className={`
                      w-16 h-16 border-2 rounded-lg flex items-center justify-center text-2xl font-bold transition-colors cursor-pointer
                      ${die.assigned 
                        ? 'border-gray-600 bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                        : selectedDie === die.id
                        ? 'border-yellow-400 bg-yellow-600/20 text-yellow-300'
                        : 'border-purple-400 bg-purple-800/50 text-white hover:border-purple-300'
                      }
                    `}
                  >
                    {die.value}
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-300 mb-4">
                {selectedDie !== null 
                  ? "Click an attribute below to assign the selected die" 
                  : "Click a die above to select it, then click an attribute below to assign it"
                }
              </p>

              <button
                onClick={handleReroll}
                className="px-6 py-2 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors"
              >
                Reroll All Dice
              </button>
            </>
          )}
        </div>
      </div>

      {/* Attribute Assignment Area */}
      {isAssignmentPhase && (
        <>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Assign Dice to Attributes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AssignmentCard
                name="TWITCH"
                value={assignments.twitch}
                description="Speed and dexterity"
                color="bg-green-600/20 border-green-500/30"
                onClick={() => handleAttributeClick('twitch')}
                onClear={() => handleAttributeClear('twitch')}
                selectedDie={selectedDie}
              />
              <AssignmentCard
                name="FLESH"
                value={assignments.flesh}
                description="Strength and endurance"
                color="bg-red-600/20 border-red-500/30"
                onClick={() => handleAttributeClick('flesh')}
                onClear={() => handleAttributeClear('flesh')}
                selectedDie={selectedDie}
              />
              <AssignmentCard
                name="MOJO"
                value={assignments.mojo}
                description="Magic and willpower"
                color="bg-blue-600/20 border-blue-500/30"
                onClick={() => handleAttributeClick('mojo')}
                onClear={() => handleAttributeClear('mojo')}
                selectedDie={selectedDie}
              />
              <AssignmentCard
                name="ZIMES"
                value={assignments.zimes}
                description="Starting currency"
                color="bg-yellow-600/20 border-yellow-500/30"
                onClick={() => handleAttributeClick('zimes')}
                onClear={() => handleAttributeClear('zimes')}
                selectedDie={selectedDie}
              />
            </div>
          </div>

          {/* Continue Button */}
          {allAssigned && (
            <div className="flex justify-end">
              <button
                onClick={handleFinishAssignment}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Continue to Race Selection →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function AttributeCard({ 
  name, 
  value, 
  description, 
  color 
}: { 
  name: string
  value: number
  description: string
  color: string
}) {
  return (
    <div className={`${color} rounded-lg p-4 text-center`}>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-lg font-semibold text-white mb-1">{name}</div>
      <div className="text-sm text-gray-300">{description}</div>
    </div>
  )
}

function AssignmentCard({ 
  name, 
  value, 
  description, 
  color,
  onClick,
  onClear,
  selectedDie
}: { 
  name: string
  value?: number
  description: string
  color: string
  onClick: () => void
  onClear: () => void
  selectedDie: number | null
}) {
  return (
    <div 
      className={`
        ${color} rounded-lg p-4 text-center cursor-pointer transition-all border-2
        ${value !== undefined 
          ? 'border-white/50' 
          : selectedDie !== null 
          ? 'border-purple-300 hover:border-white' 
          : 'border-transparent hover:border-purple-400'
        }
      `}
      onClick={value !== undefined ? onClear : onClick}
    >
      <div className="text-2xl font-bold text-white mb-1">
        {value !== undefined ? value : '?'}
      </div>
      <div className="text-lg font-semibold text-white mb-1">{name}</div>
      <div className="text-sm text-gray-300 mb-2">{description}</div>
      {value !== undefined ? (
        <div className="text-xs text-purple-300">Click to unassign</div>
      ) : selectedDie !== null ? (
        <div className="text-xs text-purple-300">Click to assign selected die</div>
      ) : (
        <div className="text-xs text-gray-400">Select a die first</div>
      )}
    </div>
  )
} 