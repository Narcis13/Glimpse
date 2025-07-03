# CLAUDE.md - Glimpse Project

## Project Overview

**Glimpse** is an intentional social platform built with React Native and Convex that revolutionizes digital connection through radical presence. Users can only focus on one person, place, or topic at a time, sharing unedited live photos (Glimpses) that upload instantly.

## Core Principles

1. **Authenticity by Constraint**: No editing, no filters, no review
2. **Attention as Currency**: You can only focus on one thing at a time
3. **Mutual Intent**: Connections require reciprocal focus
4. **Present Moment**: All content is live and ephemeral

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Convex (real-time database)
- **Language**: TypeScript (strict mode)
- **Key Libraries**: React Navigation, Expo Camera, Expo Location, React Native Maps

## Project Structure

```
glimpse/
├── docs/                    # Documentation
│   ├── PRD.md              # Product Requirements Document
│   └── implementation-plan.md # Detailed implementation tasks
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/           # Screen components
│   ├── services/          # Business logic services
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── constants/         # App constants
├── convex/                # Backend code
│   ├── schema.ts         # Database schema
│   └── functions/        # Server functions
├── assets/               # Images, fonts, etc.
└── __tests__/           # Test files
```

## Workflow Session Protocol

### 🚨 MANDATORY: Beginning of Every Coding Session

Before writing any code, you MUST:

1. **Read the PRD**: Open and thoroughly read `docs/PRD.md` to understand:
   - Core features and their requirements
   - Data models and relationships
   - User experience flows
   - Technical architecture decisions
   - Success metrics and constraints

2. **Review Implementation Plan**: Open `docs/implementation-plan.md` to:
   - Check current task status
   - Understand dependencies
   - Review the specific task requirements
   - Note relevant context files

3. **Verify Current State**: Check the project to understand:
   - What has been implemented
   - Current file structure
   - Existing patterns and conventions

### Coding Guidelines

#### TypeScript Standards
```typescript
// ALWAYS use strict TypeScript
// Define interfaces for all data structures
interface User {
  _id: string;
  username: string;
  currentFocus: Focus;
  subscription: 'free' | 'pro';
  trustScore: number;
  created: Date;
}

// Use enums for constants
enum FocusType {
  USER = 'user',
  PLACE = 'place',
  TOPIC = 'topic'
}

// Prefer type safety over any
// Never use 'any' - use 'unknown' if type is truly unknown
```

#### Convex Patterns
```typescript
// Mutations for write operations
export const changeFocus = mutation({
  args: {
    type: v.union(v.literal("user"), v.literal("place"), v.literal("topic")),
    target: v.string(),
  },
  handler: async (ctx, args) => {
    // Implementation
  },
});

// Queries for read operations
export const getCurrentFocus = query({
  handler: async (ctx) => {
    // Implementation
  },
});

// Use real-time subscriptions for live updates
```

#### React Native Best Practices
```typescript
// Functional components with hooks
const GlimpseScreen: React.FC = () => {
  // Use proper typing for navigation
  const navigation = useNavigation<NavigationProp>();
  
  // Optimize re-renders with useMemo/useCallback
  const memoizedValue = useMemo(() => computeExpensive(), [deps]);
  
  // Handle permissions gracefully
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    // Handle all cases
  };
};

// Always handle loading and error states
```

## Key Implementation Details

### Camera & Glimpse Capture
- **Instant capture**: No preview, no review
- **Minimal latency**: Optimize capture-to-upload pipeline
- **Haptic feedback**: Subtle confirmation on capture
- **Queue system**: Handle offline scenarios gracefully

### Focus System
- **Single focus**: Enforce one focus at a time in database
- **Real-time updates**: Use Convex subscriptions
- **Warning on change**: "You'll lose sight of current focus"
- **Anonymous viewing**: Don't reveal viewer until mutual focus

### Link Formation
- **Mutual detection**: Efficient real-time algorithm
- **Celebration**: Animation + haptic on link formation
- **Private channel**: Separate glimpse type for links
- **Auto-cleanup**: 24-hour expiration for link content

### Performance Priorities
1. **Camera launch speed**: < 1 second to ready
2. **Capture latency**: < 100ms tap to capture
3. **Upload start**: Immediate, non-blocking
4. **Focus switch**: < 500ms including animation
5. **Feed updates**: Real-time via subscriptions

## Common Pitfalls to Avoid

1. **Don't add preview screens**: Glimpses upload instantly
2. **Don't allow multiple focuses**: Core constraint of the app
3. **Don't store unencrypted private glimpses**: Security requirement
4. **Don't block UI during uploads**: Always non-blocking
5. **Don't forget offline support**: Queue everything

## Testing Requirements

- **Unit tests**: All services and utilities (Jest)
- **Integration tests**: Convex functions
- **Component tests**: React Native Testing Library
- **E2E tests**: Critical user flows (Detox)
- **Coverage target**: Minimum 80%

## Security Considerations

1. **Input validation**: Sanitize all user inputs
2. **Rate limiting**: Prevent abuse on all endpoints
3. **Token management**: Use Expo SecureStore
4. **Content moderation**: AI pre-screening required
5. **Privacy by default**: Anonymous viewing, no public counts

## Development Workflow

1. **Read task requirements** from implementation plan
2. **Check dependencies** - ensure prerequisites are complete
3. **Write tests first** when possible (TDD)
4. **Implement feature** following patterns
5. **Test thoroughly** including edge cases
6. **Update task status** in implementation plan

## Quick Command Reference

```bash
# Start development
npm run dev

# Run Convex backend
npx convex dev

# Run tests
npm test

# Type checking
npm run type-check

# Start iOS simulator
npm run ios

# Start Android emulator  
npm run android
```

## Resources

- [Convex Documentation](https://docs.convex.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Remember

The goal is to create an app that promotes authentic, intentional connections. Every technical decision should support the core philosophy: **One Focus. Real Moments. True Connections.**