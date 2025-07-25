'use client'

import { EncumbranceState } from '@/utils/character-data'

interface EncumbranceDisplayProps {
  encumbrance: EncumbranceState
}

export function EncumbranceDisplay({ encumbrance }: EncumbranceDisplayProps) {
  const usagePercentage = encumbrance.totalSlots > 0 
    ? (encumbrance.usedSlots / encumbrance.totalSlots) * 100 
    : 0

  return (
    <div className={`p-4 rounded-lg border ${
      encumbrance.canCarry 
        ? 'bg-blue-900/20 border-blue-500/30' 
        : 'bg-red-900/20 border-red-500/30'
    }`}>
      <h3 className="text-lg font-semibold text-white mb-2">🎒 Carrying Capacity</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Containers:</span>
          <div className="text-white font-medium">{encumbrance.maxContainers} max</div>
        </div>
        <div>
          <span className="text-gray-400">Slots:</span>
          <div className={`font-medium ${
            encumbrance.canCarry ? 'text-blue-400' : 'text-red-400'
          }`}>
            {encumbrance.usedSlots} / {encumbrance.totalSlots}
          </div>
        </div>
      </div>

      {/* Visual progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Storage Usage</span>
          <span>{Math.round(usagePercentage)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              encumbrance.canCarry 
                ? usagePercentage < 80 
                  ? 'bg-blue-500' 
                  : 'bg-yellow-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>
      </div>
      
      {encumbrance.unstorableItems.length > 0 && (
        <div className="mt-2">
          <span className="text-yellow-400 text-xs">
            📦 Must be carried: {encumbrance.unstorableItems.join(', ')}
          </span>
        </div>
      )}

      {!encumbrance.canCarry && (
        <div className="mt-2 text-red-400 text-xs">
          ⚠️ Over capacity by {encumbrance.usedSlots - encumbrance.totalSlots} slots
        </div>
      )}
    </div>
  )
} 