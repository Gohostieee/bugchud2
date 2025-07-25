'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Character } from '@/utils/character-data'
import { getCharacterById } from '../actions'

interface CharacterViewPageProps {
  params: Promise<{
    id: string
  }>
}

export default function CharacterViewPage({ params }: CharacterViewPageProps) {
  const unwrappedParams = use(params)
  const router = useRouter()
  const { user } = useUser()
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          setError(result.error || 'Character not found or you do not have permission to view it.')
          return
        }
        
        setCharacter(result.character || null)
      } catch (err) {
        console.error('Failed to load character:', err)
        setError('Failed to load character. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadCharacter()
  }, [unwrappedParams.id, user, router])

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
                <h1 className="text-3xl font-bold text-white">Character Not Found</h1>
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
                onClick={() => router.push('/characters')}
                className="text-white hover:text-purple-300 transition-colors mr-4"
              >
                ← Back to Characters
              </button>
              <div>
                                 <h1 className="text-3xl font-bold text-white">{character.name}</h1>
                 <p className="text-gray-300">
                   {character.race.name} {character.origin.name}
                 </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push(`/characters/${character.id}/edit`)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Edit Character
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Character Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Character Portrait */}
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Character Portrait</h3>
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center mb-4">
                <span className="text-6xl">🧙‍♂️</span>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white">{character.name}</h4>
                <p className="text-gray-300">{character.race.name}</p>
                <p className="text-gray-400 text-sm">{character.origin.name}</p>
              </div>
            </div>

            {/* Attributes */}
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Attributes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Twitch</span>
                  <div className="flex items-center">
                    <span className="text-white font-bold mr-2">{character.twitch.value}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      character.twitch.loyalty === 'favored' ? 'bg-green-600/20 text-green-400' :
                      character.twitch.loyalty === 'treacherous' ? 'bg-red-600/20 text-red-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {character.twitch.loyalty}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Flesh</span>
                  <div className="flex items-center">
                    <span className="text-white font-bold mr-2">{character.flesh.value}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      character.flesh.loyalty === 'favored' ? 'bg-green-600/20 text-green-400' :
                      character.flesh.loyalty === 'treacherous' ? 'bg-red-600/20 text-red-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {character.flesh.loyalty}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Mojo</span>
                  <div className="flex items-center">
                    <span className="text-white font-bold mr-2">{character.mojo.value}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      character.mojo.loyalty === 'favored' ? 'bg-green-600/20 text-green-400' :
                      character.mojo.loyalty === 'treacherous' ? 'bg-red-600/20 text-red-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {character.mojo.loyalty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Health & Status */}
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Health & Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Bones (Health)</span>
                  <span className="text-white font-bold">{character.bones}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Wound Points</span>
                  <span className="text-white font-bold">{character.woundPoints || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Mana Dice</span>
                  <span className="text-white font-bold">{character.manaDice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Xom Points</span>
                  <span className="text-red-400 font-bold">{character.xomPoints || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns - Character Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Backgrounds */}
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Backgrounds</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {character.backgrounds.map((background, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">{background.name}</h4>
                    <p className="text-gray-300 text-sm mb-2">{background.description}</p>
                    <div className="text-xs text-purple-300">
                      Origin: {background.origin}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Faith */}
            {character.faith && (
              <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Faith</h3>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">{character.faith.name}</h4>
                    {character.covenant && (
                      <span className="bg-yellow-600/20 text-yellow-400 text-xs px-2 py-1 rounded">
                        Covenant
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{character.faith.description}</p>
                  <div className="text-xs text-purple-300">
                    Domain: {character.faith.domain.join(', ')}
                  </div>
                </div>
              </div>
            )}

            {/* Equipment */}
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Equipment</h3>
              
              {/* Weapons */}
              {character.weapons && character.weapons.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-purple-300 mb-3">Weapons</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {character.weapons.map((weapon, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium text-white">{weapon.name}</h5>
                          <span className="text-xs text-gray-400">{weapon.cost}z</span>
                        </div>
                        <div className="text-xs text-gray-300 space-y-1">
                          <div>Damage: {weapon.damage} | Accuracy: {weapon.accuracy >= 0 ? '+' : ''}{weapon.accuracy}</div>
                          <div>Type: {weapon.type} | Weight: {weapon.weight}</div>
                          {weapon.range && <div>Range: {weapon.range} ft</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Armor */}
              {character.armor && character.armor.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-purple-300 mb-3">Armor</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {character.armor.map((armor, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium text-white">{armor.name}</h5>
                          <span className="text-xs text-gray-400">{armor.cost}z</span>
                        </div>
                        <div className="text-xs text-gray-300 space-y-1">
                          <div>Protection: {armor.protection} | Penalty: {armor.penalty}</div>
                          <div>Type: {armor.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Equipment */}
              {character.equipment && character.equipment.length > 0 && (
                <div>
                  <h4 className="font-semibold text-purple-300 mb-3">Other Equipment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {character.equipment.map((item, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium text-white">{item.name}</h5>
                          <span className="text-xs text-gray-400">{item.cost}z</span>
                        </div>
                        <div className="text-xs text-gray-300">
                          Category: {item.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Character Notes */}
            {character.notes && (
              <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Character Notes</h3>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">{character.notes}</p>
                </div>
              </div>
            )}

            {/* Character Description */}
            {character.description && (
              <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">{character.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 