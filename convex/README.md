# Convex Backend Setup

This directory contains the Convex backend configuration for the Glimpse app.

## Getting Started

1. **Login to Convex** (first time only):
   ```bash
   npx convex dev
   ```
   This will prompt you to login and create a new project.

2. **Run Convex in development mode**:
   ```bash
   npm run dev:convex
   ```

3. **Copy the deployment URL** from the console output and add it to your `.env.local` file:
   ```
   CONVEX_URL=https://your-deployment.convex.cloud
   ```

4. **Deploy to production**:
   ```bash
   npm run convex:deploy
   ```

## Directory Structure

- `schema.ts` - Database schema definitions
- `functions/` - Convex functions (queries, mutations, actions)
  - `users.ts` - User management functions
  - `posts.ts` - Post management functions  
  - `auth.ts` - Authentication functions
- `_generated/` - Auto-generated files by Convex (do not edit)

## Schema

The current schema includes:
- **users** - User profiles
- **posts** - User posts
- **comments** - Comments on posts
- **sessions** - Authentication sessions

## Available Functions

### Users
- `users.create` - Create a new user
- `users.get` - Get user by ID
- `users.getByEmail` - Get user by email
- `users.update` - Update user profile
- `users.list` - List all users

### Posts
- `posts.create` - Create a new post
- `posts.get` - Get post by ID
- `posts.getByUser` - Get posts by user
- `posts.getRecent` - Get recent posts
- `posts.update` - Update a post
- `posts.remove` - Delete a post

### Auth
- `auth.createSession` - Create a new session
- `auth.validateSession` - Validate a session token
- `auth.deleteSession` - Delete a session (logout)
- `auth.cleanupExpiredSessions` - Clean up expired sessions

## Usage in React Native

```typescript
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

// Query example
const users = useQuery(api.functions.users.list);

// Mutation example
const createUser = useMutation(api.functions.users.create);
await createUser({ email: 'user@example.com', name: 'John Doe' });
```