# Lib - Technical Context

## Overview
The lib folder contains core utility functions, configuration setups, and shared logic that supports the BUGCHUD game system. Currently focused on Firebase Admin initialization and database connectivity.

## Core Functions

### Firebase Admin Initialization
**Purpose**: Initializes Firebase Admin SDK with proper error handling and prevents duplicate initialization
**Implementation**: Checks if admin apps already exist before initializing to avoid conflicts
**Usage**: Import firestore, database, or auth services from this module
**Dependencies**: firebase-admin package, environment variables
**Side Effects**: Creates global Firebase Admin app instance

## Types & Interfaces

Currently no custom types defined - relies on Firebase Admin SDK types.

## Classes/Components

No classes currently implemented.

## Constants & Configuration

### Firebase Admin Configuration
**Value**: Firebase Admin SDK initialization with service account credentials
**Purpose**: Provides authenticated access to Firebase services (Firestore, Realtime Database, Auth)
**Usage**: Used throughout the application for database operations and authentication
**Modification Guidelines**: Update databaseURL and credential configuration as needed for different environments

## Internal Architecture

### File Structure
- `firebase-admin.ts` - Firebase Admin SDK initialization and service exports

### Data Flow
1. Environment variable `firebase_admin_key` provides service account credentials
2. Firebase Admin initializes with credentials and database URL
3. Services (firestore, database, auth) are exported for use throughout the app

### Key Patterns
- Singleton pattern for Firebase Admin initialization
- Environment-based configuration
- Error handling with graceful fallbacks

## Dependencies

### External
- `firebase-admin` - Google's Firebase Admin SDK for server-side operations
- Environment variables:
  - `firebase_admin_key` - JSON string containing Firebase service account credentials

## Usage Examples

### Basic Usage
```typescript
import { firestore, database, auth } from '@/lib/firebase-admin';

// Firestore operations
const doc = await firestore.collection('characters').doc('characterId').get();

// Realtime Database operations
const ref = database.ref('battles/battleId');
const snapshot = await ref.once('value');

// Auth operations
const user = await auth.getUser(uid);
```

### Advanced Usage
```typescript
// Batch operations
const batch = firestore.batch();
batch.set(firestore.collection('characters').doc(), characterData);
batch.commit();

// Real-time listeners
database.ref('battles/active').on('value', (snapshot) => {
  // Handle real-time battle updates
});
```

## Error Handling
- Firebase Admin initialization wrapped in try-catch with console logging
- Graceful handling of missing environment variables with empty string fallback
- Prevents duplicate initialization attempts

## Performance Considerations
- Firebase Admin initialized once per application lifecycle
- Connection pooling handled automatically by Firebase SDK
- Consider implementing connection cleanup for serverless environments

## Testing Strategy
- Mock Firebase Admin services for unit testing
- Use Firebase emulators for integration testing
- Environment-specific configurations for test/staging/production

## Future Considerations
- Add connection monitoring and health checks
- Implement connection retry logic for better resilience
- Consider adding custom Firebase function extensions
- Add typed wrappers for common database operations
- Implement proper logging/monitoring for production use

## Security Notes
- Service account key stored in environment variables (never in code)
- Admin SDK provides full database access - use with caution
- Consider implementing custom claims for user role management
- Validate all inputs before database operations 