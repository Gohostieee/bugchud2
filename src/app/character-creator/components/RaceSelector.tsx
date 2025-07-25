'use client'

import { RACES, Race, applyRacialModifiers } from '@/utils/character-data'
import { GeneratedAttributes } from '../hooks/useCharacterCreation'

interface RaceSelectorProps {
  attributes?: GeneratedAttributes
  selectedRace?: Race
  onRaceSelected: (race: Race) => void
  onNext: () => void
  onPrev: () => void
}

export function RaceSelector({ 
  attributes, 
  selectedRace, 
  onRaceSelected, 
  onNext, 
  onPrev 
}: RaceSelectorProps) {

  const getModifiedAttributes = (race: Race) => {
    if (!attributes) return null
    return applyRacialModifiers(attributes, race)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Race</h2>
        <p className="text-gray-300">
          Each race has different attribute loyalties that will affect your character's capabilities.
        </p>
      </div>

      {/* Race Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {RACES.map((race) => {
          const modifiedAttrs = getModifiedAttributes(race)
          const isSelected = selectedRace?.id === race.id

          return (
            <div
              key={race.id}
              onClick={() => onRaceSelected(race)}
              className={`
                cursor-pointer border-2 rounded-lg p-6 transition-colors
                ${isSelected
                  ? 'border-purple-500 bg-purple-600/20'
                  : 'border-purple-500/30 bg-black/20 hover:border-purple-400/50 hover:bg-purple-600/10'
                }
              `}
            >
              {/* Race Header */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{race.name}</h3>
                <p className="text-gray-300 text-sm">{race.description}</p>
              </div>

              {/* Attribute Modifiers */}
              {modifiedAttrs && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Attribute Loyalties</h4>
                  <div className="space-y-1">
                    <AttributeModifier
                      name="TWITCH"
                      value={modifiedAttrs.twitch.value}
                      loyalty={modifiedAttrs.twitch.loyalty}
                    />
                    <AttributeModifier
                      name="FLESH"
                      value={modifiedAttrs.flesh.value}
                      loyalty={modifiedAttrs.flesh.loyalty}
                    />
                    <AttributeModifier
                      name="MOJO"
                      value={modifiedAttrs.mojo.value}
                      loyalty={modifiedAttrs.mojo.loyalty}
                    />
                  </div>
                </div>
              )}

              {/* Special Rules */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Special Rules</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  {race.specialRules.map((rule, index) => (
                    <li key={index}>• {rule}</li>
                  ))}
                </ul>
              </div>

              {/* Restrictions */}
              {race.restrictions && race.restrictions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">Restrictions</h4>
                  <ul className="text-xs text-red-300 space-y-1">
                    {race.restrictions.map((restriction, index) => (
                      <li key={index}>• {restriction}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Selection Indicator */}
              {isSelected && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-600 text-white text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Selected
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors"
        >
          ← Back to Attributes
        </button>
        
        {selectedRace && (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Continue to Origin →
          </button>
        )}
      </div>
    </div>
  )
}

function AttributeModifier({ 
  name, 
  value, 
  loyalty 
}: { 
  name: string
  value: number
  loyalty: 'favored' | 'middling' | 'treacherous'
}) {
  const loyaltyColor = {
    favored: 'text-green-400',
    middling: 'text-yellow-400',
    treacherous: 'text-red-400'
  }[loyalty]

  const loyaltySymbol = {
    favored: '★',
    middling: '●',
    treacherous: '!'
  }[loyalty]

  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-white">{name}</span>
      <div className="flex items-center space-x-2">
        <span className="text-white font-semibold">{value}</span>
        <span className={`${loyaltyColor} font-bold`} title={loyalty}>
          {loyaltySymbol}
        </span>
      </div>
    </div>
  )
} 