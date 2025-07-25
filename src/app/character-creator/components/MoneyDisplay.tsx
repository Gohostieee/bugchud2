'use client'

import { MoneyState } from '@/utils/character-data'

interface MoneyDisplayProps {
  money: MoneyState
}

export function MoneyDisplay({ money }: MoneyDisplayProps) {
  return (
    <div className={`p-4 rounded-lg border ${
      money.canAfford 
        ? 'bg-green-900/20 border-green-500/30' 
        : 'bg-red-900/20 border-red-500/30'
    }`}>
      <h3 className="text-lg font-semibold text-white mb-2">💰 Budget</h3>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Starting:</span>
          <div className="text-white font-medium">{money.startingZimes} Zimes</div>
        </div>
        <div>
          <span className="text-gray-400">Spent:</span>
          <div className="text-white font-medium">{money.spentZimes} Zimes</div>
        </div>
        <div>
          <span className="text-gray-400">Remaining:</span>
          <div className={`font-medium ${
            money.remainingZimes >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {money.remainingZimes} Zimes
          </div>
        </div>
      </div>
      
      {!money.canAfford && (
        <div className="mt-2 text-red-400 text-xs">
          ⚠️ Over budget by {Math.abs(money.remainingZimes)} Zimes
        </div>
      )}
    </div>
  )
} 