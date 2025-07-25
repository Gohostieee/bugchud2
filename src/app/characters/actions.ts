'use server'

import { auth } from '@clerk/nextjs/server'
import { firestore } from '@/lib/firebase-admin'
import { Character } from '@/utils/character-data'
import { revalidatePath } from 'next/cache'

export interface StoredCharacter extends Omit<Character, 'id'> {
  userRef: {
    clerkId: string
    username: string
    createdBy: string
    lastModifiedBy: string
  }
}

export async function saveCharacter(character: StoredCharacter): Promise<{ success: boolean; characterId?: string; error?: string }> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    // Verify the character belongs to the authenticated user
    if (character.userRef.clerkId !== userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const charactersRef = firestore.collection('characters')
    const docRef = await charactersRef.add({
      ...character,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    })

    revalidatePath('/characters')
    return { success: true, characterId: docRef.id }
  } catch (error) {
    console.error('Error saving character:', error)
    return { success: false, error: 'Failed to save character' }
  }
}

export async function getUserCharacters(): Promise<{ success: boolean; characters?: Character[]; error?: string }> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const charactersRef = firestore.collection('characters')
    const snapshot = await charactersRef
      .where('userRef.clerkId', '==', userId)
      .orderBy('updatedAt', 'desc')
      .get()

    const characters: Character[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Character))

    return { success: true, characters }
  } catch (error) {
    console.error('Error fetching characters:', error)
    return { success: false, error: 'Failed to fetch characters' }
  }
}

// Firebase document data interface
interface FirebaseCharacterData {
  name: string
  race: { name: string }
  origin: { name: string }
  backgrounds: { name: string }[]
  faith?: { name: string }
  covenant: boolean
  userRef: {
    clerkId: string
    username?: string
    createdBy?: string
    lastModifiedBy?: string
  }
  createdAt: { toDate?: () => Date } | string // Firebase Timestamp or string
  updatedAt: { toDate?: () => Date } | string // Firebase Timestamp or string
  [key: string]: unknown // Allow other character properties
}

// Public character data interface - only safe data for display
export interface PublicCharacterData {
  id: string
  name: string
  race: { name: string }
  origin: { name: string }
  backgrounds: { name: string }[]
  faith?: { name: string }
  covenant: boolean
  createdBy: string  // username only, no user ID
  createdAt: string
}

export async function getAllCharacters(): Promise<{ success: boolean; characters?: PublicCharacterData[]; error?: string }> {
  try {
    const charactersRef = firestore.collection('characters')
    const snapshot = await charactersRef
      .orderBy('updatedAt', 'desc')
      .limit(50) // Limit to prevent overwhelming the page
      .get()

    const characters: PublicCharacterData[] = snapshot.docs.map(doc => {
      const data = doc.data() as FirebaseCharacterData
      
      // Only return safe, public data - no user IDs or sensitive info
      return {
        id: doc.id,
        name: data.name || 'Unknown',
        race: { name: data.race?.name || 'Unknown' },
        origin: { name: data.origin?.name || 'Unknown' },
        backgrounds: (data.backgrounds || []).map((bg: { name: string }) => ({ name: bg.name || 'Unknown' })),
        faith: data.faith ? { name: data.faith.name } : undefined,
        covenant: data.covenant || false,
        createdBy: data.userRef?.username || data.userRef?.createdBy || 'Anonymous',
        createdAt: (typeof data.createdAt === 'object' && data.createdAt?.toDate) ? data.createdAt.toDate().toISOString() : (typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString())
      }
    })

    return { success: true, characters }
  } catch (error) {
    console.error('Error fetching all characters:', error)
    return { success: false, error: 'Failed to fetch characters' }
  }
}

export async function getCharacterById(characterId: string): Promise<{ success: boolean; character?: Character; error?: string }> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const docRef = firestore.collection('characters').doc(characterId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return { success: false, error: 'Character not found' }
    }

    const characterData = docSnap.data() as StoredCharacter

    // Check if user has permission to view this character
    if (characterData.userRef.clerkId !== userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const character: Character = {
      id: docSnap.id,
      ...characterData
    }

    return { success: true, character }
  } catch (error) {
    console.error('Error fetching character:', error)
    return { success: false, error: 'Failed to fetch character' }
  }
}

export async function updateCharacter(characterId: string, updates: Partial<Character>): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const docRef = firestore.collection('characters').doc(characterId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return { success: false, error: 'Character not found' }
    }

    const characterData = docSnap.data() as StoredCharacter

    // Check if user has permission to update this character
    if (characterData.userRef.clerkId !== userId) {
      return { success: false, error: 'Unauthorized' }
    }

    await docRef.update({
      ...updates,
      updatedAt: new Date().toISOString(),
      version: (typeof characterData === 'object' && characterData && 'version' in characterData ? (characterData.version as number || 0) : 0) + 1
    })

    revalidatePath('/characters')
    revalidatePath(`/characters/${characterId}`)
    return { success: true }
  } catch (error) {
    console.error('Error updating character:', error)
    return { success: false, error: 'Failed to update character' }
  }
}

export async function deleteCharacter(characterId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { success: false, error: 'Unauthorized' }
    }

    const docRef = firestore.collection('characters').doc(characterId)
    const docSnap = await docRef.get()

    if (!docSnap.exists) {
      return { success: false, error: 'Character not found' }
    }

    const characterData = docSnap.data() as StoredCharacter

    // Check if user has permission to delete this character
    if (characterData.userRef.clerkId !== userId) {
      return { success: false, error: 'Unauthorized' }
    }

    await docRef.delete()

    revalidatePath('/characters')
    return { success: true }
  } catch (error) {
    console.error('Error deleting character:', error)
    return { success: false, error: 'Failed to delete character' }
  }
} 