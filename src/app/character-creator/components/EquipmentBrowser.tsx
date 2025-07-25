'use client'

import { useState } from 'react'
import { 
  WEAPONS, 
  ARMOR, 
  EQUIPMENT, 
  CONTAINER_TYPES,
  Weapon,
  Armor as ArmorType,
  Equipment as EquipmentType,
  Container
} from '@/utils/character-data'
import { SelectedEquipment, ValidationErrors } from '../hooks/useCharacterCreation'
import { useEquipmentManagement } from '../hooks/useEquipmentManagement'
import { EncumbranceDisplay } from './EncumbranceDisplay'
import { 
  getItemQuantity, 
  addItemToEquipment, 
  removeItemFromEquipment, 
  removeAllItemsFromEquipment 
} from '@/utils/equipment-helpers'

interface EquipmentBrowserProps {
  selectedEquipment: SelectedEquipment
  startingEquipment: string[]
  startingZimes: number  // Kept for encumbrance calculations
  onEquipmentSelected: (equipment: SelectedEquipment) => void
  onNext: () => void
  onPrev: () => void
  errors: ValidationErrors
}

export function EquipmentBrowser({ 
  selectedEquipment, 
  startingEquipment,
  startingZimes,
  onEquipmentSelected, 
  onNext, 
  onPrev,
  errors
}: EquipmentBrowserProps) {
  const [activeTab, setActiveTab] = useState<'weapons' | 'armor' | 'equipment' | 'containers'>('weapons')
  
  // Use equipment management system (money not used for validation anymore)
  const { encumbrance, canSelectItem } = useEquipmentManagement(startingZimes, selectedEquipment)

  const handleWeaponAdd = (weapon: Weapon) => {
    const validation = canSelectItem(weapon)
    if (validation.canSelect) {
      const newEquipment = addItemToEquipment(selectedEquipment, weapon)
      onEquipmentSelected(newEquipment)
    }
  }

  const handleWeaponRemove = (weapon: Weapon) => {
    const newEquipment = removeItemFromEquipment(selectedEquipment, weapon)
    onEquipmentSelected(newEquipment)
  }

  const handleWeaponRemoveAll = (weapon: Weapon) => {
    const newEquipment = removeAllItemsFromEquipment(selectedEquipment, weapon)
    onEquipmentSelected(newEquipment)
  }

  const handleArmorAdd = (armor: ArmorType) => {
    const validation = canSelectItem(armor)
    if (validation.canSelect) {
      const newEquipment = addItemToEquipment(selectedEquipment, armor)
      onEquipmentSelected(newEquipment)
    }
  }

  const handleArmorRemove = (armor: ArmorType) => {
    const newEquipment = removeItemFromEquipment(selectedEquipment, armor)
    onEquipmentSelected(newEquipment)
  }

  const handleArmorRemoveAll = (armor: ArmorType) => {
    const newEquipment = removeAllItemsFromEquipment(selectedEquipment, armor)
    onEquipmentSelected(newEquipment)
  }

  const handleEquipmentAdd = (equipment: EquipmentType) => {
    const validation = canSelectItem(equipment)
    if (validation.canSelect) {
      const newEquipment = addItemToEquipment(selectedEquipment, equipment)
      onEquipmentSelected(newEquipment)
    }
  }

  const handleEquipmentRemove = (equipment: EquipmentType) => {
    const newEquipment = removeItemFromEquipment(selectedEquipment, equipment)
    onEquipmentSelected(newEquipment)
  }

  const handleEquipmentRemoveAll = (equipment: EquipmentType) => {
    const newEquipment = removeAllItemsFromEquipment(selectedEquipment, equipment)
    onEquipmentSelected(newEquipment)
  }

  const handleContainerAdd = (container: Container) => {
    const newEquipment = addItemToEquipment(selectedEquipment, container)
    onEquipmentSelected(newEquipment)
  }

  const handleContainerRemove = (container: Container) => {
    const newEquipment = removeItemFromEquipment(selectedEquipment, container)
    onEquipmentSelected(newEquipment)
  }

  const handleContainerRemoveAll = (container: Container) => {
    const newEquipment = removeAllItemsFromEquipment(selectedEquipment, container)
    onEquipmentSelected(newEquipment)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'weapons':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WEAPONS.map((weapon) => {
              const quantity = getItemQuantity(selectedEquipment, weapon)
              const isStartingItem = startingEquipment.includes(weapon.name.toLowerCase())
              const validation = canSelectItem(weapon)
              const canAdd = validation.canSelect
              
              return (
                <div
                  key={weapon.id}
                  className={`
                    border-2 rounded-lg p-4 transition-colors relative
                    ${quantity > 0
                      ? 'border-purple-500 bg-purple-600/20'
                      : 'border-purple-500/30 bg-black/20'
                    }
                  `}
                >
                  {isStartingItem && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-1 text-xs bg-green-600 text-white rounded">
                        Starting
                      </span>
                    </div>
                  )}

                  {/* Quantity display */}
                  {quantity > 0 && (
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{quantity}</span>
                      </div>
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white mb-2">{weapon.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{weapon.description}</p>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{weapon.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Weight:</span>
                      <span className="text-white">{weapon.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Damage:</span>
                      <span className="text-white">{weapon.damage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accuracy:</span>
                      <span className="text-white">{weapon.accuracy > 0 ? '+' : ''}{weapon.accuracy}</span>
                    </div>
                    {weapon.range && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Range:</span>
                        <span className="text-white">{weapon.range} ft</span>
                      </div>
                    )}
                    {/* Cost removed - all equipment is free */}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Slots:</span>
                      <span className="text-white">
                        {weapon.slots === -1 ? 'Must carry' : 
                         weapon.slots === 0 ? 'Equipped' : 
                         `${weapon.slots} slot${weapon.slots > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>

                  {weapon.special.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-semibold text-purple-300 mb-1">Special</h5>
                      <div className="text-xs text-gray-300">
                        {weapon.special.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Validation error message */}
                  {!canAdd && quantity === 0 && validation.reason && (
                    <div className="mt-2 text-red-400 text-xs">
                      ⚠️ {validation.reason}
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWeaponRemove(weapon)
                      }}
                      disabled={quantity === 0}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors
                        ${quantity > 0 
                          ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                          : 'bg-gray-600 cursor-not-allowed'
                        }
                      `}
                    >
                      −
                    </button>

                    <span className="text-white font-bold min-w-[2rem] text-center">{quantity}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWeaponAdd(weapon)
                      }}
                      disabled={!canAdd}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors
                        ${canAdd 
                          ? 'bg-green-600 hover:bg-green-700 cursor-pointer' 
                          : 'bg-gray-600 cursor-not-allowed'
                        }
                      `}
                    >
                      +
                    </button>

                    {quantity > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleWeaponRemoveAll(weapon)
                        }}
                        className="ml-2 px-2 py-1 bg-red-700 hover:bg-red-800 text-white text-xs rounded transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )

      case 'armor':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARMOR.map((armor) => {
              const quantity = getItemQuantity(selectedEquipment, armor)
              const isStartingItem = startingEquipment.includes(armor.name.toLowerCase())
              const validation = canSelectItem(armor)
              const canAdd = validation.canSelect
              
              return (
                <div
                  key={armor.id}
                  className={`
                    border-2 rounded-lg p-4 transition-colors relative
                    ${quantity > 0
                      ? 'border-purple-500 bg-purple-600/20'
                      : 'border-purple-500/30 bg-black/20'
                    }
                  `}
                >
                  {isStartingItem && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-1 text-xs bg-green-600 text-white rounded">
                        Starting
                      </span>
                    </div>
                  )}

                  {/* Quantity display */}
                  {quantity > 0 && (
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{quantity}</span>
                      </div>
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white mb-2">{armor.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{armor.description}</p>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{armor.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Protection:</span>
                      <span className="text-white">{armor.protection}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Penalty:</span>
                      <span className="text-white">{armor.penalty}</span>
                    </div>
                    {/* Cost removed - all equipment is free */}
                  </div>

                  {armor.special.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-semibold text-purple-300 mb-1">Special</h5>
                      <div className="text-xs text-gray-300">
                        {armor.special.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Validation error message */}
                  {!canAdd && quantity === 0 && validation.reason && (
                    <div className="mt-2 text-red-400 text-xs">
                      ⚠️ {validation.reason}
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleArmorRemove(armor)
                      }}
                      disabled={quantity === 0}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors
                        ${quantity > 0 
                          ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                          : 'bg-gray-600 cursor-not-allowed'
                        }
                      `}
                    >
                      −
                    </button>

                    <span className="text-white font-bold min-w-[2rem] text-center">{quantity}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleArmorAdd(armor)
                      }}
                      disabled={!canAdd}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors
                        ${canAdd 
                          ? 'bg-green-600 hover:bg-green-700 cursor-pointer' 
                          : 'bg-gray-600 cursor-not-allowed'
                        }
                      `}
                    >
                      +
                    </button>

                    {quantity > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleArmorRemoveAll(armor)
                        }}
                        className="ml-2 px-2 py-1 bg-red-700 hover:bg-red-800 text-white text-xs rounded transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )

      case 'equipment':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EQUIPMENT.map((equipment) => {
              const quantity = getItemQuantity(selectedEquipment, equipment)
              const isStartingItem = startingEquipment.includes(equipment.name.toLowerCase())
              const validation = canSelectItem(equipment)
              const canAdd = validation.canSelect
              
              return (
                <div
                  key={equipment.id}
                  className={`
                    border-2 rounded-lg p-4 transition-colors relative
                    ${quantity > 0
                      ? 'border-purple-500 bg-purple-600/20'
                      : 'border-purple-500/30 bg-black/20'
                    }
                  `}
                >
                  {isStartingItem && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-1 text-xs bg-green-600 text-white rounded">
                        Starting
                      </span>
                    </div>
                  )}

                  {/* Quantity display */}
                  {quantity > 0 && (
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{quantity}</span>
                      </div>
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white mb-2">{equipment.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{equipment.description}</p>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{equipment.category}</span>
                    </div>
                    {/* Cost removed - all equipment is free */}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Slots:</span>
                      <span className="text-white">
                        {equipment.slots === -1 ? 'Must carry' : 
                         equipment.slots === 0 ? 'No slots' : 
                         `${equipment.slots} slot${equipment.slots > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>

                  {equipment.special && equipment.special.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-semibold text-purple-300 mb-1">Special</h5>
                      <div className="text-xs text-gray-300">
                        {equipment.special.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Validation error message */}
                  {!canAdd && quantity === 0 && validation.reason && (
                    <div className="mt-2 text-red-400 text-xs">
                      ⚠️ {validation.reason}
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEquipmentRemove(equipment)
                      }}
                      disabled={quantity === 0}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors
                        ${quantity > 0 
                          ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                          : 'bg-gray-600 cursor-not-allowed'
                        }
                      `}
                    >
                      −
                    </button>

                    <span className="text-white font-bold min-w-[2rem] text-center">{quantity}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEquipmentAdd(equipment)
                      }}
                      disabled={!canAdd}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors
                        ${canAdd 
                          ? 'bg-green-600 hover:bg-green-700 cursor-pointer' 
                          : 'bg-gray-600 cursor-not-allowed'
                        }
                      `}
                    >
                      +
                    </button>

                    {quantity > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEquipmentRemoveAll(equipment)
                        }}
                        className="ml-2 px-2 py-1 bg-red-700 hover:bg-red-800 text-white text-xs rounded transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )

      case 'containers':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTAINER_TYPES.map((container) => {
              const quantity = getItemQuantity(selectedEquipment, container)
              
              return (
                <div
                  key={container.id}
                  className={`
                    border-2 rounded-lg p-4 transition-colors relative
                    ${quantity > 0
                      ? 'border-purple-500 bg-purple-600/20'
                      : 'border-purple-500/30 bg-black/20'
                    }
                  `}
                >
                  {/* Quantity display */}
                  {quantity > 0 && (
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{quantity}</span>
                      </div>
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white mb-2">{container.name}</h4>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Slots:</span>
                      <span className="text-white">{container.maxSlots}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Weight:</span>
                      <span className="text-white">{container.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Own Slots:</span>
                      <span className="text-white">{container.slots}</span>
                    </div>
                  </div>

                  {container.special && container.special.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-semibold text-purple-300 mb-1">Special</h5>
                      <div className="text-xs text-gray-300">
                        {container.special.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleContainerRemove(container)
                      }}
                      disabled={quantity === 0}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors
                        ${quantity > 0 
                          ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                          : 'bg-gray-600 cursor-not-allowed'
                        }
                      `}
                    >
                      −
                    </button>

                    <span className="text-white font-bold min-w-[2rem] text-center">{quantity}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleContainerAdd(container)
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-green-600 hover:bg-green-700 cursor-pointer transition-colors"
                    >
                      +
                    </button>

                    {quantity > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleContainerRemoveAll(container)
                        }}
                        className="ml-2 px-2 py-1 bg-red-700 hover:bg-red-800 text-white text-xs rounded transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Select Equipment</h2>
        <p className="text-gray-300">
          Choose weapons, armor, and equipment for your character. Items marked &quot;Starting&quot; come from your backgrounds. All equipment is free to select. Use +/- buttons to select multiple copies of items.
        </p>
        {errors.equipment && (
          <p className="text-red-400 text-sm mt-2">{errors.equipment}</p>
        )}
      </div>

      {/* Encumbrance Status */}
      <div className="mb-6">
        <EncumbranceDisplay encumbrance={encumbrance} />
      </div>

      {/* Starting Equipment Summary */}
      {startingEquipment.length > 0 && (
        <div className="mb-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-300 mb-2">Starting Equipment from Backgrounds</h3>
          <div className="text-sm text-gray-300">
            {startingEquipment.join(', ')}
          </div>
        </div>
      )}

      {/* Equipment Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8" aria-label="Equipment categories">
          {[
            { id: 'weapons', name: 'Weapons', count: selectedEquipment.weapons.length },
            { id: 'armor', name: 'Armor', count: selectedEquipment.armor.length },
            { id: 'equipment', name: 'Equipment', count: selectedEquipment.equipment.length },
            { id: 'containers', name: 'Containers', count: selectedEquipment.containers.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'weapons' | 'armor' | 'equipment' | 'containers')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }
              `}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Equipment Content */}
      <div className="mb-8">
        {renderTabContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors"
        >
          ← Back to Faith
        </button>
        
        <button
          onClick={onNext}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
        >
          Continue to Details →
        </button>
      </div>
    </div>
  )
} 