'use client'

import { CharacterDetails as CharacterDetailsType, ValidationErrors } from '../hooks/useCharacterCreation'

interface CharacterDetailsProps {
  characterDetails: CharacterDetailsType
  onDetailsSet: (details: CharacterDetailsType) => void
  onNext: () => void
  onPrev: () => void
  errors: ValidationErrors
}

export function CharacterDetails({ 
  characterDetails, 
  onDetailsSet, 
  onNext, 
  onPrev,
  errors
}: CharacterDetailsProps) {

  const handleChange = (field: keyof CharacterDetailsType, value: string) => {
    onDetailsSet({
      ...characterDetails,
      [field]: value
    })
  }

  const canProceed = characterDetails.name.trim().length > 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Character Details</h2>
        <p className="text-gray-300">
          Give your character a name and describe their appearance and personality.
        </p>
      </div>

      <div className="space-y-6">
        {/* Character Name */}
        <div>
          <label htmlFor="character-name" className="block text-lg font-semibold text-white mb-2">
            Character Name *
          </label>
          <input
            id="character-name"
            type="text"
            value={characterDetails.name}
            onChange={(e) => handleChange('name', e.target.value)}
            maxLength={50}
            className={`
              w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500
              ${errors.name ? 'border-red-500' : 'border-purple-500/30'}
            `}
            placeholder="Enter your character's name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name}</p>
          )}
          <p className="mt-2 text-sm text-gray-400">
            {characterDetails.name.length}/50 characters
          </p>
        </div>

        {/* Character Description */}
        <div>
          <label htmlFor="character-description" className="block text-lg font-semibold text-white mb-2">
            Physical Description
          </label>
          <textarea
            id="character-description"
            value={characterDetails.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            maxLength={500}
            className="
              w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none
            "
            placeholder="Describe your character's appearance, mannerisms, or distinguishing features..."
          />
          <p className="mt-2 text-sm text-gray-400">
            {characterDetails.description.length}/500 characters
          </p>
        </div>

        {/* Character Notes */}
        <div>
          <label htmlFor="character-notes" className="block text-lg font-semibold text-white mb-2">
            Background & Personality
          </label>
          <textarea
            id="character-notes"
            value={characterDetails.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={4}
            maxLength={500}
            className="
              w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none
            "
            placeholder="Share your character's history, motivations, quirks, or goals..."
          />
          <p className="mt-2 text-sm text-gray-400">
            {characterDetails.notes.length}/500 characters
          </p>
        </div>

        {/* Character Creation Tips */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Character Creation Tips</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Consider how your chosen race and backgrounds influence your character's appearance</li>
            <li>• Think about your character's motivations and how they ended up as an adventurer</li>
            <li>• Your faith choice (or lack thereof) might affect your character's worldview</li>
            <li>• Remember this is the dark fantasy world of Psydonia - embrace the grim atmosphere</li>
            <li>• Consider how mutations or Xom corruption might have affected your character</li>
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors"
        >
          ← Back to Equipment
        </button>
        
        {canProceed && (
          <button
            onClick={onNext}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Continue to Review →
          </button>
        )}
      </div>
    </div>
  )
} 