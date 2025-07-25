'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Character, SelectedEquipment } from '@/utils/character-data'
import { getCharacterById, updateCharacter } from '../../actions'
import { EquipmentManager } from './components/EquipmentManager'

interface CharacterEditPageProps {
  params: Promise<{
    id: string
  }>
}

interface EditableCharacterData {
  name: string
  description: string
  notes: string
  woundPoints: number
  xomPoints: number
  canticleDebt: number
  zealotry: number
  zimes: number
  equipment: SelectedEquipment
}

export default function CharacterEditPage({ params }: CharacterEditPageProps) {
  const unwrappedParams = use(params)
  const router = useRouter()
  const { user } = useUser()
  const [character, setCharacter] = useState<Character | null>(null)
  const [editData, setEditData] = useState<EditableCharacterData>({
    name: '',
    description: '',
    notes: '',
    woundPoints: 0,
    xomPoints: 0,
    canticleDebt: 0,
    zealotry: 0,
    zimes: 0,
    equipment: {
      weapons: [],
      armor: [],
      equipment: [],
      containers: []
    }
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
      return
    }

    const loadCharacter = async () => {
      try {
        setLoading(true)
        const result = await getCharacterById(unwrappedParams.id)
        
        if (!result.success) {
          setError(result.error || 'Character not found or you do not have permission to edit it.')
          return
        }
        
        const char = result.character!
        setCharacter(char)
        setEditData({
          name: char.name,
          description: char.description,
          notes: char.notes,
          woundPoints: char.woundPoints,
          xomPoints: char.xomPoints,
          canticleDebt: char.canticleDebt,
          zealotry: char.zealotry,
          zimes: char.zimes,
          equipment: {
            weapons: char.weapons || [],
            armor: char.armor || [],
            equipment: char.equipment || [],
            containers: char.containers || []
          }
        })
      } catch (err) {
        console.error('Failed to load character:', err)
        setError('Failed to load character. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadCharacter()
  }, [unwrappedParams.id, user, router])

  const handleInputChange = (field: keyof EditableCharacterData, value: string | number) => {
    setEditData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Check if there are changes compared to original character
      if (character) {
        const hasChangesNow = (
          newData.name !== character.name ||
          newData.description !== character.description ||
          newData.notes !== character.notes ||
          newData.woundPoints !== character.woundPoints ||
          newData.xomPoints !== character.xomPoints ||
          newData.canticleDebt !== character.canticleDebt ||
          newData.zealotry !== character.zealotry ||
          newData.zimes !== character.zimes ||
          JSON.stringify(newData.equipment.weapons) !== JSON.stringify(character.weapons) ||
          JSON.stringify(newData.equipment.armor) !== JSON.stringify(character.armor) ||
          JSON.stringify(newData.equipment.equipment) !== JSON.stringify(character.equipment) ||
          JSON.stringify(newData.equipment.containers) !== JSON.stringify(character.containers)
        )
        setHasChanges(hasChangesNow)
      }
      
      return newData
    })
  }

  const handleEquipmentChange = (equipment: SelectedEquipment) => {
    setEditData(prev => {
      const newData = { ...prev, equipment }
      
      // Check if there are changes compared to original character
      if (character) {
        const hasChangesNow = (
          newData.name !== character.name ||
          newData.description !== character.description ||
          newData.notes !== character.notes ||
          newData.woundPoints !== character.woundPoints ||
          newData.xomPoints !== character.xomPoints ||
          newData.canticleDebt !== character.canticleDebt ||
          newData.zealotry !== character.zealotry ||
          newData.zimes !== character.zimes ||
          JSON.stringify(newData.equipment.weapons) !== JSON.stringify(character.weapons) ||
          JSON.stringify(newData.equipment.armor) !== JSON.stringify(character.armor) ||
          JSON.stringify(newData.equipment.equipment) !== JSON.stringify(character.equipment) ||
          JSON.stringify(newData.equipment.containers) !== JSON.stringify(character.containers)
        )
        setHasChanges(hasChangesNow)
      }
      
      return newData
    })
  }

  const handleSave = async () => {
    if (!character || !hasChanges) return

    try {
      setSaving(true)
      setError(null)

      const result = await updateCharacter(character.id, {
        name: editData.name,
        description: editData.description,
        notes: editData.notes,
        woundPoints: editData.woundPoints,
        xomPoints: editData.xomPoints,
        canticleDebt: editData.canticleDebt,
        zealotry: editData.zealotry,
        zimes: editData.zimes,
        weapons: editData.equipment.weapons,
        armor: editData.equipment.armor,
        equipment: editData.equipment.equipment,
        containers: editData.equipment.containers,
        updatedAt: new Date()
      })

      if (!result.success) {
        setError(result.error || 'Failed to save changes. Please try again.')
        return
      }

      // Update local character state
      setCharacter(prev => prev ? { 
        ...prev, 
        name: editData.name,
        description: editData.description,
        notes: editData.notes,
        woundPoints: editData.woundPoints,
        xomPoints: editData.xomPoints,
        canticleDebt: editData.canticleDebt,
        zealotry: editData.zealotry,
        zimes: editData.zimes,
        weapons: editData.equipment.weapons,
        armor: editData.equipment.armor,
        equipment: editData.equipment.equipment,
        containers: editData.equipment.containers,
        updatedAt: new Date() 
      } : null)
      setHasChanges(false)
      
      // Show success message briefly then redirect
      setTimeout(() => {
        router.push(`/characters/${character.id}`)
      }, 500)
      
    } catch (err) {
      console.error('Failed to save character:', err)
      setError('Failed to save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        router.push(`/characters/${unwrappedParams.id}`)
      }
    } else {
      router.push(`/characters/${unwrappedParams.id}`)
    }
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-white">Loading character...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button
                  onClick={() => router.push('/characters')}
                  className="text-white hover:text-purple-300 transition-colors mr-4"
                >
                  ← Back to Characters
                </button>
                <h1 className="text-3xl font-bold text-white">Edit Character</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-12">
              <div className="text-6xl mb-4">💀</div>
              <h2 className="text-2xl font-bold text-white mb-4">Character Not Found</h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <button
                onClick={() => router.push('/characters')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Back to Characters
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={handleCancel}
                className="text-white hover:text-purple-300 transition-colors mr-4"
              >
                ← Cancel
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Edit Character</h1>
                <p className="text-gray-300">
                  {character.race.name} {character.origin.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  hasChanges && !saving
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {/* Character Basic Info */}
          <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Character Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Character Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  placeholder="Enter character name"
                  maxLength={50}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={editData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-vertical"
                  placeholder="Describe your character&apos;s appearance, personality, etc."
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                  Character Notes
                </label>
                <textarea
                  id="notes"
                  value={editData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-vertical"
                  placeholder="Campaign notes, character development, session logs, etc."
                />
              </div>
            </div>
          </div>

          {/* Health & Status */}
          <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Health & Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="woundPoints" className="block text-sm font-medium text-gray-300 mb-2">
                  Wound Points
                </label>
                <input
                  type="number"
                  id="woundPoints"
                  value={editData.woundPoints}
                  onChange={(e) => handleInputChange('woundPoints', parseInt(e.target.value) || 0)}
                  min="0"
                  max={character.bones}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-xs text-gray-400 mt-1">Max: {character.bones} (Bones)</p>
              </div>

              <div>
                <label htmlFor="xomPoints" className="block text-sm font-medium text-gray-300 mb-2">
                  Xom Points
                </label>
                <input
                  type="number"
                  id="xomPoints"
                  value={editData.xomPoints}
                  onChange={(e) => handleInputChange('xomPoints', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-xs text-gray-400 mt-1">Chaos corruption points</p>
              </div>

              <div>
                <label htmlFor="canticleDebt" className="block text-sm font-medium text-gray-300 mb-2">
                  Canticle Debt
                </label>
                <input
                  type="number"
                  id="canticleDebt"
                  value={editData.canticleDebt}
                  onChange={(e) => handleInputChange('canticleDebt', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-xs text-gray-400 mt-1">Outstanding magical debts</p>
              </div>

              <div>
                <label htmlFor="zealotry" className="block text-sm font-medium text-gray-300 mb-2">
                  Zealotry
                </label>
                <input
                  type="number"
                  id="zealotry"
                  value={editData.zealotry}
                  onChange={(e) => handleInputChange('zealotry', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                />
                <p className="text-xs text-gray-400 mt-1">Religious fervor points</p>
              </div>
            </div>
          </div>

          {/* Currency */}
          <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Currency</h2>
            
            <div className="max-w-xs">
              <label htmlFor="zimes" className="block text-sm font-medium text-gray-300 mb-2">
                Zimes
              </label>
              <input
                type="number"
                id="zimes"
                value={editData.zimes}
                onChange={(e) => handleInputChange('zimes', parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
              <p className="text-xs text-gray-400 mt-1">Current money</p>
            </div>
          </div>

          {/* Equipment Management */}
          <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Equipment & Inventory</h2>
            <p className="text-gray-300 mb-6">
              Manage your character&apos;s weapons, armor, and equipment. Changes affect encumbrance.
            </p>
            
            <EquipmentManager
              currentEquipment={editData.equipment}
              currentZimes={editData.zimes}
              onEquipmentChange={handleEquipmentChange}
            />
          </div>

          {/* Character Core Info (Read-only) */}
          <div className="bg-black/20 backdrop-blur-sm border border-gray-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-400 mb-6">Character Core (Read-only)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">Basic Info</h3>
                <p><strong>Race:</strong> {character.race.name}</p>
                <p><strong>Origin:</strong> {character.origin.name}</p>
                {character.faith && (
                  <p><strong>Faith:</strong> {character.faith.name} {character.covenant && '(Covenant)'}</p>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Attributes</h3>
                <p><strong>Twitch:</strong> {character.twitch.value} ({character.twitch.loyalty})</p>
                <p><strong>Flesh:</strong> {character.flesh.value} ({character.flesh.loyalty})</p>
                <p><strong>Mojo:</strong> {character.mojo.value} ({character.mojo.loyalty})</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Derived Stats</h3>
                <p><strong>Bones:</strong> {character.bones}</p>
                <p><strong>Mana Dice:</strong> {character.manaDice}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Backgrounds</h3>
                {character.backgrounds.map((bg, index) => (
                  <p key={index}>{bg.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 