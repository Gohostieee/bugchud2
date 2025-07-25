import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAllCharacters, PublicCharacterData } from './characters/actions'

export default async function HomePage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  // Fetch all characters for public display
  const charactersResult = await getAllCharacters()
  const allCharacters = charactersResult.success ? charactersResult.characters || [] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white">BUGCHUD</h1>
              <span className="ml-3 text-purple-300 text-sm">Dark Fantasy RPG</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.firstName || user.username || 'Adventurer'}</span>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10'
                  }
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Enter the Realm of Psydonia
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create characters, engage in deadly combat, and survive the corrupted wastelands 
            in this digital implementation of the BUGCHUD tabletop RPG system.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            title="Character Creator"
            description="Build your perfect character with races, origins, backgrounds, and equipment from the BUGCHUD universe."
            icon="🧙‍♂️"
            href="/character-creator"
          />
          
          <FeatureCard
            title="Battle Simulator"
            description="Engage in tactical combat with the full BUGCHUD combat system including magic, mutations, and Xom corruption."
            icon="⚔️"
            href="/battle-sim"
            status="Coming Soon"
          />
          
          <FeatureCard
            title="Campaign Manager"
            description="Organize your campaigns, manage NPCs, and track character progression across sessions."
            icon="📖"
            href="/campaigns"
            status="Coming Soon"
          />
        </div>

        {/* All Characters Gallery */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-white">Character Gallery</h3>
            <p className="text-gray-300">Discover characters created by the community</p>
          </div>
          
          {allCharacters.length === 0 ? (
            <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">🧙‍♂️</div>
              <h4 className="text-xl font-bold text-white mb-2">No Characters Yet</h4>
              <p className="text-gray-300">Be the first to create a character!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allCharacters.slice(0, 12).map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          )}
          
          {allCharacters.length > 12 && (
            <div className="text-center mt-6">
              <Link 
                href="/characters"
                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                View All Characters
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionButton
              title="New Character"
              description="Start creating"
              icon="✨"
              href="/character-creator"
            />
            <QuickActionButton
              title="My Characters"
              description="Manage roster"
              icon="👥"
              href="/characters"
            />
            <QuickActionButton
              title="Join Battle"
              description="Enter combat"
              icon="🎲"
              href="/battle-sim"
            />
            <QuickActionButton
              title="Rules Reference"
              description="Learn system"
              icon="📚"
              href="/rules"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ 
  title, 
  description, 
  icon, 
  href, 
  status 
}: { 
  title: string
  description: string
  icon: string
  href: string
  status?: string
}) {
  return (
    <div className="bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      {status ? (
        <span className="inline-block px-3 py-1 text-sm bg-purple-600/30 text-purple-300 rounded-full">
          {status}
        </span>
      ) : (
        <Link 
          href={href}
          className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Launch
        </Link>
      )}
    </div>
  )
}

function CharacterCard({ character }: { character: PublicCharacterData }) {
  return (
    <Link
      href={`/characters/${character.id}`}
      className="block bg-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 hover:border-purple-400/50 transition-colors group"
    >
      {/* Character Avatar */}
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center text-xl mr-3">
          🧙‍♂️
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-white truncate group-hover:text-purple-300 transition-colors">
            {character.name}
          </h4>
          <p className="text-sm text-gray-400 truncate">
            by {character.createdBy}
          </p>
        </div>
      </div>

      {/* Character Info */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Race:</span>
          <span className="text-white">{character.race.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Origin:</span>
          <span className="text-white">{character.origin.name}</span>
        </div>
        
        {/* Backgrounds */}
        <div>
          <span className="text-gray-400 text-xs">Backgrounds:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {character.backgrounds.slice(0, 2).map((bg, index) => (
              <span
                key={index}
                className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded"
              >
                {bg.name}
              </span>
            ))}
            {character.backgrounds.length > 2 && (
              <span className="text-xs text-gray-400">
                +{character.backgrounds.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Faith */}
        {character.faith && (
          <div className="flex justify-between">
            <span className="text-gray-400">Faith:</span>
            <span className="text-yellow-400 flex items-center">
              {character.faith.name}
              {character.covenant && (
                <span className="ml-1 text-xs bg-yellow-600/20 text-yellow-400 px-1 rounded">
                  Covenant
                </span>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Created Date */}
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <div className="text-xs text-gray-500">
          Created: {new Date(character.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  )
}

function QuickActionButton({ 
  title, 
  description, 
  icon, 
  href 
}: { 
  title: string
  description: string
  icon: string
  href: string
}) {
  return (
    <Link 
      href={href}
      className="block p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg transition-colors group"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-white font-semibold">{title}</div>
      <div className="text-sm text-gray-300">{description}</div>
    </Link>
  )
}
