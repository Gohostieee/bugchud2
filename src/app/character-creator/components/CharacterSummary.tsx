'use client'

import { applyRacialModifiers, calculateDerivedStats } from '@/utils/character-data'

interface CharacterSummaryProps {
  character: any
  onConfirm: () => Promise<void>
  onEdit: (step: number) => void
  onPrev: () => void
  isSaving: boolean
  isValid: boolean
}

export function CharacterSummary({ 
  character, 
  onConfirm, 
  onEdit, 
  onPrev,
  isSaving,
  isValid
}: CharacterSummaryProps) {

  const modifiedAttributes = character.attributes && character.race 
    ? applyRacialModifiers(character.attributes, character.race)
    : null

  const derivedStats = modifiedAttributes 
    ? calculateDerivedStats(modifiedAttributes)
    : null

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Character Summary</h2>
        <p className="text-gray-300">
          Review your character before saving. You can edit any section by clicking the edit buttons.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Basic Information</h3>
              <button
                onClick={() => onEdit(6)}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white font-semibold">{character.details?.name || 'Unnamed'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Race:</span>
                <span className="text-white">{character.race?.name || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Origin:</span>
                <span className="text-white">{character.origin?.name || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Faith:</span>
                <span className="text-white">
                  {character.faith?.name || 'No Faith'}
                  {character.covenant && character.faith && ' (Covenant)'}
                </span>
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Attributes</h3>
              <button
                onClick={() => onEdit(1)}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                Edit
              </button>
            </div>
            
            {modifiedAttributes && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-600/20 border border-green-500/30 rounded">
                  <div className="text-2xl font-bold text-white">{modifiedAttributes.twitch.value}</div>
                  <div className="text-sm text-white">TWITCH</div>
                  <div className="text-xs text-green-400">{modifiedAttributes.twitch.loyalty}</div>
                </div>
                <div className="text-center p-3 bg-red-600/20 border border-red-500/30 rounded">
                  <div className="text-2xl font-bold text-white">{modifiedAttributes.flesh.value}</div>
                  <div className="text-sm text-white">FLESH</div>
                  <div className="text-xs text-red-400">{modifiedAttributes.flesh.loyalty}</div>
                </div>
                <div className="text-center p-3 bg-blue-600/20 border border-blue-500/30 rounded">
                  <div className="text-2xl font-bold text-white">{modifiedAttributes.mojo.value}</div>
                  <div className="text-sm text-white">MOJO</div>
                  <div className="text-xs text-blue-400">{modifiedAttributes.mojo.loyalty}</div>
                </div>
                <div className="text-center p-3 bg-yellow-600/20 border border-yellow-500/30 rounded">
                  <div className="text-2xl font-bold text-white">{character.attributes?.zimes || 0}</div>
                  <div className="text-sm text-white">ZIMES</div>
                  <div className="text-xs text-yellow-400">currency</div>
                </div>
              </div>
            )}

            {derivedStats && (
              <div className="mt-4 pt-4 border-t border-purple-500/30">
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Derived Stats</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bones:</span>
                    <span className="text-white">{derivedStats.bones}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mana Dice:</span>
                    <span className="text-white">{derivedStats.manaDice}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Backgrounds */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Backgrounds</h3>
              <button
                onClick={() => onEdit(3)}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-2">
              {character.backgrounds?.map((bg: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-white">{bg.name}</span>
                  {bg.isUnique && (
                    <span className="px-2 py-1 text-xs bg-yellow-600 text-white rounded">
                      Unique
                    </span>
                  )}
                </div>
              )) || <span className="text-gray-400">No backgrounds selected</span>}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Equipment */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Equipment</h3>
              <button
                onClick={() => onEdit(5)}
                className="text-purple-300 hover:text-purple-200 text-sm"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-3">
              {character.equipment?.weapons?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-1">Weapons</h4>
                  <ul className="text-sm text-gray-300">
                    {character.equipment.weapons.map((weapon: any, index: number) => (
                      <li key={index}>• {weapon.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {character.equipment?.armor?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-1">Armor</h4>
                  <ul className="text-sm text-gray-300">
                    {character.equipment.armor.map((armor: any, index: number) => (
                      <li key={index}>• {armor.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {character.equipment?.equipment?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-1">Equipment</h4>
                  <ul className="text-sm text-gray-300">
                    {character.equipment.equipment.map((equipment: any, index: number) => (
                      <li key={index}>• {equipment.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {character.equipment?.containers?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-1">Containers</h4>
                  <ul className="text-sm text-gray-300">
                    {character.equipment.containers.map((container: any, index: number) => (
                      <li key={index}>• {container.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(!character.equipment?.weapons?.length && 
                !character.equipment?.armor?.length && 
                !character.equipment?.equipment?.length && 
                !character.equipment?.containers?.length) && (
                <span className="text-gray-400">No equipment selected</span>
              )}
            </div>
          </div>

          {/* Description */}
          {(character.details?.description || character.details?.notes) && (
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Character Details</h3>
                <button
                  onClick={() => onEdit(6)}
                  className="text-purple-300 hover:text-purple-200 text-sm"
                >
                  Edit
                </button>
              </div>
              
              {character.details?.description && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Description</h4>
                  <p className="text-sm text-gray-300">{character.details.description}</p>
                </div>
              )}

              {character.details?.notes && (
                <div>
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Background & Personality</h4>
                  <p className="text-sm text-gray-300">{character.details.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Special Abilities */}
          {(character.race?.specialRules?.length > 0 || 
            character.backgrounds?.some((bg: any) => bg.specialAbilities?.length > 0)) && (
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Special Abilities</h3>
              
              <div className="space-y-3">
                {character.race?.specialRules?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-purple-300 mb-1">Racial Abilities</h4>
                    <ul className="text-sm text-gray-300">
                      {character.race.specialRules.map((rule: string, index: number) => (
                        <li key={index}>• {rule}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {character.backgrounds?.map((bg: any, bgIndex: number) => (
                  bg.specialAbilities?.length > 0 && (
                    <div key={bgIndex}>
                      <h4 className="text-sm font-semibold text-purple-300 mb-1">{bg.name} Abilities</h4>
                      <ul className="text-sm text-gray-300">
                        {bg.specialAbilities.map((ability: string, index: number) => (
                          <li key={index}>• {ability}</li>
                        ))}
                      </ul>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors"
        >
          ← Back to Details
        </button>
        
        <button
          onClick={onConfirm}
          disabled={!isValid || isSaving}
          className={`
            px-8 py-3 rounded-lg font-semibold transition-colors
            ${isValid && !isSaving
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isSaving ? 'Saving Character...' : 'Save Character'}
        </button>
      </div>
    </div>
  )
} 