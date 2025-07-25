'use client'

import { IMMORTAL_EIGHT, OTHER_FAITHS, Faith } from '@/utils/character-data'

interface FaithSelectorProps {
  selectedFaith?: Faith
  hasCovenant: boolean
  onFaithSelected: (faith?: Faith, covenant?: boolean) => void
  onNext: () => void
  onPrev: () => void
}

export function FaithSelector({ 
  selectedFaith, 
  hasCovenant, 
  onFaithSelected, 
  onNext, 
  onPrev 
}: FaithSelectorProps) {

  const handleFaithSelect = (faith: Faith) => {
    onFaithSelected(faith, false) // Reset covenant when changing faith
  }

  const handleCovenantToggle = () => {
    if (selectedFaith) {
      onFaithSelected(selectedFaith, !hasCovenant)
    }
  }

  const handleNoFaith = () => {
    onFaithSelected(undefined, false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Faith</h2>
        <p className="text-gray-300">
          Select a deity to worship, or choose no faith. Faithful characters may forge a Covenant for additional powers.
        </p>
      </div>

      {/* No Faith Option */}
      <div className="mb-8">
        <div
          onClick={handleNoFaith}
          className={`
            cursor-pointer border-2 rounded-lg p-4 transition-colors
            ${!selectedFaith
              ? 'border-purple-500 bg-purple-600/20'
              : 'border-purple-500/30 bg-black/20 hover:border-purple-400/50'
            }
          `}
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">No Faith</h3>
            <p className="text-gray-300">Your character follows no deity and relies only on themselves.</p>
          </div>
        </div>
      </div>

      {/* The Immortal Eight */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">The Immortal Eight</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMMORTAL_EIGHT.map((faith) => (
            <FaithCard
              key={faith.id}
              faith={faith}
              isSelected={selectedFaith?.id === faith.id}
              onSelect={() => handleFaithSelect(faith)}
            />
          ))}
        </div>
      </div>

      {/* Other Faiths */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Other Faiths</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OTHER_FAITHS.map((faith) => (
            <FaithCard
              key={faith.id}
              faith={faith}
              isSelected={selectedFaith?.id === faith.id}
              onSelect={() => handleFaithSelect(faith)}
            />
          ))}
        </div>
      </div>

      {/* Covenant Section */}
      {selectedFaith && (
        <div className="mb-8 bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Forge a Covenant?</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-2">Benefits</h4>
              {selectedFaith.covenantBenefits && selectedFaith.covenantBenefits.length > 0 ? (
                <ul className="text-sm text-gray-300 space-y-1">
                  {selectedFaith.covenantBenefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No specific covenant benefits listed.</p>
              )}
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-red-300 mb-2">Risks</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Canticle Debt: {selectedFaith.canticleDebtRisk}</li>
                <li>• Zealotry Modifier: {selectedFaith.zealotryModifier > 0 ? '+' : ''}{selectedFaith.zealotryModifier}</li>
                <li>• Divine obligations and expectations</li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={hasCovenant}
                onChange={handleCovenantToggle}
                className="mr-3 w-5 h-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
              />
              <span className="text-white font-medium">
                Forge a Covenant with {selectedFaith.name}
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-3 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors"
        >
          ← Back to Origin
        </button>
        
        <button
          onClick={onNext}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
        >
          Continue to Equipment →
        </button>
      </div>
    </div>
  )
}

function FaithCard({ 
  faith, 
  isSelected, 
  onSelect 
}: { 
  faith: Faith
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer border-2 rounded-lg p-4 transition-colors
        ${isSelected
          ? 'border-purple-500 bg-purple-600/20'
          : 'border-purple-500/30 bg-black/20 hover:border-purple-400/50'
        }
      `}
    >
      <h4 className="text-lg font-bold text-white mb-2">{faith.name}</h4>
      <p className="text-gray-300 text-sm mb-3">{faith.description}</p>
      
      <div className="mb-3">
        <h5 className="text-sm font-semibold text-purple-300 mb-1">Domains</h5>
        <div className="text-xs text-gray-300">
          {faith.domain.join(', ')}
        </div>
      </div>

      <div className="text-xs text-gray-400">
        Zealotry: {faith.zealotryModifier > 0 ? '+' : ''}{faith.zealotryModifier}
      </div>

      {isSelected && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-600 text-white text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Selected
          </div>
        </div>
      )}
    </div>
  )
} 