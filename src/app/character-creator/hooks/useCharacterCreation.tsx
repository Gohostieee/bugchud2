'use client'

import { useState, useCallback, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { 
  generateAttributes as generateAttributesUtil,
  applyRacialModifiers,
  calculateDerivedStats,
  validateCharacterBackgrounds,
  Race,
  Origin,
  Background,
  Faith,
  Weapon,
  Armor,
  Equipment,
  Container
} from '@/utils/character-data'

export interface GeneratedAttributes {
  twitch: number
  flesh: number
  mojo: number
  zimes: number
}

export interface SelectedEquipment {
  weapons: Weapon[]
  armor: Armor[]
  equipment: Equipment[]
  containers: Container[]
}

export interface CharacterDetails {
  name: string
  description: string
  notes: string
}

export interface ValidationErrors {
  name?: string
  race?: string
  origin?: string
  backgrounds?: string
  equipment?: string
  general?: string
}

export interface CharacterCreationState {
  currentStep: number
  attributes?: GeneratedAttributes
  startingZimes: number
  race?: Race
  origin?: Origin
  backgrounds: Background[]
  faith?: Faith
  covenant: boolean
  equipment: SelectedEquipment
  details: CharacterDetails
  errors: ValidationErrors
  isValid: boolean
  isSaving: boolean
}

const initialState: CharacterCreationState = {
  currentStep: 1,
  startingZimes: 160, // Default to 160 (minimum possible: (1 + 1) * 80)
  backgrounds: [],
  covenant: false,
  equipment: {
    weapons: [],
    armor: [],
    equipment: [],
    containers: []
  },
  details: {
    name: '',
    description: '',
    notes: ''
  },
  errors: {},
  isValid: false,
  isSaving: false
}

export function useCharacterCreation() {
  const [state, setState] = useState<CharacterCreationState>(initialState)
  const { user } = useUser()

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bugchud-character-draft')
    if (saved) {
      try {
        const parsedState = JSON.parse(saved)
        setState(prev => ({ ...prev, ...parsedState }))
      } catch (error) {
        console.error('Failed to load character draft:', error)
      }
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('bugchud-character-draft', JSON.stringify(state))
  }, [state])

  // Validation
  const validateState = useCallback((currentState: CharacterCreationState): ValidationErrors => {
    const errors: ValidationErrors = {}

    // Name validation
    if (!currentState.details.name?.trim()) {
      errors.name = 'Character name is required'
    } else if (currentState.details.name.length > 50) {
      errors.name = 'Character name must be 50 characters or less'
    }

    // Background validation
    if (currentState.backgrounds.length !== 3) {
      errors.backgrounds = 'Must select exactly 3 backgrounds'
    } else if (!validateCharacterBackgrounds(currentState.backgrounds)) {
      errors.backgrounds = 'Invalid background combination (check unique backgrounds and origin requirements)'
    }

    return errors
  }, [])

  // Update validation when state changes
  useEffect(() => {
    const errors = validateState(state)
    const isValid = Object.keys(errors).length === 0 && 
                   !!state.attributes && 
                   !!state.race && 
                   !!state.origin && 
                   state.backgrounds.length === 3 &&
                   state.details.name.trim().length > 0

    setState(prev => ({ ...prev, errors, isValid }))
  }, [state.attributes, state.race, state.origin, state.backgrounds, state.details, validateState])

  const generateAttributes = useCallback((assignedAttributes?: GeneratedAttributes) => {
    if (assignedAttributes) {
      // Use the manually assigned attributes
      const startingZimes = (assignedAttributes.zimes + 1) * 80 // BUGCHUD rule: (leftover zimes + 1) * 80
      setState(prev => ({ ...prev, attributes: assignedAttributes, startingZimes }))
    } else {
      // Generate new random attributes (fallback for old behavior)
      const attrs = generateAttributesUtil()
      const startingZimes = (attrs.zimes + 1) * 80 // BUGCHUD rule: (leftover zimes + 1) * 80
      setState(prev => ({ ...prev, attributes: attrs, startingZimes }))
    }
  }, [])

  const selectRace = useCallback((race: Race) => {
    setState(prev => ({ ...prev, race }))
  }, [])

  const selectOrigin = useCallback((origin: Origin) => {
    setState(prev => ({ 
      ...prev, 
      origin,
      backgrounds: [] // Reset backgrounds when origin changes
    }))
  }, [])

  const selectBackgrounds = useCallback((backgrounds: Background[]) => {
    setState(prev => ({ ...prev, backgrounds }))
  }, [])

  const selectFaith = useCallback((faith?: Faith, covenant: boolean = false) => {
    setState(prev => ({ ...prev, faith, covenant }))
  }, [])

  const selectEquipment = useCallback((equipment: SelectedEquipment) => {
    setState(prev => ({ ...prev, equipment }))
  }, [])

  const setDetails = useCallback((details: CharacterDetails) => {
    setState(prev => ({ ...prev, details }))
  }, [])

  const saveCharacter = useCallback(async (): Promise<string | null> => {
    if (!state.isValid || !user) return null

    setState(prev => ({ ...prev, isSaving: true }))

    try {
      // Import server action and character builder
      const { saveCharacter: saveCharacterAction } = await import('../../characters/actions')
      const { buildCharacterFromState } = await import('../utils/character-builder')
      
      // Cast user to correct type for character builder
      const character = buildCharacterFromState(state, user as any)
      const result = await saveCharacterAction(character)
      
      if (!result.success) {
        setState(prev => ({ 
          ...prev, 
          errors: { 
            ...prev.errors, 
            general: result.error || 'Failed to save character. Please try again.' 
          }
        }))
        return null
      }
      
      // Clear the draft from localStorage
      localStorage.removeItem('bugchud-character-draft')
      
      return result.characterId || null
    } catch (error) {
      console.error('Failed to save character:', error)
      setState(prev => ({ 
        ...prev, 
        errors: { 
          ...prev.errors, 
          general: 'Failed to save character. Please try again.' 
        }
      }))
      return null
    } finally {
      setState(prev => ({ ...prev, isSaving: false }))
    }
  }, [state, user])

  const nextStep = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      currentStep: Math.min(prev.currentStep + 1, 7) 
    }))
  }, [])

  const prevStep = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      currentStep: Math.max(prev.currentStep - 1, 1) 
    }))
  }, [])

  const goToStep = useCallback((step: number) => {
    setState(prev => ({ 
      ...prev, 
      currentStep: Math.max(1, Math.min(step, 7)) 
    }))
  }, [])

  return {
    ...state,
    generateAttributes,
    selectRace,
    selectOrigin,
    selectBackgrounds,
    selectFaith,
    selectEquipment,
    setDetails,
    saveCharacter,
    nextStep,
    prevStep,
    goToStep
  }
} 