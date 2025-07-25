'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useUser } from '@clerk/nextjs'
import { Character } from '@/utils/character-data'
import { getUserCharacters, getAllCharacters, PublicCharacterData } from './actions'

export default function CharactersPage() {
  const router = useRouter()
  const { user } = useUser()
  const [myCharacters, setMyCharacters] = useState<Character[]>([])
  const [allCharacters, setAllCharacters] = useState<PublicCharacterData[]>([])
  const [activeTab, setActiveTab] = useState<'my' | 'all'>('my')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
      return
    }

    const loadCharacters = async () => {
      try {
        setLoading(true)
        
        // Load both my characters and all characters
        const [myResult, allResult] = await Promise.all([
          getUserCharacters(),
          getAllCharacters()
        ])
        
        if (!myResult.success) {
          setError(myResult.error || 'Failed to load your characters. Please try again.')
          return
        }
        
        if (!allResult.success) {
          setError(allResult.error || 'Failed to load all characters. Please try again.')
          return
        }
        
        setMyCharacters(myResult.characters || [])
        setAllCharacters(allResult.characters || [])
      } catch (err) {
        console.error('Failed to load characters:', err)
        setError('Failed to load characters. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="text-white hover:text-purple-300 transition-colors mr-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-white">
                {activeTab === 'my' ? 'My Characters' : 'All Characters'}
              </h1>
            </div>
            
            <button
              onClick={() => router.push('/character-creator')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Create New Character
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8" aria-label="Character tabs">
            <button
              onClick={() => setActiveTab('my')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === 'my'
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }
              `}
            >
              My Characters ({myCharacters.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === 'all'
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }
              `}
            >
              All Characters ({allCharacters.length})
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
              <p className="text-white text-center">Loading characters...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-8">
              <div className="text-red-400 text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-300 mb-2">Error Loading Characters</h3>
              <p className="text-red-200 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (activeTab === 'my' ? myCharacters : allCharacters).length === 0 ? (
          <div className="text-center">
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-12">
              <div className="text-6xl mb-4">🧙‍♂️</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {activeTab === 'my' ? 'No Characters Yet' : 'No Characters Created'}
              </h3>
              <p className="text-gray-300 mb-6">
                {activeTab === 'my' 
                  ? 'Create your first character to begin your adventure!' 
                  : 'Be the first to create a character!'}
              </p>
              <button
                onClick={() => router.push('/character-creator')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Create Character
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'my' ? (
              myCharacters.map((character) => (
                <MyCharacterCard key={character.id} character={character} router={router} />
              ))
            ) : (
              allCharacters.map((character) => (
                <PublicCharacterCard key={character.id} character={character} router={router} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}

function MyCharacterCard({ character, router }: { character: Character; router: AppRouterInstance }) {
  return (
    <div
      className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors cursor-pointer"
      onClick={() => router.push(`/characters/${character.id}`)}
    >
      {/* Character Avatar */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center text-2xl mr-4">
          🧙‍♂️
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
          <p className="text-gray-300 text-sm">{character.race.name}</p>
          <p className="text-gray-400 text-xs">{character.origin.name}</p>
        </div>
      </div>

      {/* Attributes */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <div className="text-xs text-gray-400">Twitch</div>
          <div className={`font-bold ${
            character.twitch.loyalty === 'favored' ? 'text-green-400' :
            character.twitch.loyalty === 'treacherous' ? 'text-red-400' :
            'text-white'
          }`}>
            {character.twitch.value}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Flesh</div>
          <div className={`font-bold ${
            character.flesh.loyalty === 'favored' ? 'text-green-400' :
            character.flesh.loyalty === 'treacherous' ? 'text-red-400' :
            'text-white'
          }`}>
            {character.flesh.value}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Mojo</div>
          <div className={`font-bold ${
            character.mojo.loyalty === 'favored' ? 'text-green-400' :
            character.mojo.loyalty === 'treacherous' ? 'text-red-400' :
            'text-white'
          }`}>
            {character.mojo.value}
          </div>
        </div>
      </div>

      {/* Health Status */}
      <div className="flex justify-between text-sm mb-4">
        <div>
          <span className="text-gray-400">Health:</span>
          <span className="text-white ml-1">{character.bones - (character.woundPoints || 0)}/{character.bones}</span>
        </div>
        <div>
          <span className="text-gray-400">Mana:</span>
          <span className="text-blue-400 ml-1">{character.manaDice}</span>
        </div>
      </div>

      {/* Backgrounds */}
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">Backgrounds:</div>
        <div className="flex flex-wrap gap-1">
          {character.backgrounds.slice(0, 3).map((bg, index) => (
            <span
              key={index}
              className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded"
            >
              {bg.name}
            </span>
          ))}
        </div>
      </div>

      {/* Faith */}
      {character.faith && (
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-1">Faith:</div>
          <div className="flex items-center">
            <span className="text-sm text-yellow-400">{character.faith.name}</span>
            {character.covenant && (
              <span className="ml-2 text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">
                Covenant
              </span>
            )}
          </div>
        </div>
      )}

      {/* Created Date */}
      <div className="text-xs text-gray-500 border-t border-gray-700/50 pt-3">
        Created: {new Date(character.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
}

function PublicCharacterCard({ character, router }: { character: PublicCharacterData; router: AppRouterInstance }) {
  return (
    <div
      className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors cursor-pointer"
      onClick={() => router.push(`/characters/${character.id}`)}
    >
      {/* Character Avatar */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center text-2xl mr-4">
          🧙‍♂️
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
          <p className="text-gray-300 text-sm">{character.race.name}</p>
          <p className="text-gray-400 text-xs">{character.origin.name}</p>
          <p className="text-purple-300 text-xs mt-1">by {character.createdBy}</p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Race:</span>
          <span className="text-white">{character.race.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Origin:</span>
          <span className="text-white">{character.origin.name}</span>
        </div>
      </div>

      {/* Backgrounds */}
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">Backgrounds:</div>
        <div className="flex flex-wrap gap-1">
          {character.backgrounds.slice(0, 3).map((bg, index) => (
            <span
              key={index}
              className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded"
            >
              {bg.name}
            </span>
          ))}
          {character.backgrounds.length > 3 && (
            <span className="text-xs text-gray-400">
              +{character.backgrounds.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Faith */}
      {character.faith && (
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-1">Faith:</div>
          <div className="flex items-center">
            <span className="text-sm text-yellow-400">{character.faith.name}</span>
            {character.covenant && (
              <span className="ml-2 text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded">
                Covenant
              </span>
            )}
          </div>
        </div>
      )}

      {/* Created Date */}
      <div className="text-xs text-gray-500 border-t border-gray-700/50 pt-3">
        Created: {new Date(character.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
} 