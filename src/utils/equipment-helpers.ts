import { SelectedEquipment, Weapon, Armor, Equipment, Container } from './character-data'

// Helper functions for equipment quantity management

export function getItemQuantity(
  selectedEquipment: SelectedEquipment, 
  item: Weapon | Armor | Equipment | Container
): number {
  if ('damage' in item) {
    // This is a weapon
    return selectedEquipment.weapons.filter(w => w.id === item.id).length
  } else if ('protection' in item) {
    // This is armor  
    return selectedEquipment.armor.filter(a => a.id === item.id).length
  } else if ('maxSlots' in item) {
    // This is a container
    return selectedEquipment.containers.filter(c => c.id === item.id).length
  } else {
    // This is equipment
    return selectedEquipment.equipment.filter(e => e.id === item.id).length
  }
}

export function addItemToEquipment(
  selectedEquipment: SelectedEquipment,
  item: Weapon | Armor | Equipment | Container
): SelectedEquipment {
  if ('damage' in item) {
    // This is a weapon
    return {
      ...selectedEquipment,
      weapons: [...selectedEquipment.weapons, item as Weapon]
    }
  } else if ('protection' in item) {
    // This is armor
    return {
      ...selectedEquipment,
      armor: [...selectedEquipment.armor, item as Armor]
    }
  } else if ('maxSlots' in item) {
    // This is a container
    return {
      ...selectedEquipment,
      containers: [...selectedEquipment.containers, item as Container]
    }
  } else {
    // This is equipment
    return {
      ...selectedEquipment,
      equipment: [...selectedEquipment.equipment, item as Equipment]
    }
  }
}

export function removeItemFromEquipment(
  selectedEquipment: SelectedEquipment,
  item: Weapon | Armor | Equipment | Container
): SelectedEquipment {
  if ('damage' in item) {
    // This is a weapon - remove one instance
    const weaponIndex = selectedEquipment.weapons.findIndex(w => w.id === item.id)
    if (weaponIndex !== -1) {
      const newWeapons = [...selectedEquipment.weapons]
      newWeapons.splice(weaponIndex, 1)
      return {
        ...selectedEquipment,
        weapons: newWeapons
      }
    }
  } else if ('protection' in item) {
    // This is armor - remove one instance
    const armorIndex = selectedEquipment.armor.findIndex(a => a.id === item.id)
    if (armorIndex !== -1) {
      const newArmor = [...selectedEquipment.armor]
      newArmor.splice(armorIndex, 1)
      return {
        ...selectedEquipment,
        armor: newArmor
      }
    }
  } else if ('maxSlots' in item) {
    // This is a container - remove one instance
    const containerIndex = selectedEquipment.containers.findIndex(c => c.id === item.id)
    if (containerIndex !== -1) {
      const newContainers = [...selectedEquipment.containers]
      newContainers.splice(containerIndex, 1)
      return {
        ...selectedEquipment,
        containers: newContainers
      }
    }
  } else {
    // This is equipment - remove one instance
    const equipmentIndex = selectedEquipment.equipment.findIndex(e => e.id === item.id)
    if (equipmentIndex !== -1) {
      const newEquipment = [...selectedEquipment.equipment]
      newEquipment.splice(equipmentIndex, 1)
      return {
        ...selectedEquipment,
        equipment: newEquipment
      }
    }
  }
  
  return selectedEquipment
}

export function removeAllItemsFromEquipment(
  selectedEquipment: SelectedEquipment,
  item: Weapon | Armor | Equipment | Container
): SelectedEquipment {
  if ('damage' in item) {
    // This is a weapon
    return {
      ...selectedEquipment,
      weapons: selectedEquipment.weapons.filter(w => w.id !== item.id)
    }
  } else if ('protection' in item) {
    // This is armor
    return {
      ...selectedEquipment,
      armor: selectedEquipment.armor.filter(a => a.id !== item.id)
    }
  } else if ('maxSlots' in item) {
    // This is a container
    return {
      ...selectedEquipment,
      containers: selectedEquipment.containers.filter(c => c.id !== item.id)
    }
  } else {
    // This is equipment
    return {
      ...selectedEquipment,
      equipment: selectedEquipment.equipment.filter(e => e.id !== item.id)
    }
  }
} 