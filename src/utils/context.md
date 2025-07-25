# Utils - Technical Context

## Overview
The utils folder contains comprehensive character data definitions and utility functions for the BUGCHUD tabletop RPG digital implementation. This module serves as the central repository for all game data including races, origins, backgrounds, equipment, spells, and character generation logic.

## Core Functions

### `generateAttributes(): { twitch: number; flesh: number; mojo: number; zimes: number }`
**Purpose**: Generates the four core attribute values using 1d4 rolls as per BUGCHUD rules
**Implementation**: Creates four random values (1-4) and assigns them to the three attributes plus leftover zimes
**Usage**: Called during character creation to establish base attribute scores
**Dependencies**: Math.random() for dice simulation
**Side Effects**: None - pure function with no external state modification

### `applyRacialModifiers(baseAttributes, race): AttributeScore objects`
**Purpose**: Applies racial attribute loyalties (favored/middling/treacherous) to base attribute scores
**Implementation**: Combines numeric values with loyalty types based on selected race
**Usage**: Called after attribute generation to create final attribute scores with racial modifiers
**Dependencies**: Race interface and AttributeScore types
**Side Effects**: None - returns new objects without modifying inputs

### `calculateDerivedStats(attributes): { bones: number; manaDice: number }`
**Purpose**: Calculates derived statistics from core attributes
**Implementation**: Bones = Flesh value, Mana Dice = Mojo × 2
**Usage**: Called during character creation after attributes are finalized
**Dependencies**: AttributeScore interface
**Side Effects**: None - pure calculation function

### `getBackgroundsByOrigin(origin): Background[]`
**Purpose**: Filters available backgrounds based on character origin
**Implementation**: Array filtering based on background origin property
**Usage**: Used in character creator to show only valid background options
**Dependencies**: BACKGROUNDS array and OriginType
**Side Effects**: None - returns filtered array without modification

### `validateCharacterBackgrounds(backgrounds): boolean`
**Purpose**: Validates background selection follows BUGCHUD rules
**Implementation**: Checks unique background constraints and origin distribution
**Usage**: Form validation during character creation
**Dependencies**: Background interface
**Side Effects**: None - validation function only

## Types & Interfaces

### `Race`
**Purpose**: Defines playable character races with their attribute modifiers
**Properties**: 
- `id: string` - Unique identifier for the race
- `name: string` - Display name for the race
- `description: string` - Lore and gameplay description
- `attributeModifiers: AttributeModifiers` - Favored/treacherous attribute assignments
- `specialRules: string[]` - Race-specific gameplay rules
- `restrictions?: string[]` - Optional race limitations
**Usage Context**: Character creation race selection
**Validation Rules**: Each race must have unique ID and valid attribute modifiers

### `Origin`
**Purpose**: Represents character background origins (Pseudo-Civilized, Barbaric, Darklands)
**Properties**: 
- `id: OriginType` - Origin identifier
- `name: string` - Display name
- `description: string` - Origin background lore
- `availableBackgrounds: string[]` - List of valid background IDs
- `specialRules: string[]` - Origin-specific benefits
**Usage Context**: Determines available backgrounds and starting conditions
**Validation Rules**: Must contain valid background references

### `Background`
**Purpose**: Character profession/history affecting skills and equipment
**Properties**: 
- `id: string` - Unique background identifier
- `name: string` - Background title
- `description: string` - Background description
- `origin: OriginType` - Required origin for this background
- `isUnique: boolean` - Whether limited to one per character
- `startingEquipment: string[]` - Initial gear provided
- `specialAbilities: string[]` - Background-specific skills
- `skillBonuses: object` - Numeric bonuses to skills
**Usage Context**: Character creation background selection (3 total, min 2 from origin)
**Validation Rules**: Unique backgrounds limited to one per character

### `Weapon`
**Purpose**: Combat equipment with damage and special properties
**Properties**: 
- `id: string` - Weapon identifier
- `type: 'melee' | 'ranged' | 'thrown'` - Combat type
- `weight: WeightClass` - Light/Medium/Heavy affecting dice rolls
- `range?: number` - Range in feet for ranged weapons
- `accuracy: number` - Modifier to hit rolls
- `damage: string` - Dice notation for damage
- `special: string[]` - Special weapon properties
- `cost: number` - Purchase price in currency
**Usage Context**: Combat system and equipment management
**Validation Rules**: Ranged weapons must have range values

### `Armor`
**Purpose**: Protective equipment with defense values and penalties
**Properties**: 
- `type: ArmorType` - Light/Medium/Heavy classification
- `protection: number` - Damage reduction value
- `penalty: number` - Twitch-based action penalties
- `special: string[]` - Armor-specific properties
**Usage Context**: Character defense calculations and movement penalties
**Validation Rules**: Higher protection typically means higher penalties

### `Spell`
**Purpose**: Magic abilities with costs and effects
**Properties**: 
- `level: number` - Spell power level
- `manaCost: number` - Mana dice required to cast
- `castingTime: string` - Time required to cast
- `range: string` - Spell range description
- `duration: string` - Effect duration
- `school: string` - Magic school classification
- `xomRisk?: string` - Corruption risk description
**Usage Context**: Magic system and spellcasting
**Validation Rules**: Mana cost must be positive, Xom risk varies by school

### `Character`
**Purpose**: Complete character data structure for players
**Properties**: Core identity, attributes, derived stats, equipment, spells, and progression
**Usage Context**: Central data structure for all character operations
**Validation Rules**: Must follow BUGCHUD character creation rules

## Constants & Configuration

### `RACES`
**Value**: Array of 5 playable races (Humen, Dwarf, Elf, Halfling, Half-breed)
**Purpose**: Provides all available character races with their modifiers
**Usage**: Race selection in character creator
**Modification Guidelines**: New races must follow attribute loyalty patterns

### `ORIGINS`
**Value**: Array of 3 character origins (Pseudo-Civilized, Barbaric, Darklands)
**Purpose**: Defines character background categories
**Usage**: Origin selection affects available backgrounds
**Modification Guidelines**: New origins need corresponding background sets

### `BACKGROUNDS`
**Value**: Array of 24 character profession/history options across all three origins
**Purpose**: Provides starting skills, equipment, and abilities based on character's past
**Usage**: Background selection (choose 3, min 2 from origin)
**Available Options**:
- **Pseudo-Civilized (8)**: Fighter, Rogue, Scholar, Devout, Merchant, Noble-Blooded (unique), Monster Hunter, Duelist
- **Barbaric (7)**: Berserker (unique), Savage, Hunter, Shaman (unique), Nomad, Raider, Skinwalker  
- **Darklands (9)**: Wizard (unique), Vicious, Mutant, Perfumer Apprentice, Archon (unique), Former Slave, Cyborg, Infantry, Dread-Tongued
**Modification Guidelines**: Must specify origin, unique status, and balanced benefits. Unique backgrounds limited to one per character

### `WEAPONS`, `ARMOR`, `EQUIPMENT`
**Value**: Complete equipment databases from the BUGCHUD universe
**Purpose**: All available gear for character creation and gameplay
**Equipment Totals**: 43 weapons, 15 armor pieces, 37 equipment items
**Weapon Categories**: Brawl, Axes, Clubs, Knives, Polearms, Swords, Archery, Sidearms, Smallarms, Heavy Weapons, Grenades
**Armor Types**: Body armor (8 pieces) and Helmets (7 pieces) with authentic BUGCHUD stats and special properties
**Equipment Categories**: Survival, lighting, drugs, magic, SCOM technology, tools, containers, and special items
**Usage**: Equipment selection and combat calculations with authentic tabletop RPG mechanics
**Modification Guidelines**: Follow existing stat patterns, special abilities, and balance considerations from source material

### `IMMORTAL_EIGHT`, `OTHER_FAITHS`
**Value**: Complete faith systems from the BUGCHUD universe
**Purpose**: Provides divine worship options and covenant benefits for characters
**The Immortal Eight**: Abyssor (sea), Astrata (virtue), Ravox (heroism), Dendor (wild), Eora (love), Malum (craft), Xylix (tricks), Necra (death)
**Other Faiths**: Psydon (Old Faith), Graggar (Inhumen Pantheon)
**Usage**: Faith selection affects zealotry modifiers, covenant benefits, and roleplaying
**Modification Guidelines**: Maintain balance between covenant benefits and canticle debt risks

### `SPELLS`
**Value**: Magic spell definitions with schools and effects
**Purpose**: Magic system implementation
**Usage**: Spellcasting and grimoire management
**Modification Guidelines**: Consider Xom corruption risks and mana costs

### `MUTATIONS`
**Value**: Xom corruption effects (beneficial/neutral/detrimental)
**Purpose**: Tracks character corruption from chaotic energies
**Usage**: Applied when Xom points reach thresholds
**Modification Guidelines**: Balance beneficial vs detrimental effects

## Internal Architecture

### File Structure
- `character-data.ts` - All interfaces, data arrays, and utility functions

### Data Flow
1. Character creation starts with attribute generation
2. Racial modifiers applied to create final attributes
3. Origin selection determines available backgrounds
4. Background selection provides starting equipment and abilities
5. Optional faith selection for divine powers
6. Equipment and spell selection from available pools

### Key Patterns
- **Type Safety**: Comprehensive TypeScript interfaces for all game data
- **Modular Data**: Separate arrays for each game element type
- **Validation Functions**: Built-in validation for character creation rules
- **Utility Functions**: Helper functions for common operations

## Dependencies

### Internal
- No internal dependencies - self-contained utility module

### External
- TypeScript for type definitions and compilation
- Standard JavaScript Math library for random number generation

## Usage Examples

### Basic Character Creation
```typescript
import { generateAttributes, applyRacialModifiers, RACES, ORIGINS } from '@/utils/character-data';

// Generate base attributes
const baseAttribs = generateAttributes(); // { twitch: 3, flesh: 1, mojo: 4, zimes: 2 }

// Apply racial modifiers
const dwarf = RACES.find(r => r.id === 'dwarf');
const finalAttribs = applyRacialModifiers(baseAttribs, dwarf);
// Result: { twitch: {value: 3, loyalty: 'middling'}, flesh: {value: 1, loyalty: 'favored'}, mojo: {value: 4, loyalty: 'treacherous'} }
```

### Background Validation
```typescript
import { getBackgroundsByOrigin, validateCharacterBackgrounds, BACKGROUNDS } from '@/utils/character-data';

// Get valid backgrounds for origin
const barbaricBackgrounds = getBackgroundsByOrigin('barbaric');

// Validate background selection
const selectedBackgrounds = [scholar, warrior, shaman]; // Example selection
const isValid = validateCharacterBackgrounds(selectedBackgrounds); // false - scholar not from barbaric origin
```

### Equipment Filtering
```typescript
import { WEAPONS, ARMOR } from '@/utils/character-data';

// Find all light weapons
const lightWeapons = WEAPONS.filter(w => w.weight === 'light');

// Find armor by protection level
const heavyArmor = ARMOR.filter(a => a.protection >= 5);
```

## Error Handling
- Validation functions return boolean results for character creation rules
- Array filtering safely handles empty results
- Type system prevents invalid data assignments
- Optional properties handle missing data gracefully

## Performance Considerations
- All data arrays are pre-computed constants for fast access
- Filtering operations are performed on relatively small datasets
- Pure functions enable safe memoization if needed
- No external API calls or async operations

## Testing Strategy
- Unit tests for all utility functions with edge cases
- Validation tests for character creation rule compliance
- Data integrity tests for cross-references between arrays
- Type checking through TypeScript compilation

## Future Considerations
- Additional races and backgrounds as game expands
- More complex equipment with magical properties
- Advanced spell schools and metamagic systems
- Character progression and experience systems
- Integration with campaign management features 