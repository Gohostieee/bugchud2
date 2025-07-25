// BUGCHUD Character Data - Comprehensive Type Definitions and Data
// Based on BUGCHUD Tabletop RPG System

// ============================================================================
// CORE TYPES & ENUMS
// ============================================================================

export type AttributeLoyalty = 'favored' | 'middling' | 'treacherous';
export type AttributeType = 'twitch' | 'flesh' | 'mojo';
export type WeightClass = 'light' | 'medium' | 'heavy';
export type ArmorType = 'light' | 'medium' | 'heavy';
export type OriginType = 'pseudo-civilized' | 'barbaric' | 'darklands';

export interface AttributeScore {
  value: number;
  loyalty: AttributeLoyalty;
}

export interface AttributeModifiers {
  twitch: AttributeLoyalty;
  flesh: AttributeLoyalty;
  mojo: AttributeLoyalty;
}

// ============================================================================
// RACE DEFINITIONS
// ============================================================================

export interface Race {
  id: string;
  name: string;
  description: string;
  attributeModifiers: AttributeModifiers;
  specialRules: string[];
  restrictions?: string[];
}

const RACES: Race[] = [
  {
    id: 'humen',
    name: 'Humen',
    description: 'Balanced and adaptable, with no favored or treacherous attributes.',
    attributeModifiers: {
      twitch: 'middling',
      flesh: 'middling',
      mojo: 'middling'
    },
    specialRules: [
      'No attribute loyalties - all attributes are middling',
      'Most adaptable race with no restrictions'
    ]
  },
  {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Hardy folk with strong bodies but limited magical aptitude.',
    attributeModifiers: {
      twitch: 'middling',
      flesh: 'favored',
      mojo: 'treacherous'
    },
    specialRules: [
      'Favored Flesh - enhanced physical resilience',
      'Treacherous Mojo - magical difficulties'
    ]
  },
  {
    id: 'elf',
    name: 'Elf',
    description: 'Magically attuned but physically fragile beings.',
    attributeModifiers: {
      twitch: 'middling',
      flesh: 'treacherous',
      mojo: 'favored'
    },
    specialRules: [
      'Favored Mojo - enhanced magical abilities',
      'Treacherous Flesh - physical vulnerabilities'
    ],
    restrictions: [
      'Cannot gain Xom from contaminated areas due to magical sensitivity'
    ]
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Quick and nimble but lacking in physical strength.',
    attributeModifiers: {
      twitch: 'favored',
      flesh: 'treacherous',
      mojo: 'middling'
    },
    specialRules: [
      'Favored Twitch - enhanced speed and dexterity',
      'Treacherous Flesh - reduced physical durability'
    ]
  },
  {
    id: 'half-breed',
    name: 'Half-breed',
    description: 'Mixed heritage brings only the worst qualities of both parents.',
    attributeModifiers: {
      twitch: 'treacherous',
      flesh: 'treacherous',
      mojo: 'treacherous'
    },
    specialRules: [
      'All attributes are treacherous',
      'Inherit the worst qualities of mixed heritage',
      'No favored attributes whatsoever'
    ]
  }
];

// ============================================================================
// ORIGIN DEFINITIONS
// ============================================================================

export interface Origin {
  id: OriginType;
  name: string;
  description: string;
  availableBackgrounds: string[];
  specialRules: string[];
}

const ORIGINS: Origin[] = [
  {
    id: 'pseudo-civilized',
    name: 'Pseudo-Civilized',
    description: 'From the settled lands where some semblance of order remains.',
    availableBackgrounds: [
      'fighter', 'rogue', 'scholar', 'devout', 'merchant', 'noble', 'monster-hunter', 'duelist'
    ],
    specialRules: [
      'Access to formal education and training',
      'Better starting equipment quality',
      'Social connections in civilized areas'
    ]
  },
  {
    id: 'barbaric',
    name: 'Barbaric',
    description: 'From the wild lands beyond civilization\'s reach.',
    availableBackgrounds: [
      'berserker', 'savage', 'hunter', 'shaman', 'nomad', 'raider', 'skinwalker'
    ],
    specialRules: [
      'Enhanced survival skills',
      'Natural weapon proficiency',
      'Resistance to environmental hazards'
    ]
  },
  {
    id: 'darklands',
    name: 'Darklands',
    description: 'From the most dangerous and corrupted regions of Psydonia.',
    availableBackgrounds: [
      'wizard', 'vicious', 'mutant', 'perfumer-apprentice', 'archon', 'former-slave', 'cyborg', 'infantry', 'dread-tongued'
    ],
    specialRules: [
      'Immunity to minor Xom effects',
      'Strange mutations may be beneficial',
      'Knowledge of forbidden arts'
    ]
  }
];

// ============================================================================
// BACKGROUND DEFINITIONS
// ============================================================================

export interface Background {
  id: string;
  name: string;
  description: string;
  origin: OriginType;
  isUnique: boolean; // ** backgrounds limited to one per character
  startingEquipment: string[];
  specialAbilities: string[];
  skillBonuses: { [key: string]: number };
}

const BACKGROUNDS: Background[] = [
  // Pseudo-Civilized Backgrounds
  {
    id: 'fighter',
    name: 'Fighter',
    description: 'Professional warrior versed in combat tactics and weapons.',
    origin: 'pseudo-civilized',
    isUnique: false,
    startingEquipment: ['weapon', 'armor', 'shield', 'military supplies'],
    specialAbilities: ['Combat Expertise', 'Weapon Proficiency', 'Locational Strike Control'],
    skillBonuses: { 'melee': 2, 'tactics': 1 }
  },
  {
    id: 'rogue',
    name: 'Rogue',
    description: 'Expert in stealth, thievery, and surviving by wit.',
    origin: 'pseudo-civilized',
    isUnique: false,
    startingEquipment: ['lockpicks', 'dagger', 'dark clothing', 'thieves tools'],
    specialAbilities: ['Sneak Attack', 'Lock Picking', 'Reroll Twitch for Roguish Activities'],
    skillBonuses: { 'stealth': 2, 'thievery': 2 }
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Learned in books and ancient knowledge.',
    origin: 'pseudo-civilized',
    isUnique: false,
    startingEquipment: ['books', 'writing materials', 'lamp', 'robes'],
    specialAbilities: ['Research', 'Ancient Languages', 'Know 1d4 Facts About Any Subject'],
    skillBonuses: { 'knowledge': 2, 'investigation': 1 }
  },
  {
    id: 'devout',
    name: 'Devout',
    description: 'Faithful servant devoted to divine worship.',
    origin: 'pseudo-civilized',
    isUnique: false,
    startingEquipment: ['holy symbol', 'religious texts', 'vestments', 'blessed items'],
    specialAbilities: ['Divine Connection', 'Begin With Deity Relic', 'Religious Authority'],
    skillBonuses: { 'theology': 2, 'zealotry-saves': 1 }
  },
  {
    id: 'merchant',
    name: 'Merchant',
    description: 'Trader and dealmaker with connections across the realm.',
    origin: 'pseudo-civilized',
    isUnique: false,
    startingEquipment: ['trade goods', 'scales', 'ledger', 'purse'],
    specialAbilities: ['Appraise', 'Negotiate', 'Market Contacts'],
    skillBonuses: { 'persuasion': 2, 'appraisal': 1 }
  },
  {
    id: 'noble',
    name: 'Noble-Blooded',
    description: 'Born to privilege and political power.',
    origin: 'pseudo-civilized',
    isUnique: true,
    startingEquipment: ['fine clothes', 'signet ring', 'quality weapon', 'extra pouch of zimes'],
    specialAbilities: ['Command', 'Social Status', 'No Shylock Deposit Taxes'],
    skillBonuses: { 'leadership': 2, 'etiquette': 2 }
  },
  {
    id: 'monster-hunter',
    name: 'Monster Hunter',
    description: 'Specialist in hunting nite-creechers and supernatural threats.',
    origin: 'pseudo-civilized',
    isUnique: false,
    startingEquipment: ['silver weapons', 'hunting gear', 'monster lore', 'protective charms'],
    specialAbilities: ['Monster Lore', 'Advantage vs Nite-Creechers', 'Sense Monster Presence'],
    skillBonuses: { 'monster-hunting': 2, 'tracking': 1 }
  },
  {
    id: 'duelist',
    name: 'Duelist',
    description: 'Refined warrior who favors finesse over brute force.',
    origin: 'pseudo-civilized',
    isUnique: false,
    startingEquipment: ['rapier', 'dueling clothes', 'fine gloves', 'honor codes'],
    specialAbilities: ['Weapon Finesse', 'Use Twitch for One-Handed Melee', 'Riposte'],
    skillBonuses: { 'dueling': 2, 'agility': 1 }
  },
  
  // Barbaric Backgrounds
  {
    id: 'berserker',
    name: 'Berserker',
    description: 'Warrior who channels divine fury in battle.',
    origin: 'barbaric',
    isUnique: true,
    startingEquipment: ['great weapon', 'battle scars', 'war paint', 'rage totems'],
    specialAbilities: ['Battle Rage (once per day)', 'Fury of the Gods', 'Half Damage While Raging'],
    skillBonuses: { 'melee': 2, 'intimidation': 2 }
  },
  {
    id: 'savage',
    name: 'Savage',
    description: 'One who embraces the primal way of naked combat.',
    origin: 'barbaric',
    isUnique: false,
    startingEquipment: ['natural weapons', 'tribal markings', 'survival gear', 'weather charms'],
    specialAbilities: ['Natural Armor', 'Weather Immunity', 'Superior Dodge When Naked'],
    skillBonuses: { 'survival': 2, 'dodge': 2 }
  },
  {
    id: 'hunter',
    name: 'Hunter',
    description: 'Skilled tracker and provider for the tribe.',
    origin: 'barbaric',
    isUnique: false,
    startingEquipment: ['bow', 'arrows', 'hunting knife', 'hide armor'],
    specialAbilities: ['Track', 'Animal Lore', 'First Arrow Always Hits'],
    skillBonuses: { 'ranged': 2, 'survival': 1 }
  },
  {
    id: 'shaman',
    name: 'Shaman',
    description: 'Spiritual guide and keeper of ancient wisdom.',
    origin: 'barbaric',
    isUnique: true,
    startingEquipment: ['staff', 'ritual items', 'herbs', 'spirit focus'],
    specialAbilities: ['Spirit Sight', 'Ritual Magic', 'Spend MD for Canticle Debt'],
    skillBonuses: { 'magic': 2, 'healing': 1 }
  },
  {
    id: 'nomad',
    name: 'Nomad',
    description: 'Wanderer of the steppes who knows no fixed home.',
    origin: 'barbaric',
    isUnique: false,
    startingEquipment: ['mount', 'travel gear', 'maps', 'navigation tools'],
    specialAbilities: ['Mounted Combat', 'Navigation', 'No Ranged Penalty on Moving Vehicles'],
    skillBonuses: { 'riding': 2, 'navigation': 1 }
  },
  {
    id: 'raider',
    name: 'Raider',
    description: 'Fierce warrior who strikes terror into civilized lands.',
    origin: 'barbaric',
    isUnique: false,
    startingEquipment: ['dual weapons', 'raiding gear', 'intimidating armor', 'battle trophies'],
    specialAbilities: ['Dual Wielding', 'Intimidating Presence', 'No Dual Wield Penalty'],
    skillBonuses: { 'melee': 2, 'intimidation': 1 }
  },
  {
    id: 'skinwalker',
    name: 'Skinwalker',
    description: 'Ritualist who has gained the strength of beasts.',
    origin: 'barbaric',
    isUnique: false,
    startingEquipment: ['ritual scars', 'beast totems', 'natural weapons', 'spirit bindings'],
    specialAbilities: ['Beast Strength', 'Fists and Bites as Medium Weapons', 'Animal Communion'],
    skillBonuses: { 'ritual': 2, 'beast-lore': 1 }
  },
  
  // Darklands Backgrounds
  {
    id: 'wizard',
    name: 'Wizard',
    description: 'Master of the black arts and forbidden knowledge.',
    origin: 'darklands',
    isUnique: true,
    startingEquipment: ['grimoire', 'spell components', 'wizard robes', 'staff'],
    specialAbilities: ['Spellcasting', 'Begin With Lightning Bolt and Read Mind', 'Arcane Knowledge'],
    skillBonuses: { 'magic': 3, 'arcane-lore': 2 }
  },
  {
    id: 'vicious',
    name: 'Vicious',
    description: 'One hardened by the cruelty of the Darklands.',
    origin: 'darklands',
    isUnique: false,
    startingEquipment: ['cruel weapons', 'intimidating gear', 'scars', 'dark reputation'],
    specialAbilities: ['Enhanced Cruelty', '+1 to All Melee Attacks', 'Fear Immunity'],
    skillBonuses: { 'melee': 2, 'intimidation': 2 }
  },
  {
    id: 'mutant',
    name: 'Mutant',
    description: 'Marked by Xom corruption but retaining humanity.',
    origin: 'darklands',
    isUnique: false,
    startingEquipment: ['mutation suppressants', 'adaptive gear', 'medical supplies', 'warning signs'],
    specialAbilities: ['Begin With 2 Mutations', 'Choose Best Mutation Roll', 'Xom Resistance'],
    skillBonuses: { 'mutation-control': 2, 'survival': 1 }
  },
  {
    id: 'perfumer-apprentice',
    name: 'Perfumer Apprentice',
    description: 'Student of alchemical arts and chemical blisses.',
    origin: 'darklands',
    isUnique: false,
    startingEquipment: ['alchemical tools', 'chemical samples', 'lab equipment', 'recipe notes'],
    specialAbilities: ['Alchemy', 'Brew Potions and Powders', 'Chemical Knowledge'],
    skillBonuses: { 'alchemy': 2, 'chemistry': 1 }
  },
  {
    id: 'archon',
    name: 'Archon',
    description: 'Noble of an Inhumen city-state with dark authority.',
    origin: 'darklands',
    isUnique: true,
    startingEquipment: ['noble insignia', 'dark authority', 'city connections', 'inhumen artifacts'],
    specialAbilities: ['Political Immunity', 'Inhumen Authority', 'Cannot Be Killed Without Recourse'],
    skillBonuses: { 'politics': 2, 'intimidation': 2 }
  },
  {
    id: 'former-slave',
    name: 'Former Slave',
    description: 'One who survived the horrors of Darklands bondage.',
    origin: 'darklands',
    isUnique: false,
    startingEquipment: ['simple tools', 'freedom papers', 'survival instincts', 'hidden resources'],
    specialAbilities: ['Hardy Constitution', '+2 to Physique Saves', 'Survival Instincts'],
    skillBonuses: { 'endurance': 2, 'stealth': 1 }
  },
  {
    id: 'cyborg',
    name: 'Cyborg',
    description: 'Enhanced with mechanical augmentations.',
    origin: 'darklands',
    isUnique: false,
    startingEquipment: ['bionic parts', 'maintenance tools', 'SCOM devices', 'technical manuals'],
    specialAbilities: ['Cybernetic Enhancements', 'Begin With Major Bionic', 'Tech Affinity'],
    skillBonuses: { 'technology': 2, 'maintenance': 1 }
  },
  {
    id: 'infantry',
    name: 'Infantry',
    description: 'Soldier trained in advanced firearms and tactics.',
    origin: 'darklands',
    isUnique: false,
    startingEquipment: ['advanced rifle', 'military gear', 'ammunition', 'tactical equipment'],
    specialAbilities: ['Weapon Training', 'Reduced Ammo Scarcity', 'Military Tactics'],
    skillBonuses: { 'ranged': 2, 'tactics': 1 }
  },
  {
    id: 'dread-tongued',
    name: 'Dread-Tongued',
    description: 'Speaker of the Black Word, the language of darkness.',
    origin: 'darklands',
    isUnique: false,
    startingEquipment: ['black word texts', 'translation guides', 'dark communications', 'forbidden knowledge'],
    specialAbilities: ['Black Word Fluency', 'Communicate with Nite-Creechers', 'Dark Linguistics'],
    skillBonuses: { 'linguistics': 2, 'forbidden-lore': 2 }
  }
];

// ============================================================================
// EQUIPMENT DEFINITIONS
// ============================================================================

export interface Weapon {
  id: string;
  name: string;
  type: 'melee' | 'ranged' | 'thrown';
  weight: WeightClass;
  range?: number; // null for melee weapons
  accuracy: number;
  damage: string; // dice notation
  special: string[];
  cost: number;
  slots: number; // -1 = cannot store, 0 = equipped/pocket, 1-3 = storage slots
  description: string;
}

const WEAPONS: Weapon[] = [
  // Brawl Weapons
  {
    id: 'fist',
    name: 'Fist',
    type: 'melee',
    weight: 'light',
    accuracy: 0,
    damage: '+1',
    special: ['No dual wield penalty', 'Natural weapon'],
    cost: 0,
    slots: 0, // Natural weapon, no storage needed
    description: 'Do not roll for damage. Apply only +1 damage.'
  },
  {
    id: 'claw',
    name: 'Claw',
    type: 'melee',
    weight: 'light',
    accuracy: 0,
    damage: '1d4',
    special: ['No dual wield penalty', '+1d4 vs unarmored'],
    cost: 5,
    slots: 1, // Small weapon
    description: 'If target struck is unarmored, roll an additional 1d4 damage.'
  },
  {
    id: 'power-glove',
    name: 'Power Glove',
    type: 'melee',
    weight: 'light',
    accuracy: 0,
    damage: '1d4',
    special: ['No dual wield penalty', 'Exploding 4s'],
    cost: 25,
    slots: 1, // Small weapon
    description: 'Roll 1d4 for damage. Rolls of 4 explode.'
  },

  // Axes (+1 damage)
  {
    id: 'hand-axe',
    name: 'Hand-Axe',
    type: 'melee',
    weight: 'medium',
    accuracy: 0,
    damage: '1d6+1',
    special: ['Throwable', 'Heavy when thrown'],
    cost: 15,
    slots: 2, // Medium weapon
    description: 'Counts as a Heavy weapon if thrown.'
  },
  {
    id: 'greataxe',
    name: 'Greataxe',
    type: 'melee',
    weight: 'heavy',
    accuracy: -1,
    damage: '2d6+1',
    special: ['Two-handed', 'Exploding 6s'],
    cost: 40,
    slots: 3, // Large weapon
    description: 'Rolls of 6 explode.'
  },
  {
    id: 'power-saw',
    name: 'Power-Saw',
    type: 'melee',
    weight: 'medium',
    accuracy: 0,
    damage: '1d6+1',
    special: ['50% ignore all soaks'],
    cost: 35,
    slots: 2, // Medium weapon
    description: '50% chance of ignoring all soaks.'
  },

  // Clubs (reduce armor weight for damage)
  {
    id: 'cudgel',
    name: 'Cudgel',
    type: 'melee',
    weight: 'light',
    accuracy: 0,
    damage: '2d6L',
    special: ['Stun unarmored', 'Reduce armor weight'],
    cost: 5,
    slots: 1, // Small weapon
    description: 'Those struck while unarmored make a save vs Physique or be stunned for 1d4 minutes.'
  },
  {
    id: 'pain-stick',
    name: 'Pain-Stick',
    type: 'melee',
    weight: 'light',
    accuracy: 0,
    damage: '2d6L',
    special: ['Stun on hit (3 charges)', 'Reduce armor weight'],
    cost: 30,
    slots: 1, // Small weapon
    description: 'Those struck make a save vs Physique or be stunned for 1d6 minutes. Has three charges.'
  },
  {
    id: 'mace',
    name: 'Mace',
    type: 'melee',
    weight: 'medium',
    accuracy: 0,
    damage: '1d6',
    special: ['Ignore 1 soak', 'Reduce armor weight'],
    cost: 20,
    slots: 2, // Medium weapon
    description: 'Ignores 1 soak.'
  },
  {
    id: 'morningstar',
    name: 'Morningstar',
    type: 'melee',
    weight: 'medium',
    accuracy: 0,
    damage: '1d6',
    special: ['+1 damage vs unarmored', 'Reduce armor weight'],
    cost: 25,
    slots: 2, // Medium weapon
    description: 'Does +1 damage to unarmored targets.'
  },
  {
    id: 'flail',
    name: 'Flail',
    type: 'melee',
    weight: 'medium',
    accuracy: 0,
    damage: '1d6',
    special: ['Ignore shields', 'Reduce armor weight'],
    cost: 30,
    slots: 2, // Medium weapon
    description: 'Ignores shields.'
  },
  {
    id: 'warhammer',
    name: 'Warhammer',
    type: 'melee',
    weight: 'heavy',
    accuracy: -1,
    damage: '2d6H',
    special: ['Two-handed', 'Knockdown', 'Reduce armor weight'],
    cost: 45,
    slots: 3, // Large weapon
    description: 'Those struck must save vs Physique or be thrown back and knocked prone.'
  },
  {
    id: 'nunchucks',
    name: 'Nunchucks',
    type: 'melee',
    weight: 'light',
    accuracy: -2,
    damage: '2d6L',
    special: ['Self-hit risk', 'Reduce armor weight'],
    cost: 10,
    slots: 1, // Small weapon
    description: 'Must make 2S+ Twitch check to not hit yourself. These things suck.'
  },

  // Knives (use Twitch, heavy damage to prone)
  {
    id: 'switchblade',
    name: 'Switchblade',
    type: 'melee',
    weight: 'light',
    accuracy: 1,
    damage: '2d6L',
    special: ['Use Twitch', 'Heavy vs prone', 'Concealable'],
    cost: 8,
    slots: 1, // Small weapon
    description: 'Can easily be hidden on person.'
  },
  {
    id: 'dagger',
    name: 'Dagger',
    type: 'melee',
    weight: 'light',
    accuracy: 1,
    damage: '2d6L',
    special: ['Use Twitch', 'Heavy vs prone', 'Grappled = prone'],
    cost: 5,
    slots: 1, // Small weapon
    description: 'Grappled targets are considered prone.'
  },
  {
    id: 'cleaver',
    name: 'Cleaver',
    type: 'melee',
    weight: 'light',
    accuracy: 0,
    damage: '2d6L',
    special: ['Use Twitch', 'Heavy vs prone', '+1 damage to limbs'],
    cost: 12,
    slots: 1, // Small weapon
    description: '+1 damage to limb shots.'
  },

  // Polearms (longer reach, retain weight when thrown)
  {
    id: 'spear',
    name: 'Spear',
    type: 'melee',
    weight: 'medium',
    accuracy: 0,
    damage: '1d6',
    special: ['Reach', 'Attack behind allies'],
    cost: 15,
    slots: 3, // Large weapon
    description: 'May make attacks behind allies.'
  },
  {
    id: 'bombspear',
    name: 'Bombspear',
    type: 'melee',
    weight: 'medium',
    accuracy: 0,
    damage: '1d6',
    special: ['Reach', 'Explosive on hit (2d6)'],
    cost: 50,
    slots: 3, // Large weapon
    description: 'Detonates upon hitting a target, causing a short radius explosion (2d6 damage).'
  },
  {
    id: 'halberd',
    name: 'Halberd',
    type: 'melee',
    weight: 'medium',
    accuracy: 0,
    damage: '1d6',
    special: ['Two-handed', 'Reach', 'Ignore 1 soak at close range', 'Too large for Dwarves/Halflings'],
    cost: 35,
    slots: -1, // Unable to store
    description: 'If the attack is made at close range, ignore 1 soak.'
  },
  {
    id: 'javelin',
    name: 'Javelin',
    type: 'thrown',
    weight: 'medium',
    range: 60,
    accuracy: 1,
    damage: '1d6',
    special: ['Reach', '+1 success when throwing'],
    cost: 10,
    slots: 3, // Large weapon
    description: 'Add +1 automatic success to Twitch checks when throwing this weapon.'
  },

  // Swords (reroll melee Flesh checks once)
  {
    id: 'shortsword',
    name: 'Shortsword',
    type: 'melee',
    weight: 'medium',
    accuracy: 1,
    damage: '1d6',
    special: ['Reroll Flesh checks', '+1D melee attack'],
    cost: 25,
    slots: 2, // Medium weapon
    description: 'Receives +1D when making a melee attack.'
  },
  {
    id: 'greatsword',
    name: 'Greatsword',
    type: 'melee',
    weight: 'heavy',
    accuracy: -1,
    damage: '2d6H',
    special: ['Two-handed', 'Reroll Flesh checks', 'Strike two targets'],
    cost: 50,
    slots: 3, // Large weapon
    description: 'May strike two combatants at once.'
  },
  {
    id: 'rapier',
    name: 'Rapier',
    type: 'melee',
    weight: 'light',
    accuracy: 1,
    damage: '2d6L',
    special: ['Reroll Flesh checks', 'Follow-up attack'],
    cost: 30,
    slots: 2, // Medium weapon
    description: 'After a successful hit, make a 3S+ Twitch check. If successful, strike again.'
  },

  // Archery (no ammo scarcity)
  {
    id: 'shortbow',
    name: 'Shortbow',
    type: 'ranged',
    weight: 'light',
    range: 80,
    accuracy: 1,
    damage: '2d6L',
    special: ['Two-handed', 'No ammo scarcity', 'Moving doesn\'t cancel aim'],
    cost: 20,
    slots: 3, // Large weapon
    description: 'Moving does not cancel aimed shots.'
  },
  {
    id: 'longbow',
    name: 'Longbow',
    type: 'ranged',
    weight: 'medium',
    range: 120,
    accuracy: 2,
    damage: '1d6+1',
    special: ['Two-handed', 'No ammo scarcity', 'Physique save to fire', 'Too large for Dwarves/Halflings'],
    cost: 40,
    slots: 3, // Large weapon
    description: 'Make a Save vs Physique check in order to fire. +1 damage.'
  },
  {
    id: 'hand-crossbow',
    name: 'Hand-Crossbow',
    type: 'ranged',
    weight: 'light',
    range: 60,
    accuracy: 1,
    damage: '2d6L',
    special: ['No ammo scarcity', 'Counts as Sidearm'],
    cost: 35,
    slots: 2, // Medium weapon
    description: 'Counts as a Sidearm in addition to an Archery weapon.'
  },
  {
    id: 'crossbow',
    name: 'Crossbow',
    type: 'ranged',
    weight: 'heavy',
    range: 100,
    accuracy: 2,
    damage: '2d6H',
    special: ['Two-handed', 'No ammo scarcity', 'Load grenades/potions'],
    cost: 60,
    slots: 3, // Large weapon
    description: 'May be loaded with grenades or alchemical potions.'
  },

  // Sidearms (usable in melee)
  {
    id: 'handgun',
    name: 'Handgun',
    type: 'ranged',
    weight: 'light',
    range: 80,
    accuracy: 2,
    damage: '2d6L',
    special: ['Usable in melee', 'Quick draw on ammo fail', 'AD: 2'],
    cost: 50,
    slots: 2, // Medium weapon
    description: 'If another weapon fails an Ammo Scarcity roll, the handgun may immediately be drawn without delay.'
  },
  {
    id: 'sawed-off',
    name: 'Sawed Off',
    type: 'ranged',
    weight: 'medium',
    range: 30,
    accuracy: 2,
    damage: '1d6',
    special: ['Usable in melee', 'Fire both barrels (2d6, +3 AS)'],
    cost: 45,
    slots: 2, // Medium weapon
    description: 'Can fire both barrels at the same time. Roll 2d6 for damage but add +3 to the Ammo Scarcity roll.'
  },
  {
    id: 'ray-gun',
    name: 'Ray Gun',
    type: 'ranged',
    weight: 'light',
    range: 80,
    accuracy: 2,
    damage: '2d6L',
    special: ['Usable in melee', 'Spend AD for +1 damage', 'AD: 3'],
    cost: 75,
    slots: 2, // Medium weapon
    description: 'Ammo dice are not rolled, but can be spent to add +1 damage to the shot.'
  },

  // Smallarms (+1 damage, two-handed)
  {
    id: 'drok-rifle',
    name: 'Drok Rifle',
    type: 'ranged',
    weight: 'medium',
    range: 150,
    accuracy: 3,
    damage: '1d6+1',
    special: ['Two-handed', 'First AD doesn\'t count for AS', 'AD: 3'],
    cost: 80,
    slots: 3, // Large weapon
    description: 'The first ammo dice used doesn\'t contribute to the AS roll.'
  },
  {
    id: 'geezer-rifle',
    name: 'Geezer Rifle',
    type: 'ranged',
    weight: 'medium',
    range: 150,
    accuracy: 3,
    damage: '1d6+1',
    special: ['Two-handed', 'Adjust hit location ±1', 'AD: 2'],
    cost: 70,
    slots: 3, // Large weapon
    description: 'May adjust the locational hit roll by -1 or +1.'
  },
  {
    id: 'handgonne',
    name: 'Handgonne',
    type: 'ranged',
    weight: 'medium',
    range: 80,
    accuracy: 3,
    damage: '1d6+1',
    special: ['Two-handed', 'Exploding 5-6', 'Fails in moisture'],
    cost: 60,
    slots: 3, // Large weapon
    description: 'Exploding damage on a roll of 5-6. Will not work in heavy moisture.'
  },
  {
    id: 'laser-gun',
    name: 'Laser Gun',
    type: 'ranged',
    weight: 'medium',
    range: 150,
    accuracy: 3,
    damage: '1d6+1',
    special: ['Two-handed', 'Spend AD for +1 damage', 'AD: 4'],
    cost: 100,
    slots: 3, // Large weapon
    description: 'Ammo dice are not rolled, but can be spent to add +1 damage to the shot.'
  },

  // Heavy Weapons (ignore 2 soaks, two-handed)
  {
    id: 'lmg',
    name: 'LMG',
    type: 'ranged',
    weight: 'heavy',
    range: 150,
    accuracy: 3,
    damage: '2d6H',
    special: ['Two-handed', 'Ignore 2 soaks', 'Hit nearby targets', 'AD: 4'],
    cost: 150,
    slots: 3, // Large weapon
    description: 'All those within close range of the declared target are also hit.'
  },
  {
    id: 'flamethrower',
    name: 'Flamethrower',
    type: 'ranged',
    weight: 'medium',
    range: 30,
    accuracy: 0,
    damage: 'Save vs Dodge',
    special: ['Two-handed', 'No Twitch check', 'Area effect', 'Ignites'],
    cost: 120,
    slots: -1, // Unable to store
    description: 'No Twitch check needed. Targets must save vs Dodge or be hit and ignited.'
  },
  {
    id: 'rocket-launcher',
    name: 'Rocket Launcher',
    type: 'ranged',
    weight: 'light',
    range: 80,
    accuracy: 4,
    damage: 'Big Damage',
    special: ['Two-handed', 'Big Damage', 'Explosive'],
    cost: 200,
    slots: -1, // Unable to store
    description: 'Applies Big Damage.'
  },
  {
    id: 'anti-tank-rifle',
    name: 'Anti-Tank Rifle',
    type: 'ranged',
    weight: 'medium',
    range: 200,
    accuracy: 5,
    damage: '1d4',
    special: ['Two-handed', 'Big Damage', 'Exploding 4s'],
    cost: 250,
    slots: -1, // Unable to store
    description: 'Rolls 1d4 rather than 1d6 and applies Big Damage. Rolls of 4 explode.'
  },

  // Grenades
  {
    id: 'black-powder-bomb',
    name: 'Black-powder Bomb',
    type: 'thrown',
    weight: 'light',
    range: 60,
    accuracy: 0,
    damage: '2d6 area',
    special: ['Unreliable (1d3 result)'],
    cost: 15,
    slots: 1, // Small item
    description: 'Roll 1d3: 1=normal explosion, 2=dud, 3=explodes in hands.'
  },
  {
    id: 'grenade',
    name: 'Grenade',
    type: 'thrown',
    weight: 'light',
    range: 60,
    accuracy: 0,
    damage: '2d6 area',
    special: ['Reliable explosion'],
    cost: 25,
    slots: 1, // Small item
    description: 'Causes a short radius explosion (2d6 damage).'
  },
  {
    id: 'gnome-grenade',
    name: 'Gnome Grenade',
    type: 'thrown',
    weight: 'light',
    range: 60,
    accuracy: 0,
    damage: '2d6 area',
    special: ['Living grenade', 'Auto-hit on success'],
    cost: 40,
    slots: 1, // Small item
    description: 'If throw succeeds, gnome sprints at target (cannot dodge). If fails, explodes on impact.'
  }
];

export interface Armor {
  id: string;
  name: string;
  type: ArmorType;
  protection: number;
  penalty: number; // to Twitch-based actions
  cost: number;
  slots: number; // -1 = cannot store, 0 = equipped, 1-3 = storage slots
  description: string;
  special: string[];
}

const ARMOR: Armor[] = [
  // Body Armor
  {
    id: 'gambeson',
    name: 'Gambeson',
    type: 'light',
    protection: 1,
    penalty: -1,
    cost: 20,
    slots: 2, // Light armor
    description: 'Thick wool and cloth offer a surprising degree of protection from attack.',
    special: ['Quiet', 'Comfortable']
  },
  {
    id: 'chainmail',
    name: 'Chainmail',
    type: 'medium',
    protection: 2,
    penalty: -2,
    cost: 50,
    slots: 3, // Medium armor
    description: 'Small linked chains adorn the body, protecting the soft flesh underneath.',
    special: ['Metal', 'Flexible']
  },
  {
    id: 'panoply-plate',
    name: 'Panoply Plate',
    type: 'heavy',
    protection: 3,
    penalty: -3,
    cost: 120,
    slots: 3, // Heavy armor
    description: 'Relatively primitive body-armor with few or no moving plates. Cumbersome.',
    special: ['Metal', 'Primitive', 'Cumbersome']
  },
  {
    id: 'plate-armor',
    name: 'Plate Armor',
    type: 'medium', // *Medium - special rule
    protection: 3, // Heavy protection with Medium penalties
    penalty: -2,
    cost: 200,
    slots: 3, // Heavy armor
    description: 'Advanced engineering techniques allow moving, layered plates of steel.',
    special: ['Metal', 'Advanced', 'Heavy protection with Medium penalties']
  },
  {
    id: 'anti-ballistic-suit',
    name: 'Anti-Ballistic Suit',
    type: 'medium',
    protection: 2,
    penalty: -2,
    cost: 150,
    slots: 3, // Medium armor
    description: 'Ceramic plates line underneath fabric carriers, dissipating the force of smallarms fire.',
    special: ['25% ignore ranged damage', 'Modern']
  },
  {
    id: 'slave-harness',
    name: 'Slave-Harness',
    type: 'heavy',
    protection: 0, // No protection despite being Heavy
    penalty: -3,
    cost: 0,
    slots: 2, // Light armor size
    description: 'Binding straps and uncomfortable collars restrict movement.',
    special: ['No protection', 'Cannot remove without help', 'Restraining']
  },
  {
    id: 'wizard-robes',
    name: 'Wizard Robes',
    type: 'light',
    protection: 0,
    penalty: 0,
    cost: 75,
    slots: 2, // Light armor
    description: 'Silken robes depicting all manner of arcane and occult symbols.',
    special: ['Reroll spell-cast with Wizard Hat', 'Magical']
  },
  {
    id: 'cultist-robes',
    name: 'Cultist Robes',
    type: 'light',
    protection: 0,
    penalty: 0,
    cost: 50,
    slots: 2, // Light armor
    description: 'Robes of cloth, depicting the holy symbols of a deity.',
    special: ['+2 to saves vs Zealotry (own deity)', 'Religious']
  },

  // Helmets
  {
    id: 'mail-coif',
    name: 'Mail Coif',
    type: 'light',
    protection: 1,
    penalty: 0,
    cost: 25,
    slots: 1, // Small item
    description: 'Chainmail covers the head, chin, and neck - offering decent enough protection.',
    special: ['Head protection', 'Flexible']
  },
  {
    id: 'infantry-helmet',
    name: 'Infantry Helmet',
    type: 'light',
    protection: 1,
    penalty: 0,
    cost: 40,
    slots: 1, // Small item
    description: 'Mass produced helmet made to deflect smallarms fire.',
    special: ['Head protection', '25% ignore ranged damage']
  },
  {
    id: 'metal-helmet',
    name: 'Metal Helmet',
    type: 'medium',
    protection: 2,
    penalty: -1,
    cost: 30,
    slots: 1, // Small item
    description: 'Encompasses varieties of helmets made for melee combat - skull caps, kettle helmets and bascinets.',
    special: ['Head protection', 'Melee focused']
  },
  {
    id: 'great-helmet',
    name: 'Great Helmet',
    type: 'heavy',
    protection: 3,
    penalty: -2,
    cost: 60,
    slots: 2, // Medium item
    description: 'Primitive helmets forged from a single plate that covers the entire face. Small slits for vision are the only access point. Stuffy.',
    special: ['Head protection', 'Vision restriction', 'Stuffy']
  },
  {
    id: 'plate-helmet',
    name: 'Plate Helmet',
    type: 'medium', // *Medium - special rule
    protection: 3, // Heavy protection with Medium penalties
    penalty: -1,
    cost: 100,
    slots: 2, // Medium item
    description: 'Advanced metalworking allows the creation of sleek helmet designs, massively improving comfort and protection.',
    special: ['Head protection', 'Advanced', 'Heavy protection with Medium penalties']
  },
  {
    id: 'wizard-hat',
    name: 'Wizard Hat',
    type: 'light',
    protection: 0,
    penalty: 0,
    cost: 30,
    slots: 1, // Small item
    description: 'Wide brimmed and pointed conical hat – iconic headpiece of wizardry.',
    special: ['Reroll spell-cast with Wizard Robes', 'Magical', 'Iconic']
  }
];

export interface Equipment {
  id: string;
  name: string;
  category: string;
  cost: number;
  slots: number; // -1 = cannot store, 0 = pocket item, 1-3 = storage slots
  description: string;
  special?: string[];
}

const EQUIPMENT: Equipment[] = [
  // Survival & Utility
  {
    id: 'ration',
    name: 'Ration',
    category: 'consumable',
    cost: 2,
    slots: 1, // Small item
    description: 'Varying qualities of gruel and slop packed into a little box. Food must be eaten in order for health to be restored naturally.'
  },
  {
    id: 'bedroll',
    name: 'Bedroll',
    category: 'utility',
    cost: 5,
    slots: 3, // Large item
    description: 'Relatively comfortable cloth and hides to sleep on. Allows rest in normally uncomfortable places.'
  },
  {
    id: 'rope',
    name: 'Rope (20ft)',
    category: 'utility',
    cost: 3,
    slots: 2, // Medium item
    description: 'You know what rope is. Can do whatever you can imagine rope does.'
  },
  {
    id: 'lockpicks',
    name: 'Lockpicks',
    category: 'tools',
    cost: 15,
    slots: 1, // Small item
    description: 'Iron pin made for intrusive purposes. Enables the ability to perform a Twitch check to open locked doors or containers. Takes approximately 10 minutes per success needed to open the lock. If failed, the lockpick breaks.'
  },
  {
    id: 'binoculars',
    name: 'Binoculars',
    category: 'tools',
    cost: 20,
    slots: 2, // Medium item
    description: 'Pair of sight-seeing doo-dads that enable the user to see up to 800 yards away.'
  },
  {
    id: 'bandages',
    name: 'Bandages',
    category: 'medical',
    cost: 5,
    slots: 1, // Small item
    description: 'Tightly wound cloth to cover ugly wounds. May be wrapped upon wounds to prevent continuous doom rolls so they can heal in peace – but the wounded mustn\'t exert themself.'
  },

  // Lighting & Fire
  {
    id: 'torch',
    name: 'Torch',
    category: 'light',
    cost: 1,
    slots: 1, // Small item
    description: 'Stick bundled with cloth and oil. Light the end to provide light. Roll 1d6 for every 5 minutes of use. On a 1, the torch is snuffed.',
    special: ['Consumable', '1d6 every 5 minutes']
  },
  {
    id: 'scomlight',
    name: 'SCOMlight',
    category: 'light',
    cost: 25,
    slots: 1, // Small item
    description: 'Small little device that slings light at the click of a button. Roll 1d6 for every 10 minutes of use. On a 1, the battery dies.',
    special: ['Battery powered', '1d6 every 10 minutes']
  },
  {
    id: 'lighter',
    name: 'Lighter',
    category: 'utility',
    cost: 5,
    slots: 0, // Pocket item
    description: 'Press on the top and click the button – fire!'
  },

  // Drugs & Substances
  {
    id: 'booze',
    name: 'Booze',
    category: 'consumable',
    cost: 5,
    slots: 1, // Small item
    description: 'Fermented whatever-the-hell. Intoxicates the drinker thoroughly. Can help ease stress. Receive –1d3 to Twitch checks for 1d4x30 minutes.',
    special: ['Stress relief', 'Twitch penalty']
  },
  {
    id: 'zigarette',
    name: 'Zigarette',
    category: 'consumable',
    cost: 2,
    slots: 0, // Pocket item
    description: 'Tobacco wrapped in paper. Light it up to smoke. Eases stress with a decent buzz – and you look really, really cool.',
    special: ['Stress relief', 'Cool factor']
  },
  {
    id: 'swampweed',
    name: 'Swampweed',
    category: 'consumable',
    cost: 8,
    slots: 0, // Pocket item
    description: 'Halfling Swampweed wrapped in paper. Light it up to smoke. Helps ease stress – everything becomes slightly funnier, and food just tastes better.',
    special: ['Stress relief', 'Enhanced taste/humor']
  },
  {
    id: 'moondust',
    name: 'Moondust',
    category: 'consumable',
    cost: 25,
    slots: 1, // Small item
    description: 'Evil white powder that amps the everloving shit out of the user. Moondust addicts are infamous for their paranoia. Eases stress and grants +1d3 Twitch for 2d6 minutes.',
    special: ['Stress relief', '+1d3 Twitch', 'Addictive', 'Save vs Physique']
  },
  {
    id: 'ozium',
    name: 'Ozium',
    category: 'consumable',
    cost: 25,
    slots: 1, // Small item
    description: 'Grainy red sand that leaves users with no remorse or fear. Ozium addicts are infamous for their violent insanity. Eases stress and grants +1d3 Flesh for 2d6 minutes.',
    special: ['Stress relief', '+1d3 Flesh', 'Addictive', 'Save vs Physique']
  },
  {
    id: 'spice',
    name: 'Spice',
    category: 'consumable',
    cost: 25,
    slots: 1, // Small item
    description: 'Vivid miracle powder that grants eyesight of alien colors. It is said that those who impart upon this substance know all truths. Spice addicts are infamous for their babbling madness. Eases stress and grants +1d3 Mojo for 2d6 minutes.',
    special: ['Stress relief', '+1d3 Mojo', 'Addictive', 'Save vs Physique']
  },

  // Magic & Occult
  {
    id: 'grimoire',
    name: 'Grimoire',
    category: 'magical',
    cost: 100,
    slots: 2, // Medium item
    description: 'Menacing book of whispering leather. Stores the secret knowledge of black magick spells. They are often sold for great deals of wealth.'
  },
  {
    id: 'wizard-staff',
    name: 'Wizard Staff',
    category: 'magical',
    cost: 50,
    slots: 3, // Large item
    description: 'A conduit made to channel black magick, to eat poison on behalf of its wielder. While held, the wielder may ignore a single roll of 1 during a spell-cast – thereby avoiding Xom gain (the MD is still lost.) The hand holding the wizard staff counts as a free hand for the purpose of casting spells.',
    special: ['Ignore 1 Xom per cast', 'Free hand for spells']
  },
  {
    id: 'holy-icons',
    name: 'Holy Icons',
    category: 'religious',
    cost: 20,
    slots: 1, // Small item
    description: 'Divine symbols of a God. Grants +1 to Saves vs Zealotry if worn openly.',
    special: ['+1 to saves vs Zealotry']
  },

  // SCOM Technology
  {
    id: 'scom-radio',
    name: 'SCOM Radio',
    category: 'technology',
    cost: 75,
    slots: 2, // Medium item
    description: 'Advanced audio-tech from the Darklands. Can pick up radio frequencies up to 100 miles away, but cannot broadcast.',
    special: ['100 mile range', 'Receive only']
  },
  {
    id: 'signaller',
    name: 'Signaller',
    category: 'technology',
    cost: 40,
    slots: 1, // Small item
    description: 'SCOM device from the Darklands. Capable of activating electronics if set to the correct frequency.',
    special: ['Remote activation']
  },
  {
    id: 'scom-ring',
    name: 'SCOM Ring',
    category: 'technology',
    cost: 60,
    slots: 0, // Pocket item (ring)
    description: 'Beeping piece of jewelry, capable of accessing advanced tech doors. Encrypted with secret passwords whispered by their creators – a wave of the hand will open its ordained lock.',
    special: ['Electronic lock access']
  },
  {
    id: 'shock-collar',
    name: 'Shock-collar',
    category: 'technology',
    cost: 30,
    slots: 1, // Small item
    description: 'SCOM equipment, often utilized by Elvish slavers to intimidate captives into obedience. Connect to a signaller to utilize. Cannot be taken off without assistance. When activated, the wearer makes a Save vs Physique, and if failed, receives 1d4 wound points.',
    special: ['Requires Signaller', '1d4 damage', 'Cannot remove alone']
  },

  // Tools & Kits
  {
    id: 'surgical-kit',
    name: 'Surgical Kit',
    category: 'medical',
    cost: 80,
    slots: 2, // Medium item
    description: 'Bag of needles, stitches and dirty scalpels. Use on a target to either: Deal 1d4 damage, and then heal for 1d6 (takes 1 hour), or Install a bionic (takes 2 hours). May not be possible depending on complexity.',
    special: ['Heal 1d6 (-1d4)', 'Install bionics', '1-2 hours']
  },
  {
    id: 'mechanic-kit',
    name: 'Mechanic\'s Kit',
    category: 'tools',
    cost: 60,
    slots: 2, // Medium item
    description: 'Bag of screws, bolts and a wrench. Use on a vehicle to either: Repair 1d4🗲 wound points on a vehicle (takes 2 hours), or Install or uninstall vehicle parts (takes 2 hours).',
    special: ['Repair vehicles', 'Install parts', '2 hours']
  },
  {
    id: 'ammo-pack',
    name: 'Ammo Pack',
    category: 'military',
    cost: 20,
    slots: 1, // Small item
    description: 'Pack of all manner of bullets and exotic munitions. Expend outside of combat to restore a weapon\'s ammo scarcity.',
    special: ['Restore ammo scarcity']
  },
  {
    id: 'fuel-canister',
    name: 'Fuel Canister',
    category: 'utility',
    cost: 15,
    slots: 2, // Medium item
    description: 'Canister full of gasoline. Expend on a vehicle to restore the vehicle\'s gas mileage.',
    special: ['Restore vehicle fuel']
  },
  {
    id: 'gas-mask',
    name: 'Gas Mask',
    category: 'protection',
    cost: 40,
    slots: 2, // Medium item
    description: 'Strange face covering from the Darklands. Grants immunity from chemical and alchemical fumes if worn, but -1D to Twitch checks.',
    special: ['Chemical immunity', '-1D Twitch']
  },

  // Containers & Storage
  {
    id: 'container',
    name: 'Container',
    category: 'utility',
    cost: 10,
    slots: 0, // Containers don't take slots in themselves
    description: 'Catch-all term for bandoliers, satchels, bags and even sword sheaths. Allows a character to carry more.'
  },

  // Special Items
  {
    id: 'gnome-helper',
    name: 'Gnome Helper',
    category: 'utility',
    cost: 30,
    slots: 1, // Small item (gnome)
    description: 'An untrained but eager little gnome. If instructed, will add +1D to a non-combat, non-magic roll. The gnome will fail on a 1-3, and grant a success on a 4-6. If the gnome fails, the entire roll is failed; causing hilariously morbid repercussions. The gnome will die violently – somehow, some way. Can be used as a ration in desperate circumstances.',
    special: ['+1D to rolls', 'Fails on 1-3', 'Dies on failure', 'Emergency ration']
  },
  {
    id: 'screecher',
    name: 'Screecher',
    category: 'utility',
    cost: 50,
    slots: 1, // Small item (special gnome)
    description: 'Special gnome bred by Elves. Screams and squeals when in the vicinity of Xom radiation. The louder it cries, the more Xom.',
    special: ['Xom detection', 'Volume indicates intensity']
  },
  {
    id: 'treasure',
    name: 'Treasure',
    category: 'valuable',
    cost: 0, // Variable
    slots: 1, // Variable size (1d4 slots)
    description: 'Golden chains, silver goblets, shining gemeralds – treasure is a catch-all term for precious metals and jewels. When treasure is found, roll 1d4 to determine how many carry slots it takes up in a container (with a 4 representing it being too large to stash away) and 1d3 to determine how expensive it is per carry slot (zennies, zickles, zimes, each a pouch respectively.)',
    special: ['Variable size (1d4 slots)', 'Variable value (1d3)']
  },
  {
    id: 'c4',
    name: 'C4',
    category: 'explosive',
    cost: 100,
    slots: 1, // Small item
    description: 'Advanced explosive. Attach to a signaller to detonate. Explodes in a short radius (3d6 damage).',
    special: ['Requires Signaller', '3d6 area damage']
  },
  {
    id: 'standard',
    name: 'Standard',
    category: 'utility',
    cost: 25,
    slots: -1, // Unable to store (must be carried)
    description: 'Flag bearing the insignia of an organization or deity. Provides +1 Morale to friendly NPCs if held, but -1 if knocked to the ground.',
    special: ['+1 Morale when held', '-1 Morale when dropped']
  },
  {
    id: 'trumpet',
    name: 'Trumpet',
    category: 'utility',
    cost: 20,
    slots: 2, // Medium item
    description: 'Brass instrument. Heralds the arrival of warriors.'
  },
  {
    id: 'diadem',
    name: 'Diadem',
    category: 'utility',
    cost: 50,
    slots: 1, // Small item
    description: 'Crown of simple metals. Often not inherently valuable, but wearing it is typically a challenge to local authority.',
    special: ['Challenge to authority']
  },
  {
    id: 'dice',
    name: 'Dice',
    category: 'utility',
    cost: 2,
    slots: 0, // Pocket item
    description: 'Six sided dice. I hope you know what they are, you roll them a lot in this game. Often used for gambling.',
    special: ['Gambling']
  }
];

// ============================================================================
// FAITH & DIVINE SYSTEM
// ============================================================================

export interface Faith {
  id: string;
  name: string;
  description: string;
  domain: string[];
  covenantBenefits?: string[];
  zealotryModifier: number;
  canticleDebtRisk: string;
}

const IMMORTAL_EIGHT: Faith[] = [
  {
    id: 'abyssor',
    name: 'Abyssor',
    description: 'Immortal God of the sea, aquatic life and deals. Abyssor offers gifts to those willing to pay his prices.',
    domain: ['Sea', 'Aquatic Life', 'Deals', 'Storms'],
    covenantBenefits: ['Breathe underwater for 2d10 extra minutes per day', 'Come, enjoy the taste of brine'],
    zealotryModifier: 0,
    canticleDebtRisk: 'Medium - Prices must be paid'
  },
  {
    id: 'astrata',
    name: 'Astrata',
    description: 'Immortal Goddess of virtue, nobility and the sun. Leader of the Immortal Eight.',
    domain: ['Virtue', 'Nobility', 'Sun', 'Leadership'],
    covenantBenefits: ['Reroll any save vs Zealotry once to resist nite-creecher powers', 'Reroll any save vs Fear once'],
    zealotryModifier: 1,
    canticleDebtRisk: 'Low - Radiant and forgiving'
  },
  {
    id: 'ravox',
    name: 'Ravox',
    description: 'Immortal God of heroism, glory, combat and redemption. It was by Ravox\'s sword that the world was saved.',
    domain: ['Heroism', 'Glory', 'Combat', 'Redemption'],
    covenantBenefits: ['Reroll any save vs physique once per day', 'Advantage in melee combat checks against Inhumen worshippers'],
    zealotryModifier: 1,
    canticleDebtRisk: 'Medium - Demands honor and courage'
  },
  {
    id: 'dendor',
    name: 'Dendor',
    description: 'Immortal God of the wild, animals and unbound primalism. Those with nothing left often turn to the woods, and there, Dendor is waiting.',
    domain: ['Wild', 'Animals', 'Primalism', 'Nature'],
    covenantBenefits: ['Find comfort in the wild, rest anywhere with no issue', 'Animals understand your words'],
    zealotryModifier: -1,
    canticleDebtRisk: 'Low - Accepts natural behavior'
  },
  {
    id: 'eora',
    name: 'Eora',
    description: 'Immortal Goddess of love, home and memories. Those who pray for mercy pray to Eora.',
    domain: ['Love', 'Home', 'Memories', 'Mercy'],
    covenantBenefits: ['By touch, understand emotions - feel their pain, feel their sorrow', 'Always know the path home, wherever that may be'],
    zealotryModifier: -1,
    canticleDebtRisk: 'Very Low - Gentle and loving'
  },
  {
    id: 'malum',
    name: 'Malum',
    description: 'Immortal God of craft, duty and family. Father of dwarf-kind. Masterworks and perfect labors are said to be invoked by Malum.',
    domain: ['Craft', 'Duty', 'Family', 'Mastery'],
    covenantBenefits: ['Reroll any save vs Fear once per day', 'Never die from fright - for there is nothing to fear'],
    zealotryModifier: 0,
    canticleDebtRisk: 'Medium - Values dedication and duty'
  },
  {
    id: 'xylix',
    name: 'Xylix',
    description: 'Immortal God of tricks, pranks and games. Father of halfling-kind. Xylix is the patron saint of the fool in all of us.',
    domain: ['Tricks', 'Pranks', 'Games', 'Luck'],
    covenantBenefits: ['Reroll any Twitch check involving sleight of hand', 'Always slightly better odds when gambling'],
    zealotryModifier: -1,
    canticleDebtRisk: 'Variable - Enjoys games and trickery'
  },
  {
    id: 'necra',
    name: 'Necra',
    description: 'Immortal Goddess of death, burials and the afterlife. Without Necra, the death-tide would drown the world in rot.',
    domain: ['Death', 'Burials', 'Afterlife', 'Endings'],
    covenantBenefits: ['Reroll a save vs magic once per day', 'Perform the rites of Necra on the deceased'],
    zealotryModifier: 1,
    canticleDebtRisk: 'Medium - Demands proper rites for the dead'
  }
];

const OTHER_FAITHS: Faith[] = [
  {
    id: 'psydon',
    name: 'Psydon (The Old Faith)',
    description: 'True God-King of man, emissary of the pantokrator. The original faith of humanity.',
    domain: ['Monarchy', 'Human Supremacy', 'Order', 'Tradition'],
    covenantBenefits: [],
    zealotryModifier: 2,
    canticleDebtRisk: 'N/A - Dead god offers no power'
  },
  {
    id: 'graggar',
    name: 'Graggar (Inhumen)',
    description: 'Inhumen God of cruelty, murder and conquest. Graggar only believes in primitive brutality and acts of violence.',
    domain: ['Cruelty', 'Murder', 'Conquest', 'Violence'],
    covenantBenefits: ['Ability to eat raw flesh and organs without issue', '+1 Flesh, Immunity to the Red Grin'],
    zealotryModifier: 2,
    canticleDebtRisk: 'High - Demands brutal sacrifice'
  }
];

// ============================================================================
// MAGIC SYSTEM
// ============================================================================

export interface Spell {
  id: string;
  name: string;
  level: number;
  manaCost: number;
  castingTime: string;
  range: string;
  duration: string;
  description: string;
  components: string[];
  school: string;
  xomRisk?: string;
}

const SPELLS: Spell[] = [
  {
    id: 'healing-light',
    name: 'Healing Light',
    level: 1,
    manaCost: 1,
    castingTime: '1 action',
    range: 'Touch',
    duration: 'Instantaneous',
    description: 'Heals minor wounds with divine light.',
    components: ['Verbal', 'Somatic'],
    school: 'Divine',
    xomRisk: 'None - Divine magic is stable'
  },
  {
    id: 'chaos-bolt',
    name: 'Chaos Bolt',
    level: 2,
    manaCost: 2,
    castingTime: '1 action',
    range: '60 feet',
    duration: 'Instantaneous',
    description: 'Hurls unpredictable chaotic energy at a target.',
    components: ['Verbal', 'Somatic'],
    school: 'Chaos',
    xomRisk: 'High - Chaos magic is inherently unstable'
  },
  {
    id: 'void-step',
    name: 'Void Step',
    level: 3,
    manaCost: 3,
    castingTime: '1 action',
    range: 'Self',
    duration: 'Instantaneous',
    description: 'Step through the void to appear elsewhere.',
    components: ['Verbal', 'Somatic', 'Material'],
    school: 'Void',
    xomRisk: 'Extreme - Void magic corrupts reality'
  }
];

const MAGIC_SCHOOLS = [
  'Divine', 'Arcane', 'Chaos', 'Void', 'Nature', 'Mind', 'Death', 'Time'
] as const;

export type MagicSchool = typeof MAGIC_SCHOOLS[number];

// ============================================================================
// MUTATION & XOM SYSTEM
// ============================================================================

export interface Mutation {
  id: string;
  name: string;
  type: 'beneficial' | 'neutral' | 'detrimental';
  description: string;
  gameEffect: string;
  xomThreshold: number;
}

const MUTATIONS: Mutation[] = [
  {
    id: 'extra-eye',
    name: 'Third Eye',
    type: 'beneficial',
    description: 'An additional eye grows on your forehead.',
    gameEffect: '+1 to all perception-based checks',
    xomThreshold: 5
  },
  {
    id: 'scaled-skin',
    name: 'Scaled Skin',
    type: 'neutral',
    description: 'Your skin becomes covered in small, hard scales.',
    gameEffect: '+1 natural armor, -1 to social interactions',
    xomThreshold: 3
  },
  {
    id: 'withered-arm',
    name: 'Withered Arm',
    type: 'detrimental',
    description: 'One of your arms becomes thin and weak.',
    gameEffect: 'Cannot use two-handed weapons or shields',
    xomThreshold: 7
  }
];

// ============================================================================
// CONTAINERS & INVENTORY
// ============================================================================

export interface Container {
  id: string;
  name: string;
  slots: number;
  maxSlots: number;
  weight: number;
  special?: string[];
}

const CONTAINER_TYPES: Container[] = [
  {
    id: 'backpack',
    name: 'Backpack',
    slots: 0,
    maxSlots: 3,
    weight: 1,
    special: ['Standard adventuring gear']
  },
  {
    id: 'belt-pouch',
    name: 'Belt Pouch',
    slots: 0,
    maxSlots: 3,
    weight: 0,
    special: ['Quick access', 'Small items only']
  },
  {
    id: 'weapon-harness',
    name: 'Weapon Harness',
    slots: 0,
    maxSlots: 3,
    weight: 1,
    special: ['Weapons only', 'Quick draw']
  }
];

// ============================================================================
// CHARACTER TEMPLATE
// ============================================================================

export interface Character {
  // Core Identity
  id: string;
  name: string;
  race: Race;
  origin: Origin;
  backgrounds: Background[];
  faith?: Faith;
  covenant: boolean;
  
  // Attributes (1d4 each)
  twitch: AttributeScore;
  flesh: AttributeScore;
  mojo: AttributeScore;
  
  // Derived Stats
  bones: number; // = flesh value
  manaDice: number; // = mojo × 2
  zimes: number; // leftover from attribute generation
  
  // Health & Status
  woundPoints: number;
  xomPoints: number;
  canticleDebt: number;
  zealotry: number;
  
  // Equipment
  weapons: Weapon[];
  armor: Armor[];
  containers: Container[];
  equipment: Equipment[];
  
  // Magic & Abilities
  knownSpells: Spell[];
  mutations: Mutation[];
  specialAbilities: string[];
  
  // Character Details
  description: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function generateAttributes(): { twitch: number; flesh: number; mojo: number; zimes: number } {
  const rolls = [
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 4) + 1
  ];
  
  const [twitch, flesh, mojo, zimes] = rolls;
  return { twitch, flesh, mojo, zimes };
}

export function applyRacialModifiers(
  baseAttributes: { twitch: number; flesh: number; mojo: number },
  race: Race
): { twitch: AttributeScore; flesh: AttributeScore; mojo: AttributeScore } {
  return {
    twitch: {
      value: baseAttributes.twitch,
      loyalty: race.attributeModifiers.twitch
    },
    flesh: {
      value: baseAttributes.flesh,
      loyalty: race.attributeModifiers.flesh
    },
    mojo: {
      value: baseAttributes.mojo,
      loyalty: race.attributeModifiers.mojo
    }
  };
}

export function calculateDerivedStats(attributes: { flesh: AttributeScore; mojo: AttributeScore }) {
  return {
    bones: attributes.flesh.value,
    manaDice: attributes.mojo.value * 2
  };
}

export function getBackgroundsByOrigin(origin: OriginType): Background[] {
  return BACKGROUNDS.filter(bg => bg.origin === origin);
}

export function validateCharacterBackgrounds(backgrounds: Background[]): boolean {
  // Check unique backgrounds constraint
  const uniqueBackgrounds = backgrounds.filter(bg => bg.isUnique);
  if (uniqueBackgrounds.length > 1) return false;
  
  // Check minimum 2 from origin (if 3 total)
  if (backgrounds.length === 3) {
    const origins = [...new Set(backgrounds.map(bg => bg.origin))];
    if (origins.length > 2) return false; // Can't have 3 different origins
  }
  
  return true;
}

// ============================================================================
// EQUIPMENT MANAGEMENT UTILITIES
// ============================================================================

export interface SelectedEquipment {
  weapons: Weapon[];
  armor: Armor[];
  equipment: Equipment[];
  containers: Container[];
}

export interface MoneyState {
  startingZimes: number;
  spentZimes: number;
  remainingZimes: number;
  canAfford: boolean;
}

export interface EncumbranceState {
  maxContainers: number;
  totalSlots: number;
  usedSlots: number;
  availableSlots: number;
  canCarry: boolean;
  unstorableItems: string[];
}

export function calculateTotalCost(equipment: SelectedEquipment): number {
  return [
    ...equipment.weapons,
    ...equipment.armor,
    ...equipment.equipment
    // Note: containers are handled as equipment items with category 'utility'
  ].reduce((total, item) => total + item.cost, 0);
}

export function calculateArmorPenalty(selectedArmor: Armor[]): number {
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

export function calculateSlotUsage(equipment: SelectedEquipment): { usedSlots: number; unstorableItems: string[] } {
  let usedSlots = 0;
  const unstorableItems: string[] = [];
  
  // Track equipped items (first of each type doesn't take slots)
  let hasBodyArmor = false;
  let hasHelmet = false;
  let hasPrimaryWeapon = false;
  let hasSecondaryWeapon = false;
  
  // Process armor first (equipped armor takes no slots)
  equipment.armor.forEach(armor => {
    if (armor.slots === -1) {
      unstorableItems.push(armor.name);
      return;
    }
    
    const isHelmet = armor.special.includes('Head protection');
    
    if (isHelmet && !hasHelmet) {
      hasHelmet = true; // First helmet is equipped (0 slots)
    } else if (!isHelmet && !hasBodyArmor) {
      hasBodyArmor = true; // First body armor is equipped (0 slots)
    } else if (armor.slots > 0) {
      usedSlots += armor.slots; // Extra armor goes to storage
    }
  });
  
  // Process weapons (first two weapons are equipped - 0 slots)
  equipment.weapons.forEach(weapon => {
    if (weapon.slots === -1) {
      unstorableItems.push(weapon.name);
      return;
    }
    
    if (!hasPrimaryWeapon) {
      hasPrimaryWeapon = true; // First weapon is equipped (0 slots)
    } else if (!hasSecondaryWeapon) {
      hasSecondaryWeapon = true; // Second weapon is equipped (0 slots)
    } else if (weapon.slots > 0) {
      usedSlots += weapon.slots; // Extra weapons go to storage
    }
  });
  
  // Process other equipment (always uses storage slots)
  equipment.equipment.forEach(item => {
    if (item.slots === -1) {
      unstorableItems.push(item.name);
    } else if (item.slots > 0) {
      usedSlots += item.slots;
    }
  });
  
  return { usedSlots, unstorableItems };
}

export function calculateEncumbrance(
  selectedEquipment: SelectedEquipment, 
  maxContainers: number
): EncumbranceState {
  const actualContainers = Math.min(selectedEquipment.containers.length, maxContainers);
  const totalSlots = actualContainers * 3;
  const { usedSlots, unstorableItems } = calculateSlotUsage(selectedEquipment);
  
  return {
    maxContainers,
    totalSlots,
    usedSlots,
    availableSlots: totalSlots - usedSlots,
    canCarry: usedSlots <= totalSlots,
    unstorableItems
  };
}

export function validateItemSelection(
  item: Weapon | Armor | Equipment,
  currentSelection: SelectedEquipment,
  money: MoneyState,
  encumbrance: EncumbranceState
): { canSelect: boolean; reason?: string } {
  
  // Money validation removed - all equipment is free to select
  
  // Check if unstorable but no containers
  if (item.slots === -1 && encumbrance.maxContainers === 0) {
    return { 
      canSelect: false, 
      reason: `Cannot carry this item without containers.` 
    };
  }
  
  // Check slots - but consider if this item would be equipped vs stored
  let itemWouldBeEquipped = false;
  
  if ('type' in item && (item as Armor).protection !== undefined) {
    // This is armor
    const armor = item as Armor;
    const isHelmet = armor.special.includes('Head protection');
    const hasHelmet = currentSelection.armor.some(a => a.special.includes('Head protection'));
    const hasBodyArmor = currentSelection.armor.some(a => !a.special.includes('Head protection'));
    
    itemWouldBeEquipped = (isHelmet && !hasHelmet) || (!isHelmet && !hasBodyArmor);
  } else if ('damage' in item) {
    // This is a weapon
    itemWouldBeEquipped = currentSelection.weapons.length < 2; // Can equip up to 2 weapons
  }
  
  // If item would be equipped, it takes 0 slots
  const effectiveSlots = itemWouldBeEquipped ? 0 : item.slots;
  
  if (effectiveSlots > 0 && effectiveSlots > encumbrance.availableSlots) {
    return { 
      canSelect: false, 
      reason: `Not enough slots. Need ${effectiveSlots} slots, have ${encumbrance.availableSlots}.` 
    };
  }
  
  return { canSelect: true };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  RACES,
  ORIGINS,
  BACKGROUNDS,
  WEAPONS,
  ARMOR,
  EQUIPMENT,
  IMMORTAL_EIGHT,
  OTHER_FAITHS,
  SPELLS,
  MAGIC_SCHOOLS,
  MUTATIONS,
  CONTAINER_TYPES
};

 