# BUGCHUD Character Creator - Design Document 🧙‍♂️

## Overview

The Character Creator is a comprehensive interface for building BUGCHUD characters with full integration to Firebase for persistence and Clerk for user authentication. Characters are stored in a `characters` collection with proper user ownership tracking and all BUGCHUD game mechanics implemented.

## Database Schema

### Characters Collection Structure

```typescript
// Firebase Firestore: /characters/{characterId}
interface StoredCharacter {
  // Core Identity
  id: string;                    // Document ID (auto-generated)
  name: string;                  // Character name
  userRef: UserReference;        // User ownership data
  
  // Character Data (from @utils/character-data.ts)
  race: Race;
  origin: Origin;
  backgrounds: Background[];     // Max 3, min 2 from origin
  faith?: Faith;
  covenant: boolean;
  
  // Attributes (generated via 4x 1d4 rolls)
  twitch: AttributeScore;        // value + loyalty from race
  flesh: AttributeScore;
  mojo: AttributeScore;
  
  // Derived Stats
  bones: number;                 // = flesh.value
  manaDice: number;              // = mojo.value × 2
  zimes: number;                 // leftover from generation
  
  // Health & Status
  woundPoints: number;           // current wounds
  xomPoints: number;             // corruption level
  canticleDebt: number;          // divine debt
  zealotry: number;              // faith fervor
  
  // Equipment
  weapons: Weapon[];
  armor: Armor[];
  containers: Container[];       // 6 max, 3 slots each
  equipment: Equipment[];
  
  // Magic & Abilities
  knownSpells: Spell[];
  mutations: Mutation[];
  specialAbilities: string[];    // from backgrounds + race
  
  // Character Details
  description: string;           // player description
  notes: string;                 // player notes
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  version: number;               // for conflict resolution
}

interface UserReference {
  clerkId: string;               // Clerk user ID
  username: string;              // Display username
  createdBy: string;             // Full name or email
  lastModifiedBy: string;        // Track who last modified
}
```

### Security Rules (Firestore)

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /characters/{characterId} {
      // Users can only read/write their own characters
      allow read, write: if request.auth != null && 
                         resource.data.userRef.clerkId == request.auth.uid;
      
      // Allow creation if user is authenticated and userRef matches
      allow create: if request.auth != null && 
                    request.resource.data.userRef.clerkId == request.auth.uid;
    }
  }
}
```

## Character Creation Flow

### Step-by-Step Process

#### 1. **Attribute Generation**
```typescript
// Generate 4x 1d4 rolls
const attributes = generateAttributes(); // { twitch: 3, flesh: 1, mojo: 4, zimes: 2 }
```

#### 2. **Race Selection**
```typescript
// User selects from RACES array
const selectedRace = RACES.find(r => r.id === 'dwarf');
const finalAttributes = applyRacialModifiers(attributes, selectedRace);
// Result: { twitch: {value: 3, loyalty: 'middling'}, flesh: {value: 1, loyalty: 'favored'}, mojo: {value: 4, loyalty: 'treacherous'} }
```

#### 3. **Origin Selection**
```typescript
// User selects from ORIGINS array
const selectedOrigin = ORIGINS.find(o => o.id === 'barbaric');
const availableBackgrounds = getBackgroundsByOrigin(selectedOrigin.id);
```

#### 4. **Background Selection**
```typescript
// User selects 3 backgrounds (min 2 from origin)
const selectedBackgrounds = [hunter, warrior, shaman]; // Example
const isValid = validateCharacterBackgrounds(selectedBackgrounds);
```

#### 5. **Faith Selection (Optional)**
```typescript
// User optionally selects faith and covenant
const selectedFaith = IMMORTAL_EIGHT.find(f => f.id === 'the-mother');
const hasCovenent = true; // User choice
```

#### 6. **Equipment Assignment**
```typescript
// Starting equipment from backgrounds + user selections
const startingEquipment = selectedBackgrounds.flatMap(bg => bg.startingEquipment);
const selectedWeapons = [/* user weapon choices */];
const selectedArmor = [/* user armor choices */];
```

#### 7. **Character Finalization**
```typescript
// Calculate derived stats and create character
const derivedStats = calculateDerivedStats(finalAttributes);
const character = createCharacter({
  userRef: {
    clerkId: user.id,
    username: user.username || user.emailAddresses[0].emailAddress,
    createdBy: user.fullName || user.emailAddresses[0].emailAddress,
    lastModifiedBy: user.fullName || user.emailAddresses[0].emailAddress
  },
  // ... all character data
});
```

## UI/UX Design

### Visual Theme
- **Dark Fantasy Aesthetic**: Purple gradients, glass morphism effects
- **Step-by-Step Wizard**: Clear progression through character creation
- **Interactive Dice Rolling**: Visual feedback for attribute generation
- **Equipment Browser**: Filterable/searchable equipment selection
- **Real-time Preview**: Character sheet updates as selections are made

### Component Structure

```typescript
// Character Creator Components
/character-creator/
├── page.tsx                    // Main wizard container
├── components/
│   ├── StepIndicator.tsx      // Progress indicator
│   ├── AttributeRoller.tsx    // 1d4 dice rolling interface
│   ├── RaceSelector.tsx       // Race selection with descriptions
│   ├── OriginSelector.tsx     // Origin selection
│   ├── BackgroundSelector.tsx // Background selection (3 max)
│   ├── FaithSelector.tsx      // Optional faith selection
│   ├── EquipmentBrowser.tsx   // Equipment selection interface
│   ├── CharacterPreview.tsx   // Live character sheet preview
│   └── CharacterSummary.tsx   // Final review before save
├── hooks/
│   ├── useCharacterCreation.tsx // Character state management
│   ├── useAttributeGeneration.tsx // Dice rolling logic
│   └── useEquipmentFilter.tsx   // Equipment filtering
└── types/
    └── character-creation.types.ts // Local types for creation
```

### Step-by-Step Interface

#### Step 1: Attribute Generation
```typescript
interface AttributeRollerProps {
  onAttributesGenerated: (attrs: GeneratedAttributes) => void;
  onReroll: () => void;
}

// Visual dice rolling with animation
// Show 4x 1d4 results
// Allow reroll (with confirmation)
// Display attribute assignments clearly
```

#### Step 2: Race Selection
```typescript
interface RaceSelectorProps {
  attributes: GeneratedAttributes;
  onRaceSelected: (race: Race) => void;
  selectedRace?: Race;
}

// Grid of race cards with:
// - Race artwork/icon
// - Attribute modifier preview
// - Special rules tooltip
// - Restrictions warnings
```

#### Step 3: Origin & Background Selection
```typescript
interface BackgroundSelectorProps {
  selectedOrigin: Origin;
  onBackgroundsSelected: (backgrounds: Background[]) => void;
  selectedBackgrounds: Background[];
}

// Origin selection affects available backgrounds
// Background cards show:
// - Starting equipment preview
// - Special abilities
// - Skill bonuses
// - Unique background indicators
```

#### Step 4: Faith Selection
```typescript
interface FaithSelectorProps {
  onFaithSelected: (faith?: Faith, covenant?: boolean) => void;
  selectedFaith?: Faith;
  hasCovenent: boolean;
}

// Optional step
// Faith cards with domain information
// Covenant toggle with benefits/risks
// Clear "no faith" option
```

#### Step 5: Equipment Selection
```typescript
interface EquipmentBrowserProps {
  startingEquipment: string[];
  onEquipmentSelected: (equipment: SelectedEquipment) => void;
  selectedEquipment: SelectedEquipment;
}

// Tabbed interface: Weapons | Armor | Equipment | Containers
// Filter by type, cost, weight class
// Search functionality
// Starting equipment clearly marked
// Weight/capacity management
```

#### Step 6: Character Details
```typescript
interface CharacterDetailsProps {
  onDetailsSet: (details: CharacterDetails) => void;
  characterDetails: CharacterDetails;
}

// Character name (required)
// Description text area
// Notes text area
// Avatar/appearance options (future)
```

#### Step 7: Final Review
```typescript
interface CharacterSummaryProps {
  character: Partial<Character>;
  onConfirm: () => Promise<void>;
  onEdit: (step: number) => void;
}

// Complete character sheet preview
// Edit buttons for each section
// Save confirmation
// Loading state during save
```

## Technical Implementation

### Character Creation Hook

```typescript
// hooks/useCharacterCreation.tsx
interface CharacterCreationState {
  currentStep: number;
  attributes?: GeneratedAttributes;
  race?: Race;
  origin?: Origin;
  backgrounds: Background[];
  faith?: Faith;
  covenant: boolean;
  equipment: SelectedEquipment;
  details: CharacterDetails;
  errors: ValidationErrors;
  isValid: boolean;
  isSaving: boolean;
}

export function useCharacterCreation() {
  const [state, setState] = useState<CharacterCreationState>(initialState);
  const { user } = useAuth();
  
  const generateAttributes = useCallback(() => {
    const attrs = generateAttributesUtil();
    setState(prev => ({ ...prev, attributes: attrs }));
  }, []);
  
  const selectRace = useCallback((race: Race) => {
    if (!state.attributes) return;
    const modifiedAttrs = applyRacialModifiers(state.attributes, race);
    setState(prev => ({ ...prev, race, modifiedAttributes: modifiedAttrs }));
  }, [state.attributes]);
  
  const saveCharacter = useCallback(async () => {
    if (!isValid || !user) return;
    
    setState(prev => ({ ...prev, isSaving: true }));
    
    try {
      const character = buildCharacterFromState(state, user);
      await saveCharacterToFirestore(character);
      // Navigate to character sheet or character list
    } catch (error) {
      // Handle save error
    } finally {
      setState(prev => ({ ...prev, isSaving: false }));
    }
  }, [state, user, isValid]);
  
  return {
    ...state,
    generateAttributes,
    selectRace,
    selectOrigin,
    selectBackgrounds,
    selectFaith,
    selectEquipment,
    setDetails,
    saveCharacter,
    nextStep,
    prevStep,
    goToStep
  };
}
```

### Firebase Integration

```typescript
// lib/firebase-character.ts
export async function saveCharacterToFirestore(character: Character): Promise<string> {
  const charactersRef = collection(firestore, 'characters');
  const docRef = await addDoc(charactersRef, {
    ...character,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    version: 1
  });
  return docRef.id;
}

export async function getUserCharacters(clerkId: string): Promise<Character[]> {
  const charactersRef = collection(firestore, 'characters');
  const q = query(
    charactersRef, 
    where('userRef.clerkId', '==', clerkId),
    orderBy('updatedAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Character));
}

export async function updateCharacter(characterId: string, updates: Partial<Character>): Promise<void> {
  const docRef = doc(firestore, 'characters', characterId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
    version: increment(1)
  });
}

export async function deleteCharacter(characterId: string): Promise<void> {
  const docRef = doc(firestore, 'characters', characterId);
  await deleteDoc(docRef);
}
```

### Character Builder Utility

```typescript
// utils/character-builder.ts
export function buildCharacterFromState(
  state: CharacterCreationState, 
  user: User
): Omit<Character, 'id'> {
  if (!state.attributes || !state.race || !state.origin) {
    throw new Error('Incomplete character data');
  }
  
  const modifiedAttributes = applyRacialModifiers(state.attributes, state.race);
  const derivedStats = calculateDerivedStats(modifiedAttributes);
  
  return {
    name: state.details.name,
    userRef: {
      clerkId: user.id,
      username: user.username || user.emailAddresses[0].emailAddress,
      createdBy: user.fullName || user.emailAddresses[0].emailAddress,
      lastModifiedBy: user.fullName || user.emailAddresses[0].emailAddress
    },
    race: state.race,
    origin: state.origin,
    backgrounds: state.backgrounds,
    faith: state.faith,
    covenant: state.covenant,
    
    twitch: modifiedAttributes.twitch,
    flesh: modifiedAttributes.flesh,
    mojo: modifiedAttributes.mojo,
    
    bones: derivedStats.bones,
    manaDice: derivedStats.manaDice,
    zimes: state.attributes.zimes,
    
    // Initial status values
    woundPoints: 0,
    xomPoints: 0,
    canticleDebt: 0,
    zealotry: 0,
    
    // Equipment from selections
    weapons: state.equipment.weapons,
    armor: state.equipment.armor,
    containers: state.equipment.containers,
    equipment: state.equipment.items,
    
    // Magic & abilities from backgrounds + race
    knownSpells: [], // Initial spells if any
    mutations: [],
    specialAbilities: [
      ...state.race.specialRules,
      ...state.backgrounds.flatMap(bg => bg.specialAbilities)
    ],
    
    description: state.details.description,
    notes: state.details.notes,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}
```

## Validation Rules

### Character Creation Validation

```typescript
interface ValidationErrors {
  name?: string;
  race?: string;
  origin?: string;
  backgrounds?: string;
  equipment?: string;
  general?: string;
}

export function validateCharacterCreation(state: CharacterCreationState): ValidationErrors {
  const errors: ValidationErrors = {};
  
  // Name validation
  if (!state.details.name?.trim()) {
    errors.name = 'Character name is required';
  } else if (state.details.name.length > 50) {
    errors.name = 'Character name must be 50 characters or less';
  }
  
  // Background validation
  if (state.backgrounds.length !== 3) {
    errors.backgrounds = 'Must select exactly 3 backgrounds';
  } else if (!validateCharacterBackgrounds(state.backgrounds)) {
    errors.backgrounds = 'Invalid background combination (check unique backgrounds and origin requirements)';
  }
  
  // Equipment validation
  const totalWeight = calculateEquipmentWeight(state.equipment);
  if (totalWeight > getCarryingCapacity(state.modifiedAttributes?.flesh)) {
    errors.equipment = 'Equipment exceeds carrying capacity';
  }
  
  return errors;
}
```

## Routes & Navigation

### Character Creator Routes

```typescript
// Character creator routes
/character-creator              // Step 1: Attributes
/character-creator/race         // Step 2: Race Selection
/character-creator/origin       // Step 3: Origin & Backgrounds
/character-creator/faith        // Step 4: Faith (Optional)
/character-creator/equipment    // Step 5: Equipment
/character-creator/details      // Step 6: Character Details
/character-creator/review       // Step 7: Final Review

// Character management routes
/characters                     // Character list/roster
/characters/[id]               // Character sheet view
/characters/[id]/edit          // Character editing
```

## Error Handling

### Error Scenarios

1. **Network Failures**: Save to local storage, retry on reconnection
2. **Validation Errors**: Inline validation with clear error messages
3. **Authentication Issues**: Redirect to sign-in, preserve character data
4. **Firestore Errors**: User-friendly error messages, save locally
5. **Data Conflicts**: Version-based conflict resolution

### Error Recovery

```typescript
export function useCharacterCreationPersistence() {
  const saveToLocalStorage = useCallback((state: CharacterCreationState) => {
    localStorage.setItem('bugchud-character-draft', JSON.stringify(state));
  }, []);
  
  const loadFromLocalStorage = useCallback((): CharacterCreationState | null => {
    const saved = localStorage.getItem('bugchud-character-draft');
    return saved ? JSON.parse(saved) : null;
  }, []);
  
  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem('bugchud-character-draft');
  }, []);
  
  return { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage };
}
```

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Load equipment data on-demand
2. **Virtualization**: Virtual scrolling for large equipment lists
3. **Debounced Validation**: Avoid excessive validation calls
4. **Image Optimization**: Optimized race/equipment artwork
5. **Bundle Splitting**: Separate character creator bundle
6. **Caching**: Cache user's characters and game data

### Data Loading

```typescript
// Preload essential character data
export function useCharacterDataPreload() {
  useEffect(() => {
    // Preload core game data
    preloadGameData([RACES, ORIGINS, BACKGROUNDS]);
    
    // Lazy load heavy equipment data
    import('@/utils/equipment-extended').then(module => {
      // Cache extended equipment data
    });
  }, []);
}
```

## Testing Strategy

### Test Coverage

1. **Unit Tests**: Utility functions, validation logic
2. **Integration Tests**: Character creation flow, Firebase operations
3. **E2E Tests**: Complete character creation user journey
4. **Visual Tests**: Component rendering across different states
5. **Performance Tests**: Large character lists, complex equipment selection

### Test Examples

```typescript
// Character creation validation tests
describe('Character Creation Validation', () => {
  test('validates background selection rules', () => {
    const invalidBackgrounds = [scholar, noble, entertainer]; // 3 from same origin
    expect(validateCharacterBackgrounds(invalidBackgrounds)).toBe(false);
  });
  
  test('applies racial modifiers correctly', () => {
    const baseAttrs = { twitch: 3, flesh: 1, mojo: 4 };
    const dwarf = RACES.find(r => r.id === 'dwarf')!;
    const result = applyRacialModifiers(baseAttrs, dwarf);
    
    expect(result.flesh.loyalty).toBe('favored');
    expect(result.mojo.loyalty).toBe('treacherous');
  });
});
```

## Security Considerations

### Data Protection

1. **User Isolation**: Characters isolated by Clerk user ID
2. **Input Sanitization**: Sanitize all user input (names, descriptions)
3. **Rate Limiting**: Prevent character creation spam
4. **Validation**: Server-side validation of all character data
5. **Audit Trail**: Track character modifications

### Firestore Security

```javascript
// Additional security rules
match /characters/{characterId} {
  allow read, write: if request.auth != null && 
                     resource.data.userRef.clerkId == request.auth.uid &&
                     validateCharacterData(request.resource.data);
  
  function validateCharacterData(data) {
    return data.name is string &&
           data.name.size() <= 50 &&
           data.userRef.clerkId == request.auth.uid &&
           // Additional validation rules...
  }
}
```

## Future Enhancements

### Phase 2 Features

1. **Character Templates**: Save/load character templates
2. **Random Generation**: Fully random character generation option
3. **Import/Export**: Character data import/export functionality
4. **Character Artwork**: AI-generated character portraits
5. **Collaborative Creation**: Share character creation with others
6. **Campaign Integration**: Create characters for specific campaigns
7. **Advanced Equipment**: Magical items, custom equipment
8. **Character Progression**: Level up and advancement tracking

### Technical Improvements

1. **Offline Support**: Progressive Web App capabilities
2. **Real-time Collaboration**: Multiple users editing same character
3. **Version History**: Track character changes over time
4. **Data Migration**: Handle character data schema updates
5. **Performance Monitoring**: Track character creation completion rates
6. **A/B Testing**: Test different character creation flows

---

This design document provides a comprehensive foundation for implementing the BUGCHUD Character Creator with proper user authentication, data persistence, and scalable architecture ready for future enhancements. 