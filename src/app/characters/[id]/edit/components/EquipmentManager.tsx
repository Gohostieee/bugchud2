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
  Container,
  SelectedEquipment
} from '@/utils/character-data'
import { useEquipmentManagement } from '@/app/character-creator/hooks/useEquipmentManagement'
import { EncumbranceDisplay } from '@/app/character-creator/components/EncumbranceDisplay'
import { 
  getItemQuantity, 
  addItemToEquipment, 
  removeItemFromEquipment, 
  removeAllItemsFromEquipment 
} from '@/utils/equipment-helpers'

interface EquipmentManagerProps {
  currentEquipment: SelectedEquipment
  currentZimes: number
  onEquipmentChange: (equipment: SelectedEquipment) => void
}

export function EquipmentManager({ 
  currentEquipment, 
  currentZimes,
  onEquipmentChange
}: EquipmentManagerProps) {
  const [activeTab, setActiveTab] = useState<'weapons' | 'armor' | 'equipment' | 'containers'>('weapons')
  
  // Use equipment management system with current zimes
  const { encumbrance, canSelectItem } = useEquipmentManagement(currentZimes, currentEquipment)

  const handleWeaponAdd = (weapon: Weapon) => {
    const validation = canSelectItem(weapon)
    if (validation.canSelect) {
      const newEquipment = addItemToEquipment(currentEquipment, weapon)
      onEquipmentChange(newEquipment)
    }
  }

  const handleWeaponRemove = (weapon: Weapon) => {
    const newEquipment = removeItemFromEquipment(currentEquipment, weapon)
    onEquipmentChange(newEquipment)
  }

  const handleWeaponRemoveAll = (weapon: Weapon) => {
    const newEquipment = removeAllItemsFromEquipment(currentEquipment, weapon)
    onEquipmentChange(newEquipment)
  }

  const handleArmorAdd = (armor: ArmorType) => {
    const validation = canSelectItem(armor)
    if (validation.canSelect) {
      const newEquipment = addItemToEquipment(currentEquipment, armor)
      onEquipmentChange(newEquipment)
    }
  }

  const handleArmorRemove = (armor: ArmorType) => {
    const newEquipment = removeItemFromEquipment(currentEquipment, armor)
    onEquipmentChange(newEquipment)
  }

  const handleArmorRemoveAll = (armor: ArmorType) => {
    const newEquipment = removeAllItemsFromEquipment(currentEquipment, armor)
    onEquipmentChange(newEquipment)
  }

  const handleEquipmentAdd = (equipment: EquipmentType) => {
    const validation = canSelectItem(equipment)
    if (validation.canSelect) {
      const newEquipment = addItemToEquipment(currentEquipment, equipment)
      onEquipmentChange(newEquipment)
    }
  }

  const handleEquipmentRemove = (equipment: EquipmentType) => {
    const newEquipment = removeItemFromEquipment(currentEquipment, equipment)
    onEquipmentChange(newEquipment)
  }

  const handleEquipmentRemoveAll = (equipment: EquipmentType) => {
    const newEquipment = removeAllItemsFromEquipment(currentEquipment, equipment)
    onEquipmentChange(newEquipment)
  }

  const handleContainerAdd = (container: Container) => {
    const newEquipment = addItemToEquipment(currentEquipment, container)
    onEquipmentChange(newEquipment)
  }

  const handleContainerRemove = (container: Container) => {
    const newEquipment = removeItemFromEquipment(currentEquipment, container)
    onEquipmentChange(newEquipment)
  }

  const handleContainerRemoveAll = (container: Container) => {
    const newEquipment = removeAllItemsFromEquipment(currentEquipment, container)
    onEquipmentChange(newEquipment)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'weapons':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WEAPONS.map((weapon) => {
              const quantity = getItemQuantity(currentEquipment, weapon)
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
              const quantity = getItemQuantity(currentEquipment, armor)
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
              const quantity = getItemQuantity(currentEquipment, equipment)
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
              const quantity = getItemQuantity(currentEquipment, container)
              
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
    <div className="space-y-6">
      {/* Encumbrance Status */}
      <div>
        <EncumbranceDisplay encumbrance={encumbrance} />
      </div>

      {/* Equipment Tabs */}
      <div>
        <nav className="flex space-x-8 mb-6" aria-label="Equipment categories">
          {[
            { id: 'weapons', name: 'Weapons', count: currentEquipment.weapons.length },
            { id: 'armor', name: 'Armor', count: currentEquipment.armor.length },
            { id: 'equipment', name: 'Equipment', count: currentEquipment.equipment.length },
            { id: 'containers', name: 'Containers', count: currentEquipment.containers.length },
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

        {/* Equipment Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
} 