# BUGCHUD Game System Design Document 🎲

## Project Vision

Building a digital implementation of the BUGCHUD tabletop RPG, starting with a character creator and battle simulation system. This will be a web-based application that captures the dark fantasy, vibe-coded essence of Psydonia while providing intuitive tools for character creation and combat resolution.

## Core Philosophy

Following the **vibe-coded development** approach:
- Intuitive, flowing interfaces that feel natural to use
- Organic growth from simple MVP to complex system
- Dark fantasy aesthetic that matches the BUGCHUD vibe
- Quick iteration and prototyping over rigid planning

## Phase 1: Character Creator 🧙‍♂️

### Core Features

#### 1. Race Selection
- **Humen**: No favored/treacherous attributes (balanced)
- **Dwarf**: Favored Flesh, Treacherous Mojo 
- **Elf**: Favored Mojo, Treacherous Flesh (no Xom from contaminated areas)
- **Halfling**: Favored Twitch, Treacherous Flesh
- **Half-breed**: Inherit worst qualities (no favored attributes)

#### 2. Attribute Generation
- Roll 1d4 four times for TWITCH, FLESH, MOJO values
- One leftover number becomes starting Zimes
- Apply racial attribute loyalties (*Favored*, Middling, !Treacherous)
- Calculate derived stats:
  - **Bones** = Flesh score (wound point tolerance)
  - **Mana Dice** = Mojo × 2 (magic fuel)

#### 3. Origin & Background System
- **Three Origins**: Pseudo-Civilized, Barbaric, Darklands
- **Background Selection**: Choose 3 backgrounds (min 2 from origin)
- Unique backgrounds (**) limited to one per character
- Each background grants special abilities/bonuses

#### 4. Faith Selection
- Choose deity from the Immortal Eight or other faiths
- Option to forge Covenant (gain divine powers)
- Track Canticle Debt and Zealotry modifiers

#### 5. Equipment & Gear
- Starting equipment based on backgrounds
- Weapon selection with proper stats (Weight, Range, Accuracy, etc.)
- Armor system (Light/Medium/Heavy with proper penalties)
- Container system for inventory management (6 containers, 3 slots each)

### Technical Implementation

#### Data Models
```typescript
interface Character {
  // Core Identity
  name: string;
  race: Race;
  origin: Origin;
  backgrounds: Background[];
  faith?: Faith;
  covenant?: boolean;
  
  // Attributes
  twitch: AttributeScore;
  flesh: AttributeScore;
  mojo: AttributeScore;
  
  // Derived Stats
  bones: number;
  manaDice: number;
  
  // Equipment
  weapons: Weapon[];
  armor: Armor[];
  containers: Container[];
  equipment: Equipment[];
  
  // Progression
  woundPoints: number;
  xomPoints: number;
  canticleDebt: number;
  mutations: Mutation[];
}

interface AttributeScore {
  value: number;
  loyalty: 'favored' | 'middling' | 'treacherous';
}
```

#### UI/UX Design
- **Step-by-step wizard interface** with clear progression
- **Dark fantasy theme** with appropriate color scheme (greens, pinks, yellows, purples per BUGCHUD style)
- **Interactive dice rolling** with visual feedback
- **Equipment browser** with filtering and search
- **Character sheet preview** that updates in real-time

## Phase 2: Battle Simulation ⚔️

### Core Combat Mechanics

#### 1. Initiative & Actions
- Initiative based on circumstances (not strict turn order)
- Action types: Attack, Defend, Cast Spell, Use Item, Move
- Situational bonuses and penalties

#### 2. Attack Resolution
- **Melee**: Flesh checks vs target's Soaks
- **Ranged**: Twitch checks with accuracy requirements
- **Locational damage** system (head, torso, limbs)
- **Weapon weight classes**: Light (2d6 keep lower), Medium (1d6), Heavy (2d6 keep higher)

#### 3. Damage & Wounds
- Wounds subtract from effectiveness
- **Bones** ignore wound points (not damage reduction)
- **Death saves** at critical health
- **Doom rolls** for continuing wounds

#### 4. Magic System
- **Mana Dice** fuel spells
- **Mana-burn** (rolls of 1 = +1 Xom)
- **Grimoire management** for spell access
- **Xom accumulation** and mutation risks

#### 5. Special Mechanics
- **Ammo Dice** for ranged weapons
- **Vehicle combat** with different rules
- **Environmental effects** (Xom zones, weather)
- **Nite-creecher encounters** with special rules

### Battle Simulation Features

#### 1. Combat Interface
- **Tactical map view** with position management
- **Action selection** with contextual options
- **Dice rolling interface** with proper animations
- **Damage tracking** and wound visualization
- **Initiative tracker** with flexible ordering

#### 2. AI Opponents
- **Basic monster stats** and behaviors
- **Nite-creecher special abilities**
- **NPC decision making** for complex encounters
- **Scaling difficulty** based on party power

#### 3. Magic & Special Abilities
- **Spell selection** from character grimoires
- **Mana Dice allocation** interface
- **Divine miracle** requests with Zealotry saves
- **Mutation tracking** and Xom management

### Technical Architecture

#### Frontend (Next.js)
```
src/
├── app/                      # App Router pages
│   ├── character-creator/    # Character creation flow
│   ├── battle-sim/          # Battle simulation
│   └── dashboard/           # Character management
├── components/              # Reusable UI components
│   ├── character/           # Character-related components
│   ├── combat/              # Battle simulation components
│   ├── dice/                # Dice rolling components
│   └── ui/                  # Base UI components
├── lib/                     # Utilities and game logic
│   ├── game-rules/          # BUGCHUD rules engine
│   ├── character-gen/       # Character generation logic
│   ├── combat-engine/       # Battle resolution
│   └── data/               # Game data (races, backgrounds, etc.)
└── hooks/                   # Custom React hooks
```

#### Backend (Firebase Admin)
```
Database Structure:
├── users/                   # User accounts (Clerk)
├── characters/              # Character sheets
├── campaigns/               # Game sessions
├── battles/                 # Battle instances
└── game-data/              # Static game content
```

#### Authentication (Clerk)
- User registration and login
- Character ownership tracking
- Campaign sharing and permissions

## Phase 3: Advanced Features 🌟

### 1. Campaign Management
- **Campaign creation** and player invitations
- **GM tools** for managing NPCs and encounters
- **Session logs** and character progression tracking

### 2. Advanced Character Features
- **Mutation system** with visual representation
- **Bionic augmentation** tracking and effects
- **Vehicle ownership** and customization
- **Grimoire management** with spell trading

### 3. Expanded Combat
- **Environmental hazards** and interactive terrain
- **Mass combat** rules for large battles
- **Siege mechanics** for castle/city encounters
- **Psydonic phenomena** (Xom storms, etc.)

## Implementation Roadmap 🗺️

### Sprint 1: Foundation (Week 1-2)
- Set up Next.js project with TypeScript
- Configure Clerk authentication
- Set up Firebase Admin connection
- Create basic UI components and styling system
- Implement core data models

### Sprint 2: Character Creator MVP (Week 3-4)
- Race selection interface
- Attribute generation with dice rolling
- Basic background selection
- Simple equipment assignment
- Character sheet display

### Sprint 3: Character Creator Polish (Week 5-6)
- Origin and background system completion
- Equipment browser and container management
- Faith and covenant selection
- Character export/import functionality
- Validation and error handling

### Sprint 4: Battle Simulation Foundation (Week 7-8)
- Basic combat interface layout
- Initiative and turn management
- Simple attack resolution
- Damage tracking system
- Basic AI opponent behavior

### Sprint 5: Combat Mechanics (Week 9-10)
- Complete weapon system implementation
- Magic casting interface
- Locational damage system
- Wound and death mechanics
- Environmental effects

### Sprint 6: Polish & Testing (Week 11-12)
- UI/UX refinement and dark fantasy theming
- Performance optimization
- Comprehensive testing
- Documentation and deployment
- Community feedback integration

## Technical Considerations 🔧

### Performance
- **Client-side character generation** for responsiveness
- **Optimistic UI updates** for dice rolling and combat
- **Lazy loading** for large equipment databases
- **Efficient state management** with Zustand or similar

### Data Management
- **Real-time sync** for multiplayer battles
- **Offline capability** for character creation
- **Version control** for character sheets
- **Backup and recovery** systems

### Accessibility
- **Screen reader support** for visually impaired users
- **Keyboard navigation** for all interfaces
- **High contrast** options for readability
- **Mobile-responsive** design for tablets

### Security
- **Input validation** for all character data
- **Rate limiting** for dice rolling to prevent abuse
- **Secure campaign sharing** with proper permissions
- **Data encryption** for sensitive character information

## Success Metrics 📊

### Character Creator
- **Creation completion rate** (target: >80%)
- **Time to complete character** (target: <15 minutes)
- **User satisfaction** with generated characters
- **Error rate** in character validation

### Battle Simulation
- **Combat resolution time** (target: <5 minutes per round)
- **Rule accuracy** compared to tabletop version
- **User engagement** in battle scenarios
- **AI opponent believability** ratings

### Overall System
- **User retention** after first character creation
- **Community engagement** and feedback quality
- **System uptime** and performance metrics
- **Feature adoption** rates for advanced mechanics

## Risk Assessment & Mitigation ⚠️

### Technical Risks
- **Complex rule interactions** → Start simple, add complexity iteratively  
- **Real-time synchronization** → Use proven libraries (Socket.io, Firebase)
- **Mobile performance** → Progressive enhancement approach

### Design Risks
- **Feature creep** → Strict MVP scope with clear acceptance criteria
- **Overwhelming complexity** → User testing at each milestone
- **Poor mobile experience** → Mobile-first design approach

### Business Risks
- **Low user adoption** → Community engagement from day one
- **High development costs** → Lean development with rapid iteration
- **Legal concerns** → Ensure proper attribution and fair use

## Next Steps 🚀

1. **Set up development environment** with all necessary tools
2. **Create basic project structure** following the planned architecture
3. **Implement core data models** and validation logic
4. **Build character creation MVP** with basic functionality
5. **Gather early user feedback** from BUGCHUD community
6. **Iterate based on feedback** while maintaining vibe-coded principles

---

*This design document embodies the vibe-coded development philosophy - starting simple, growing organically, and always keeping the dark fantasy essence of BUGCHUD at the heart of every decision.* 