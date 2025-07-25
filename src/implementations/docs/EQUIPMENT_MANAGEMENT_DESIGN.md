# Equipment Management System Design

## Overview
This document outlines the implementation of the complete equipment management system for the BUGCHUD character creator, including money management, encumbrance rules, and carrying capacity limitations as defined in the tabletop RPG.

## Core Systems

### Money Management System

#### Starting Funds
**Source**: BUGCHUD Chapter 3, Step 5: Purchase Equipment
- Characters start with `leftover zimes from Step 2 + 1` pouches of Zimes
- The leftover number is the 4th d4 roll from attribute generation (the zimes attribute)
- **Example**: If attribute rolls are [3, 1, 4, 2], character starts with 2 + 1 = 3 pouches of Zimes

#### Currency System
```typescript
interface Currency {
  pouches: number;      // Starting currency unit
  totalZimes: number;   // Calculated total for easy comparison
}

// Money calculation:
// 1 Pouch of Zimes = base unit for equipment purchases
// All equipment costs are in individual Zimes
```

#### Cost Tracking
- **Equipment Selection**: Track total cost of selected items vs available funds
- **Real-time Updates**: Show remaining money as items are selected/deselected
- **Validation**: Prevent selection if insufficient funds
- **Warning System**: Alert when approaching budget limits

### Encumbrance System

#### Container Limits
**Source**: BUGCHUD Chapter 4: Encumbrance
- **Base Containers**: 6 maximum containers
- **Armor Penalties**: 
  - Light Armor: -1 container (max 5)
  - Medium Armor: -2 containers (max 4) 
  - Heavy Armor: -3 containers (max 3)

#### Slot System
**Per Container**: Exactly 3 slots each
**Total Slots**: `(Max Containers - Armor Penalty) × 3`

#### Item Slot Requirements
**From BUGCHUD rules**:
- **1 Slot**: Small objects held with one hand
  - Lanterns, potions, daggers, goblets, ammo packs
- **2 Slots**: Larger single-hand objects  
  - Shortswords, axes, scepters, grimoires
- **3 Slots**: Two-handed objects
  - Rifles, bows, greatswords, armor, small chests
- **Unable to Store**: Too large for containers
  - Large chests, halberds, flamethrowers
- **No Slots**: Equipped items and pocket items
  - Equipped weapons/armor, rings, small coins

### Equipment Categories & Slot Classification

#### Weapons Slot Assignment
```typescript
const WEAPON_SLOTS: Record<string, number> = {
  // 1 Slot - Small weapons
  'dagger': 1,
  'switchblade': 1,
  'claw': 1,
  'power-glove': 1,
  
  // 2 Slots - Medium weapons  
  'shortsword': 2,
  'hand-axe': 2,
  'mace': 2,
  'handgun': 2,
  
  // 3 Slots - Large weapons
  'greatsword': 3,
  'crossbow': 3,
  'drok-rifle': 3,
  'lmg': 3,
  
  // Unable to store
  'halberd': -1,
  'flamethrower': -1,
  'rocket-launcher': -1
};
```

#### Armor Slot Assignment
```typescript
const ARMOR_SLOTS: Record<string, number> = {
  // 2 Slots - Light armor
  'gambeson': 2,
  'wizard-robes': 2,
  
  // 3 Slots - Medium/Heavy armor
  'chainmail': 3,
  'plate-armor': 3,
  'anti-ballistic-suit': 3
};
```

#### Equipment Slot Assignment
```typescript
const EQUIPMENT_SLOTS: Record<string, number> = {
  // 1 Slot
  'ration': 1,
  'torch': 1,
  'lighter': 1,
  'zigarette': 1,
  'bandages': 1,
  'lockpicks': 1,
  'ammo-pack': 1,
  
  // 2 Slots
  'grimoire': 2,
  'wizard-staff': 2,
  'scom-radio': 2,
  'surgical-kit': 2,
  
  // 3 Slots
  'bedroll': 3,
  'binoculars': 3,
  'mechanic-kit': 3
};
```

## Implementation Components

### 1. Money Management Hook

```typescript
interface MoneyState {
  startingZimes: number;     // From character creation
  spentZimes: number;        // Total cost of selected items
  remainingZimes: number;    // Available funds
  canAfford: boolean;        // Can afford currently selected items
}

export function useMoneyManagement(baseZimes: number) {
  const [money, setMoney] = useState<MoneyState>({
    startingZimes: baseZimes,
    spentZimes: 0,
    remainingZimes: baseZimes,
    canAfford: true
  });

  const updateCosts = useCallback((selectedEquipment: SelectedEquipment) => {
    const totalCost = calculateTotalCost(selectedEquipment);
    const remaining = money.startingZimes - totalCost;
    
    setMoney({
      startingZimes: money.startingZimes,
      spentZimes: totalCost,
      remainingZimes: remaining,
      canAfford: remaining >= 0
    });
  }, [money.startingZimes]);

  return { money, updateCosts };
}
```

### 2. Encumbrance Management Hook

```typescript
interface EncumbranceState {
  maxContainers: number;     // Based on armor
  totalSlots: number;        // maxContainers × 3
  usedSlots: number;         // Slots taken by items
  availableSlots: number;    // Remaining slots
  canCarry: boolean;         // Within carrying capacity
  unstorableItems: string[]; // Items too large for containers
}

export function useEncumbranceManagement(selectedArmor: Armor[], selectedContainers: Container[]) {
  const [encumbrance, setEncumbrance] = useState<EncumbranceState>();

  const updateEncumbrance = useCallback((selectedEquipment: SelectedEquipment) => {
    const armorPenalty = calculateArmorPenalty(selectedEquipment.armor);
    const maxContainers = Math.max(3, 6 - armorPenalty);
    const actualContainers = Math.min(selectedEquipment.containers.length, maxContainers);
    const totalSlots = actualContainers * 3;
    
    const { usedSlots, unstorableItems } = calculateSlotUsage(selectedEquipment);
    
    setEncumbrance({
      maxContainers,
      totalSlots,
      usedSlots,
      availableSlots: totalSlots - usedSlots,
      canCarry: usedSlots <= totalSlots,
      unstorableItems
    });
  }, []);

  return { encumbrance, updateEncumbrance };
}
```

### 3. Enhanced Equipment Browser

#### Money Display Component
```typescript
function MoneyDisplay({ money }: { money: MoneyState }) {
  return (
    <div className={`p-4 rounded-lg ${money.canAfford ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
      <h3 className="text-lg font-semibold text-white mb-2">Budget</h3>
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
          <div className={`font-medium ${money.remainingZimes >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {money.remainingZimes} Zimes
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### Encumbrance Display Component
```typescript
function EncumbranceDisplay({ encumbrance }: { encumbrance: EncumbranceState }) {
  return (
    <div className={`p-4 rounded-lg ${encumbrance.canCarry ? 'bg-blue-900/20 border-blue-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
      <h3 className="text-lg font-semibold text-white mb-2">Carrying Capacity</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Containers:</span>
          <div className="text-white font-medium">{encumbrance.maxContainers} max</div>
        </div>
        <div>
          <span className="text-gray-400">Slots:</span>
          <div className={`font-medium ${encumbrance.canCarry ? 'text-blue-400' : 'text-red-400'}`}>
            {encumbrance.usedSlots} / {encumbrance.totalSlots}
          </div>
        </div>
      </div>
      
      {encumbrance.unstorableItems.length > 0 && (
        <div className="mt-2">
          <span className="text-yellow-400 text-xs">Must be carried: {encumbrance.unstorableItems.join(', ')}</span>
        </div>
      )}
    </div>
  );
}
```

#### Item Selection Validation
```typescript
function validateItemSelection(
  item: Weapon | Armor | Equipment,
  currentSelection: SelectedEquipment,
  money: MoneyState,
  encumbrance: EncumbranceState
): { canSelect: boolean; reason?: string } {
  
  // Check money
  const newCost = money.spentZimes + item.cost;
  if (newCost > money.startingZimes) {
    return { 
      canSelect: false, 
      reason: `Insufficient funds. Need ${newCost - money.startingZimes} more Zimes.` 
    };
  }
  
  // Check slots
  const itemSlots = getItemSlots(item);
  if (itemSlots > 0 && itemSlots > encumbrance.availableSlots) {
    return { 
      canSelect: false, 
      reason: `Not enough slots. Need ${itemSlots} slots, have ${encumbrance.availableSlots}.` 
    };
  }
  
  // Check if unstorable but no containers
  if (itemSlots === -1 && encumbrance.maxContainers === 0) {
    return { 
      canSelect: false, 
      reason: `Cannot carry this item without containers.` 
    };
  }
  
  return { canSelect: true };
}
```

## User Interface Changes

### Enhanced Equipment Browser Layout
```typescript
function EquipmentBrowser() {
  const money = useMoneyManagement(startingZimes);
  const encumbrance = useEncumbranceManagement(selectedArmor, selectedContainers);
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with status displays */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <MoneyDisplay money={money} />
        <EncumbranceDisplay encumbrance={encumbrance} />
      </div>
      
      {/* Equipment tabs and content */}
      <div className="mb-6">
        <EquipmentTabs />
        <EquipmentContent 
          onItemSelect={(item) => {
            const validation = validateItemSelection(item, currentSelection, money, encumbrance);
            if (validation.canSelect) {
              handleItemSelect(item);
            } else {
              showError(validation.reason);
            }
          }}
        />
      </div>
    </div>
  );
}
```

### Item Card Enhancements
```typescript
function ItemCard({ item, isSelected, onSelect }: ItemCardProps) {
  const validation = validateItemSelection(item, currentSelection, money, encumbrance);
  const slots = getItemSlots(item);
  
  return (
    <div 
      className={`
        border-2 rounded-lg p-4 transition-colors cursor-pointer
        ${isSelected ? 'border-purple-500 bg-purple-600/20' : 
          validation.canSelect ? 'border-purple-500/30 bg-black/20 hover:border-purple-400/50' :
          'border-red-500/30 bg-red-900/10 opacity-60 cursor-not-allowed'}
      `}
      onClick={() => validation.canSelect && onSelect(item)}
    >
      {/* Item details */}
      <h4 className="text-lg font-bold text-white mb-2">{item.name}</h4>
      
      {/* Cost and slots info */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">Cost: {item.cost} Zimes</span>
        {slots > 0 && <span className="text-gray-400">Slots: {slots}</span>}
        {slots === -1 && <span className="text-yellow-400">Must carry</span>}
      </div>
      
      {/* Validation error */}
      {!validation.canSelect && (
        <div className="text-red-400 text-xs mt-2">{validation.reason}</div>
      )}
    </div>
  );
}
```

## Utility Functions

### Cost Calculation
```typescript
function calculateTotalCost(equipment: SelectedEquipment): number {
  return [
    ...equipment.weapons,
    ...equipment.armor,
    ...equipment.equipment,
    ...equipment.containers
  ].reduce((total, item) => total + item.cost, 0);
}
```

### Slot Usage Calculation
```typescript
function calculateSlotUsage(equipment: SelectedEquipment): { usedSlots: number; unstorableItems: string[] } {
  let usedSlots = 0;
  const unstorableItems: string[] = [];
  
  [...equipment.weapons, ...equipment.armor, ...equipment.equipment].forEach(item => {
    const slots = getItemSlots(item);
    if (slots === -1) {
      unstorableItems.push(item.name);
    } else if (slots > 0) {
      usedSlots += slots;
    }
  });
  
  return { usedSlots, unstorableItems };
}
```

### Armor Penalty Calculation
```typescript
function calculateArmorPenalty(selectedArmor: Armor[]): number {
  const bodyArmor = selectedArmor.find(armor => 
    !armor.special.includes('Head protection')
  );
  
  if (!bodyArmor) return 0;
  
  switch (bodyArmor.type) {
    case 'light': return 1;
    case 'medium': return 2;  
    case 'heavy': return 3;
    default: return 0;
  }
}
```

## Integration Points

### Character Creation Hook Updates
```typescript
// Add to useCharacterCreation hook
const [startingZimes, setStartingZimes] = useState(0);

// Update when attributes are generated
useEffect(() => {
  if (state.attributes) {
    setStartingZimes((state.attributes.zimes + 1) * 80); // (leftover + 1) * 80 as per rules
  }
}, [state.attributes]);
```

### Validation Integration
```typescript
// Add to character validation
const validateEquipment = useCallback((): string | null => {
  if (!money.canAfford) {
    return `Insufficient funds. Over budget by ${Math.abs(money.remainingZimes)} Zimes.`;
  }
  
  if (!encumbrance.canCarry) {
    return `Cannot carry all items. Over capacity by ${encumbrance.usedSlots - encumbrance.totalSlots} slots.`;
  }
  
  return null;
}, [money, encumbrance]);
```

## Testing Considerations

### Test Cases
1. **Money Management**
   - Character with 1 Zime can only select cheap items
   - Character with 10 Zimes can select expensive combinations
   - Deselecting items refunds money correctly

2. **Encumbrance**  
   - Light armor allows 5 containers (15 slots)
   - Heavy armor allows 3 containers (9 slots)
   - Unstorable items are tracked separately

3. **Item Validation**
   - Cannot select items when over budget
   - Cannot select items when over slot capacity
   - Appropriate error messages displayed

4. **Edge Cases**
   - Character with no containers
   - Character with maximum containers
   - Selecting only unstorable items

## Performance Considerations

- **Memoization**: Cache slot and cost calculations
- **Debouncing**: Debounce validation checks on rapid selection changes  
- **Lazy Loading**: Only calculate encumbrance when needed
- **Efficient Updates**: Use refs to avoid unnecessary recalculations

## Future Enhancements

1. **Container Types**: Different containers for different item types
2. **Weight System**: Additional weight-based limitations  
3. **Equipment Sets**: Predefined equipment packages
4. **Cost Estimation**: Show how close to budget limit
5. **Smart Suggestions**: Recommend items within budget/capacity
6. **Export/Import**: Save and load equipment configurations 