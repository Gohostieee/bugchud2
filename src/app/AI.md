# App - Authentication & Main Interface

## Purpose
The app folder contains the main BUGCHUD application interface with complete Clerk authentication integration. This includes route protection, sign-in/sign-up flows, and the main dashboard interface.

## Authentication System

### Clerk Integration
- **Complete route protection** - All routes require authentication except sign-in/sign-up
- **Middleware-based protection** - Uses Next.js middleware for efficient route guarding
- **Themed auth components** - Custom dark fantasy styling matching BUGCHUD aesthetic
- **User management** - Integrated user button and profile management

### Route Structure
```
/                    # Protected dashboard (redirects to /sign-in if not authenticated)
/sign-in/[[...sign-in]]   # Public sign-in page with custom styling
/sign-up/[[...sign-up]]   # Public sign-up page with custom styling
```

### Key Features
- **Auto-redirect** - Unauthenticated users automatically redirected to sign-in
- **Dark fantasy theme** - Purple/black gradient with glass morphism effects
- **Responsive design** - Works on desktop and mobile devices
- **User welcome** - Personalized greeting with user's name

## Visual Design

### Theme
- **Dark fantasy aesthetic** matching BUGCHUD's vibe-coded approach
- **Purple gradients** (gray-900 → purple-900 → violet-900)
- **Glass morphism** effects with backdrop blur and transparency
- **Purple accent colors** (#purple-500/600) for interactive elements

### Layout Components
- **Header** - Navigation with BUGCHUD branding and user controls
- **Feature cards** - Preview of major system components (Character Creator, Battle Sim, Campaign Manager)
- **Quick actions** - Fast access buttons for common tasks

## Integration Points

### Character System
- Links to character creator (when implemented)
- Character roster management placeholder
- Integration with utils/character-data.ts for game mechanics

### Future Integrations
- Campaign management system
- Real-time battle simulation
- Character sheet management
- Firebase data persistence

## Setup Instructions

1. **Clerk Configuration**
   - Create account at https://dashboard.clerk.com
   - Create new application
   - Copy publishable and secret keys to `.env.local`
   - Configure sign-in/sign-up URLs to match route structure

2. **Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual Clerk keys
   ```

3. **Middleware Setup**
   - Already configured in `src/middleware.ts`
   - Protects all routes except sign-in/sign-up and API webhooks
   - Automatically redirects unauthenticated users

## Next Steps
- Implement character creator interface
- Build battle simulation system
- Add campaign management features
- Integrate with Firebase for data persistence

## Notes
- All authentication logic is handled by Clerk - no custom auth needed
- User data is managed by Clerk - character data will be stored in Firebase
- The design system is ready for additional BUGCHUD features 