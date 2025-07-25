# BUGCHUD Authentication Setup

## 🔐 Clerk Authentication Integration

This project uses [Clerk](https://clerk.com) for authentication, providing secure user management with a beautiful dark fantasy themed interface.

## 🚀 Quick Setup

### 1. Create Clerk Account
1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new account or sign in
3. Create a new application
4. Choose your preferred authentication methods (email, social, etc.)

### 2. Get Your API Keys
From your Clerk dashboard:
1. Go to **API Keys** section
2. Copy your **Publishable Key** (starts with `pk_`)
3. Copy your **Secret Key** (starts with `sk_`)

### 3. Set Environment Variables
Create a `.env.local` file in your project root with:

```bash
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_key_here

# Clerk URLs (already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Firebase (for game data)
FIREBASE_ADMIN_KEY=your_firebase_service_account_json
```

### 4. Configure Clerk Dashboard
In your Clerk dashboard:
1. **Paths** → Set:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/`
   - After sign-up URL: `/`

2. **Domains** → Add your development domain:
   - `localhost:3000` (for local development)
   - Your production domain when deploying

## 🎨 Features Implemented

### ✅ Complete Route Protection
- **All routes protected** except sign-in/sign-up
- **Automatic redirects** for unauthenticated users
- **Middleware-based** protection (efficient and secure)

### ✅ Custom Dark Fantasy UI
- **BUGCHUD-themed** sign-in/sign-up pages
- **Purple gradient** backgrounds matching game aesthetic
- **Glass morphism** design with backdrop blur effects
- **Responsive** design for all devices

### ✅ User Management
- **User profile** access via UserButton component
- **Personalized greetings** with user's name
- **Session management** handled automatically by Clerk

## 🏗️ Technical Implementation

### Middleware (`src/middleware.ts`)
```typescript
// Protects all routes except public ones
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)'
])
```

### Auth Pages
- `/sign-in/[[...sign-in]]/page.tsx` - Custom styled sign-in
- `/sign-up/[[...sign-up]]/page.tsx` - Custom styled sign-up
- Both include BUGCHUD branding and dark fantasy theme

### Protected Dashboard (`src/app/page.tsx`)
- Checks authentication status
- Redirects to sign-in if not authenticated
- Shows user welcome message and navigation

## 🧪 Testing the Setup

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Authentication Flow
1. Visit `http://localhost:3000`
2. Should redirect to `/sign-in`
3. Create an account or sign in
4. Should redirect back to dashboard
5. User button should appear in header

### 3. Test Route Protection
- Try accessing any URL while not signed in
- Should always redirect to `/sign-in`
- After signing in, should access protected content

## 🎮 Ready for BUGCHUD Features

The authentication system is now ready for:
- **Character Creation** - Users can create and save characters
- **Campaign Management** - Users can join and manage campaigns  
- **Battle Simulation** - Authenticated multiplayer battles
- **Data Persistence** - User-specific game data storage

## 🔧 Troubleshooting

### Common Issues

**"Invalid publishable key"**
- Double-check your `.env.local` file
- Ensure no extra spaces around the key
- Verify the key starts with `pk_`

**"Redirect loop"**
- Check that your Clerk dashboard URLs match your routes
- Ensure middleware is properly configured

**"Module not found"**
- Run `npm install` to ensure all dependencies are installed
- Restart your development server

### Getting Help
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js + Clerk Guide](https://clerk.com/docs/quickstarts/nextjs)
- Check the browser console for specific error messages

## 🎯 Next Steps

With authentication complete, you can now:
1. Implement the character creator using the data from `src/utils/character-data.ts`
2. Build the battle simulation system
3. Add Firebase integration for persistent game data
4. Create campaign management features

The foundation is solid and ready for the full BUGCHUD experience! 🧙‍♂️⚔️ 