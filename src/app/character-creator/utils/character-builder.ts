import { User } from '@clerk/nextjs/server'
import { 
  applyRacialModifiers, 
  calculateDerivedStats,
  Background
} from '@/utils/character-data'
import type { CharacterCreationState } from '../hooks/useCharacterCreation'
import { StoredCharacter } from '../lib/firebase-character'

export function buildCharacterFromState(
  state: CharacterCreationState, 
  user: User
): StoredCharacter {
  if (!state.attributes || !state.race || !state.origin) {
    throw new Error('Incomplete character data')
  }
  
  const modifiedAttributes = applyRacialModifiers(state.attributes, state.race)
  const derivedStats = calculateDerivedStats(modifiedAttributes)
  
  return {
    name: state.details.name,
    userRef: {
      clerkId: user.id,
      username: user.username || user.emailAddresses[0]?.emailAddress || 'Unknown',
      createdBy: user.fullName || user.emailAddresses[0]?.emailAddress || 'Unknown',
      lastModifiedBy: user.fullName || user.emailAddresses[0]?.emailAddress || 'Unknown'
    },
    race: state.race,
    origin: state.origin,
    backgrounds: state.backgrounds,
    faith: state.faith,
    covenant: state.covenant,
    
    twitch: modifiedAttributes.twitch,
    flesh: modifiedAttributes.flesh,
    mojo: modifiedAttributes.mojo,
    
    bones: derivedStats.bones,
    manaDice: derivedStats.manaDice,
    zimes: state.attributes.zimes,
    
    // Initial status values
    woundPoints: 0,
    xomPoints: 0,
    canticleDebt: 0,
    zealotry: 0,
    
    // Equipment from selections
    weapons: state.equipment.weapons,
    armor: state.equipment.armor,
    containers: state.equipment.containers,
    equipment: state.equipment.equipment,
    
    // Magic & abilities from backgrounds + race
    knownSpells: [], // Initial spells if any
    mutations: [],
         specialAbilities: [
       ...state.race.specialRules,
       ...state.backgrounds.flatMap((bg: Background) => bg.specialAbilities)
     ],
    
    description: state.details.description,
    notes: state.details.notes,
    createdAt: new Date(),
    updatedAt: new Date()
  }
} 