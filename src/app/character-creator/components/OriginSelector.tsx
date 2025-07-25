'use client'

import { useState } from 'react'
import { ORIGINS, BACKGROUNDS, Origin, Background, getBackgroundsByOrigin } from '@/utils/character-data'
import { ValidationErrors } from '../hooks/useCharacterCreation'

interface OriginSelectorProps {
  selectedOrigin?: Origin
  selectedBackgrounds: Background[]
  onOriginSelected: (origin: Origin) => void
  onBackgroundsSelected: (backgrounds: Background[]) => void
  onNext: () => void
  onPrev: () => void
  errors: ValidationErrors
}

export function OriginSelector({ 
  selectedOrigin, 
  selectedBackgrounds, 
  onOriginSelected, 
  onBackgroundsSelected, 
  onNext, 
  onPrev,
  errors
}: OriginSelectorProps) {
  const [availableBackgrounds, setAvailableBackgrounds] = useState<Background[]>([])

  const handleOriginSelect = (origin: Origin) => {
    onOriginSelected(origin)
    const backgrounds = getBackgroundsByOrigin(origin.id)
    setAvailableBackgrounds(backgrounds)
  }

  const handleBackgroundToggle = (background: Background) => {
    const isSelected = selectedBackgrounds.some(bg => bg.id === background.id)
    
    if (isSelected) {
      // Remove background
      onBackgroundsSelected(selectedBackgrounds.filter(bg => bg.id !== background.id))
    } else if (selectedBackgrounds.length < 3) {
      // Add background if under limit
      onBackgroundsSelected([...selectedBackgrounds, background])
    }
  }

  const canProceed = selectedOrigin && selectedBackgrounds.length === 3

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Origin & Backgrounds</h2>
        <p className="text-gray-300">
          Select your character's origin, then choose 3 backgrounds (minimum 2 from your origin).
        </p>
      </div>

      {/* Origin Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Origin</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {ORIGINS.map((origin) => (
            <div
              key={origin.id}
              onClick={() => handleOriginSelect(origin)}
              className={`
                cursor-pointer border-2 rounded-lg p-4 transition-colors
                ${selectedOrigin?.id === origin.id
                  ? 'border-purple-500 bg-purple-600/20'
                  : 'border-purple-500/30 bg-black/20 hover:border-purple-400/50'
                }
              `}
            >
              <h4 className="text-lg font-bold text-white mb-2">{origin.name}</h4>
              <p className="text-gray-300 text-sm mb-3">{origin.description}</p>
              <div>
                <h5 className="text-sm font-semibold text-purple-300 mb-1">Special Rules</h5>
                <ul className="text-xs text-gray-300">
                  {origin.specialRules.map((rule, index) => (
                    <li key={index}>• {rule}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Selection */}
      {selectedOrigin && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">
              Backgrounds ({selectedBackgrounds.length}/3)
            </h3>
            {errors.backgrounds && (
              <span className="text-red-400 text-sm">{errors.backgrounds}</span>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBackgrounds.map((background) => {
              const isSelected = selectedBackgrounds.some(bg => bg.id === background.id)
              const canSelect = selectedBackgrounds.length < 3 || isSelected
              const uniqueCount = selectedBackgrounds.filter(bg => bg.isUnique).length

              return (
                <div
                  key={background.id}
                  onClick={() => canSelect && handleBackgroundToggle(background)}
                  className={`
                    border-2 rounded-lg p-4 transition-colors relative
                    ${isSelected
                      ? 'border-purple-500 bg-purple-600/20 cursor-pointer'
                      : canSelect
                      ? 'border-purple-500/30 bg-black/20 hover:border-purple-400/50 cursor-pointer'
                      : 'border-gray-600 bg-gray-800/20 opacity-50 cursor-not-allowed'
                    }
                  `}
                >
                  {/* Unique Badge */}
                  {background.isUnique && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-1 text-xs bg-yellow-600 text-white rounded">
                        Unique
                      </span>
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white mb-2">{background.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{background.description}</p>
                  
                  {/* Starting Equipment */}
                  <div className="mb-3">
                    <h5 className="text-sm font-semibold text-purple-300 mb-1">Starting Equipment</h5>
                    <div className="text-xs text-gray-300">
                      {background.startingEquipment.join(', ')}
                    </div>
                  </div>

                  {/* Special Abilities */}
                  <div className="mb-3">
                    <h5 className="text-sm font-semibold text-purple-300 mb-1">Special Abilities</h5>
                    <ul className="text-xs text-gray-300">
                      {background.specialAbilities.map((ability, index) => (
                        <li key={index}>• {ability}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Skill Bonuses */}
                  {Object.keys(background.skillBonuses).length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-purple-300 mb-1">Skill Bonuses</h5>
                      <div className="text-xs text-gray-300">
                        {Object.entries(background.skillBonuses).map(([skill, bonus]) => (
                          <span key={skill} className="inline-block mr-2">
                            {skill} +{bonus}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 left-2">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors"
        >
          ← Back to Race
        </button>
        
        {canProceed && (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Continue to Faith →
          </button>
        )}
      </div>
    </div>
  )
} 