# Characters - Technical Context

## Overview
The characters folder implements a complete character management system with list and detail views. It includes a characters index page that displays all user characters in a grid layout, and dynamic routing for viewing individual character details at `/characters/[id]`.

## Core Functions

### `CharactersPage(): JSX.Element` (page.tsx)
**Purpose**: Main characters page with tabbed interface for both user-owned and public character discovery
**Implementation**: Fetches both user characters and all public characters, displays them in tabbed responsive grids
**Usage**: Accessed via `/characters` route for viewing character collection and community discovery
**Dependencies**: `getUserCharacters()`, `getAllCharacters()` server actions, Clerk authentication, React state management
**Side Effects**: Loads both private and public character data on mount, redirects unauthenticated users

### `CharacterViewPage({ params }): JSX.Element` ([id]/page.tsx)
**Purpose**: Dynamic character detail page for viewing individual character information
**Implementation**: Fetches single character by ID with user ownership validation
**Usage**: Accessed via `/characters/[id]` for detailed character viewing
**Dependencies**: `getCharacterById()` server action, Clerk authentication, Next.js dynamic routing
**Side Effects**: Loads character data by ID, validates user ownership, handles not found states

### `CharacterEditPage({ params }): JSX.Element` ([id]/edit/page.tsx)
**Purpose**: Dynamic character editing page for modifying character information
**Implementation**: Loads character data and provides form interface for editing editable fields
**Usage**: Accessed via `/characters/[id]/edit` for character modification
**Dependencies**: `getCharacterById()`, `updateCharacter()` server actions, `useEquipmentManagement()` hook, Clerk authentication, Next.js dynamic routing
**Side Effects**: Loads character data, tracks form and equipment changes, saves updates via server actions, validates user ownership, manages equipment state

## Route Structure

### Static Route: `/characters`
- **File**: `page.tsx`
- **Purpose**: Character collection overview
- **Features**: Grid layout, character cards, creation button, loading states

### Dynamic Route: `/characters/[id]`
- **File**: `[id]/page.tsx`
- **Purpose**: Individual character details
- **Features**: Complete character sheet, equipment display, edit button, navigation

### Dynamic Route: `/characters/[id]/edit`
- **File**: `[id]/edit/page.tsx`
- **Purpose**: Character editing interface
- **Features**: Form-based editing, real-time change tracking, validation, server actions

## Components & Features

### Character List Page (`page.tsx`)
**Tabbed Interface**:
- **"My Characters" Tab**: Displays user-owned characters with full stats
- **"All Characters" Tab**: Public character gallery showing community creations
- Tab navigation with character counts
- Context-aware empty states per tab

**Character Grid Display**:
- Responsive grid layout (1-3 columns based on screen size)
- **My Characters Cards**: Full character info with avatar, name, race, origin, attribute display with loyalty color coding, health and mana status indicators, background badges (first 3 displayed), faith information with covenant indicator, creation date footer
- **Public Characters Cards**: Safe character info with avatar, name, race, origin, creator username (no user IDs), background badges, faith information, creation date footer
- Click-to-view functionality for both card types

**Loading States**:
- Loading spinner during data fetch
- Error state with retry functionality
- Empty state for users with no characters
- Proper error handling and user feedback

**Navigation**:
- Click-to-view character details
- Create new character button
- Back to dashboard navigation

### Character Detail Page (`[id]/page.tsx`)
**Left Column - Character Overview**:
- Character portrait placeholder (🧙‍♂️)
- Core character information (name, race, origin)
- Attribute scores with loyalty indicators
- Health and status information (bones, wounds, mana, xom)

**Right Column - Detailed Information**:
- Backgrounds section with descriptions
- Faith information with covenant status
- Equipment sections (weapons, armor, other items)
- Character notes and description

**Header Actions**:
- Back to characters list
- Edit character button → navigates to `/characters/[id]/edit`
- Character name and basic info display

### Character Edit Page (`[id]/edit/page.tsx`)
**Editable Sections**:
- **Character Information**: Name, description, notes
- **Health & Status**: Wound points, Xom points, canticle debt, zealotry
- **Currency**: Current Zimes
- **Equipment & Inventory**: Weapons, armor, equipment, containers with quantity selection and encumbrance management

**Read-Only Reference Section**:
- Core character data (race, origin, attributes, backgrounds, faith)
- Derived stats (bones, mana dice)
- Cannot modify fundamental character choices

**Form Features**:
- Real-time change tracking with visual indicators
- Form validation (wound points capped at bones value)
- Unsaved changes warning on navigation
- Server-side save with proper error handling
- Auto-redirect to character view after successful save

**Equipment Management Section**:
- Full equipment browser with weapons, armor, equipment, and containers tabs
- Real-time encumbrance calculations
- Visual item selection with quantity display and +/- controls
- Item stacking functionality - select multiple copies of the same item
- Equipment validation (insufficient slots, container requirements, etc.)
- Clear buttons for removing all instances of an item when quantity > 1
- Equipment change tracking separate from other form changes
- All equipment is free to select

**Header Actions**:
- Cancel button with unsaved changes protection
- Save Changes button (disabled when no changes or saving)
- Dynamic button states (green when changes available)

## Types & Interfaces

### Character Data Flow
```typescript
Character (from utils/character-data.ts) - Full character data for owners
├── Core Identity: id, name, race, origin, backgrounds, faith, covenant
├── Attributes: twitch, flesh, mojo (with loyalty)
├── Derived Stats: bones, manaDice, zimes
├── Health & Status: woundPoints, xomPoints, canticleDebt, zealotry
├── Equipment: weapons[], armor[], containers[], equipment[]
├── Magic & Abilities: knownSpells[], mutations[], specialAbilities[]
└── Details: description, notes, createdAt, updatedAt

PublicCharacterData (from actions.ts) - Sanitized data for public display
├── Core Identity: id, name, race.name, origin.name, backgrounds[].name, faith?.name, covenant
├── Creator Info: createdBy (username only, no user IDs)
└── Metadata: createdAt
// Note: No attributes, stats, equipment, or sensitive data exposed
```

### Component Props
```typescript
// Character View Page
interface CharacterViewPageProps {
  params: { id: string }
}

// Character Edit Page
interface CharacterEditPageProps {
  params: { id: string }
}

// Editable Character Data Interface
interface EditableCharacterData {
  name: string
  description: string
  notes: string
  woundPoints: number
  xomPoints: number
  canticleDebt: number
  zealotry: number
  zimes: number
  equipment: SelectedEquipment
}

// Equipment Manager Component Props
interface EquipmentManagerProps {
  currentEquipment: SelectedEquipment
  currentZimes: number
  onEquipmentChange: (equipment: SelectedEquipment) => void
}

// No props for Characters List Page (uses hooks)
```

## State Management

### Characters List Page
- `myCharacters: Character[]` - Array of user's own characters
- `allCharacters: PublicCharacterData[]` - Array of all public character data (sanitized)
- `activeTab: 'my' | 'all'` - Controls which tab is currently active
- `loading: boolean` - Loading state for data fetch
- `error: string | null` - Error message display

### Character Detail Page
- `character: Character | null` - Single character data
- `loading: boolean` - Loading state for character fetch
- `error: string | null` - Error handling for not found/unauthorized

### Character Edit Page
- `character: Character | null` - Original character data for comparison
- `editData: EditableCharacterData` - Form data being edited
- `loading: boolean` - Loading state for character fetch
- `saving: boolean` - Save operation in progress
- `error: string | null` - Error handling for operations
- `hasChanges: boolean` - Tracks if form has unsaved changes (includes equipment changes)

## Server Actions Integration

### Character Operations
```typescript
// Server action to save a character
saveCharacter(character: StoredCharacter): Promise<{ success: boolean; characterId?: string; error?: string }>

// Server action to get all characters for authenticated user
getUserCharacters(): Promise<{ success: boolean; characters?: Character[]; error?: string }>

// Server action to get all public character data (sanitized for security)
getAllCharacters(): Promise<{ success: boolean; characters?: PublicCharacterData[]; error?: string }>

// Server action to get single character by ID with ownership validation
getCharacterById(characterId: string): Promise<{ success: boolean; character?: Character; error?: string }>

// Server action to update character
updateCharacter(characterId: string, updates: Partial<Character>): Promise<{ success: boolean; error?: string }>

// Server action to delete character
deleteCharacter(characterId: string): Promise<{ success: boolean; error?: string }>
```

### Security Features
- Server-side authentication via Clerk auth()
- User ownership validation for all character operations
- Firebase Admin SDK used securely on server-side only
- Proper error handling for unauthorized access
- Route protection via Clerk authentication
- All Firebase operations moved to server actions to prevent client-side exposure
- **Public data sanitization**: `getAllCharacters()` only returns safe data - usernames only (no user IDs), basic character info only, no sensitive stats or detailed information
- **Data segregation**: Full character data only available to owners, public view uses sanitized `PublicCharacterData` interface

## Styling & Design

### BUGCHUD Dark Fantasy Theme
- Consistent purple gradient backgrounds
- Glass morphism effects (backdrop-blur-sm)
- Purple border accents (border-purple-500/30)
- Dark card designs with hover effects

### Responsive Design
- Mobile-first grid layouts
- Responsive character cards
- Proper spacing and typography
- Touch-friendly interaction areas

### Color Coding System
- **Favored attributes**: Green (text-green-400)
- **Treacherous attributes**: Red (text-red-400)
- **Middling attributes**: White/Gray
- **Faith elements**: Yellow (text-yellow-400)
- **Background badges**: Purple (bg-purple-600/20)

## Navigation Flow

### User Journey
1. **Dashboard** → View character gallery or Characters button → **Characters List**
2. **Dashboard Character Gallery** → Click character card → **Character Detail**
3. **Characters List** → Switch between "My Characters" and "All Characters" tabs
4. **Characters List** → Click character card → **Character Detail**
5. **Character Detail** → Edit button → **Character Edit**
6. **Character Edit** → Save → **Character Detail**
7. **Character Edit** → Cancel → **Character Detail**
8. **Character Detail** → Back button → **Characters List**
9. **Characters List** → Create button → **Character Creator**

### Route Protection
- All routes require Clerk authentication
- Character detail pages validate user ownership
- Proper redirects for unauthorized access

## Error Handling

### Character Not Found
- 404-style error page with skull emoji
- Clear error message
- Navigation back to characters list

### Loading States
- Skeleton loading with spinner
- Loading text for user feedback
- Proper state transitions

### Network Errors
- Error boundary handling
- Retry functionality
- User-friendly error messages

## Future Enhancements

### Advanced Equipment Features
- Equipment drag and drop interface  
- Equipment templates and presets
- Equipment comparison tools
- Quick-equip item sets and loadouts

### Character Actions
- Delete character functionality
- Duplicate character feature
- Export character sheet

### Advanced Features
- Character search and filtering
- Sort by various criteria
- Character comparison tool
- Campaign assignment

## Performance Considerations

### Data Loading
- Lazy loading for character details
- Efficient Firebase queries
- Proper loading states

### Component Optimization
- Memoization for character cards
- Efficient re-rendering
- Image optimization for avatars (future)

## Testing Strategy

### Unit Tests
- Character data rendering
- Navigation functionality
- Error state handling

### Integration Tests
- Firebase data fetching
- Route protection
- User ownership validation

### User Experience Tests
- Loading state transitions
- Responsive design validation
- Accessibility compliance 