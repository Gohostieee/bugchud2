'use client'

import { useState, useCallback, useMemo } from 'react'
import { 
  SelectedEquipment, 
  MoneyState, 
  EncumbranceState,
  Armor,
  calculateTotalCost,
  calculateArmorPenalty,
  calculateEncumbrance,
  validateItemSelection,
  Weapon,
  Equipment
} from '@/utils/character-data'

// Money Management Hook
export function useMoneyManagement(baseZimes: number) {
  const [startingZimes] = useState(baseZimes)

  const calculateMoney = useCallback((selectedEquipment: SelectedEquipment): MoneyState => {
    const spentZimes = calculateTotalCost(selectedEquipment)
    const remainingZimes = startingZimes - spentZimes
    
    return {
      startingZimes,
      spentZimes,
      remainingZimes,
      canAfford: remainingZimes >= 0
    }
  }, [startingZimes])

  return { calculateMoney }
}

// Encumbrance Management Hook
export function useEncumbranceManagement() {
  const calculateEncumbranceState = useCallback((
    selectedEquipment: SelectedEquipment, 
    selectedArmor: Armor[]
  ): EncumbranceState => {
    const armorPenalty = calculateArmorPenalty(selectedArmor)
    const maxContainers = Math.max(3, 6 - armorPenalty)
    
    return calculateEncumbrance(selectedEquipment, maxContainers)
  }, [])

  return { calculateEncumbranceState }
}

// Combined Equipment Management Hook
export function useEquipmentValidation() {
  const validateSelection = useCallback((
    item: Weapon | Armor | Equipment,
    currentSelection: SelectedEquipment,
    money: MoneyState,
    encumbrance: EncumbranceState
  ) => {
    return validateItemSelection(item, currentSelection, money, encumbrance)
  }, [])

  return { validateSelection }
}

// Main Equipment Management Hook that combines all functionality
export function useEquipmentManagement(startingZimes: number, selectedEquipment: SelectedEquipment) {
  const { calculateMoney } = useMoneyManagement(startingZimes)
  const { calculateEncumbranceState } = useEncumbranceManagement()
  const { validateSelection } = useEquipmentValidation()

  // Calculate current money state (kept for display purposes)
  const money = useMemo(() => 
    calculateMoney(selectedEquipment), 
    [calculateMoney, selectedEquipment]
  )

  // Calculate current encumbrance state
  const encumbrance = useMemo(() => 
    calculateEncumbranceState(selectedEquipment, selectedEquipment.armor), 
    [calculateEncumbranceState, selectedEquipment]
  )

  // Validation function for item selection (money validation removed)
  const canSelectItem = useCallback((item: Weapon | Armor | Equipment) => {
    return validateSelection(item, selectedEquipment, money, encumbrance)
  }, [validateSelection, selectedEquipment, money, encumbrance])

  return {
    money,
    encumbrance,
    canSelectItem
  }
} 