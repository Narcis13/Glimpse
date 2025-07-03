# Glimpse - Product Requirements Document

## Executive Summary

**Product Name**: Glimpse  
**Tagline**: One Focus. Real Moments. True Connections.  
**Version**: 1.0  
**Date**: January 2025  
**Tech Stack**: React Native + Convex

### Vision Statement
Glimpse is an intentional social platform that revolutionizes digital connection through radical presence. Users can only focus on one person, place, or topic at a time, sharing unedited live photos (Glimpses) that upload instantly. When two users focus on each other, they form a Link and can communicate.

### Key Principles
1. **Authenticity by Constraint**: No editing, no filters, no review
2. **Attention as Currency**: You can only focus on one thing at a time
3. **Mutual Intent**: Connections require reciprocal focus
4. **Present Moment**: All content is live and ephemeral

## Core Features

### 1. Glimpse Capture
**Description**: The fundamental content unit - a 1-2 second live photo captured and uploaded instantly.

**Requirements**:
- Camera opens immediately when app launches
- Single tap to capture
- Auto-upload begins instantly (no review screen)
- No editing tools, filters, or enhancements
- Support for front/back camera (double-tap to switch)
- Subtle haptic feedback on capture
- Upload progress indicator (minimal, non-blocking)

**Technical Considerations**:
- Optimize for minimal capture-to-upload latency
- Queue system for poor connectivity
- Compression without quality loss
- Store in Convex file storage

### 2. Focus System
**Description**: Users can focus on exactly one entity: a person, place, or topic.

**Focus Types**:

#### Person Focus
- Search by username
- See only their Glimpses in chronological order
- Anonymous until mutual focus established
- "Someone focused on you" notification (optional)

#### Place Focus
- Map-based selection or search
- Geofenced area (customizable radius)
- See all Glimpses within boundary
- Popular places suggested based on activity

#### Topic Focus
- Hashtag-based (#sunrise, #coffee)
- Global feed of tagged Glimpses
- Trending topics displayed (but not their content)

**Requirements**:
- Smooth transition animation when changing focus
- Clear UI indicating current focus
- Warning before changing focus ("You'll lose sight of current focus")
- Focus history (Pro feature)

### 3. Link Formation
**Description**: When two users focus on each other, they form a Link enabling communication.

**Requirements**:
- Real-time mutual focus detection
- Celebratory animation/haptic on Link formation
- Link notification for both users
- Unlock private Glimpse exchange
- Links persist until either user changes focus
- Link history visible in profile

**Communication Within Links**:
- Private Glimpse exchange (not text initially)
- Glimpses in Links saved for 24 hours
- Visual conversation thread
- Optional: Add ephemeral text in v1.1

### 4. Discovery & Navigation

**Explore Section**:
- Trending topics (names only, no preview)
- Popular places (map view with heat indicators)
- Focus suggestions based on history
- No content preview - maintain focus principle

**Traces** (Pro feature):
- See who recently left a focus
- "3 people were here" for free users
- Usernames visible for Pro users
- 24-hour trace duration

## User Experience Flow

### First-Time User Flow
1. **Welcome**: 3-screen philosophy explanation
2. **Permission**: Camera and location access
3. **Username**: Create unique handle
4. **First Focus**: Guided selection (friend, nearby place, or #welcome)
5. **First Glimpse**: Prompted to capture
6. **Discovery**: Explore page introduction

### Daily Active User Flow
1. **App Open**: Camera ready
2. **Quick Capture**: Take Glimpse
3. **Focus Check**: See current focus feed
4. **Engage**: View Glimpses or change focus
5. **Connect**: Form Links with mutual focus

## Technical Architecture

### Why Convex over Supabase
- **Real-time subscriptions**: Perfect for instant focus changes and Link detection
- **Reactive queries**: Automatically update feeds when new Glimpses arrive
- **Optimistic updates**: Instant UI feedback for focus changes
- **Built-in file storage**: Efficient Glimpse storage and delivery
- **Serverless functions**: Handle complex Link logic without separate backend

### Data Models

```typescript
// Users
{
  _id: ID,
  username: string,
  created: timestamp,
  currentFocus: {
    type: 'user' | 'place' | 'topic',
    target: string, // username, placeId, or hashtag
    since: timestamp
  },
  subscription: 'free' | 'pro',
  trustScore: number
}

// Glimpses
{
  _id: ID,
  userId: ID,
  fileId: string, // Convex file storage
  location?: { lat: number, lng: number },
  topics: string[], // hashtags
  timestamp: timestamp,
  duration: number, // 1-2 seconds
  reported: number // flag count
}

// Links
{
  _id: ID,
  users: [ID, ID],
  formed: timestamp,
  active: boolean,
  messages: ID[] // reference to private Glimpses
}

// Focuses (for history tracking)
{
  _id: ID,
  userId: ID,
  type: 'user' | 'place' | 'topic',
  target: string,
  start: timestamp,
  end?: timestamp
}
```

## Monetization Strategy

### Tier 1: Pro Subscription ($4.99/month)
- Focus history and quick switching
- See username traces when people leave
- Nested focus (Person + Place/Topic)
- 3-second Glimpses (vs 2-second)
- Save Links beyond 24 hours
- Advanced privacy controls

### Tier 2: Business Accounts ($49/month)
- Venue/brand profiles
- Focus analytics
- Pin one welcome Glimpse
- Create time-limited Focus Events
- Verified badge
- API access for integrations

### Tier 3: Focus Events (Revenue Share)
- Brands create discoverable events
- Users opt-in to focus
- Price per active focused user
- Special badges for participants
- Post-event Glimpse compilation

## MVP Feature Set (Version 1.0)

### Must Have
- [ ] Glimpse capture and instant upload
- [ ] Three focus types (person, place, topic)
- [ ] Link formation and detection
- [ ] Private Glimpse exchange in Links
- [ ] Basic discovery (trending topics, nearby places)
- [ ] Report/block functionality
- [ ] Push notifications for Links

### Nice to Have
- [ ] Focus history (last 3)
- [ ] Trace system (basic)
- [ ] Daily focus prompt
- [ ] Share Link memories
- [ ] Web viewer for shared Glimpses

### Future Versions
- [ ] Nested focus combinations
- [ ] Focus Events platform
- [ ] Voice note Glimpses
- [ ] Collaborative Glimpse chains
- [ ] AR place markers
- [ ] Focus scheduling

## Success Metrics

### North Star Metric
**Daily Active Focusers** - Users who maintain a focus for >5 minutes/day

### Key Metrics
- Average focus duration
- Links formed per user per week
- Glimpses per active user per day
- Focus switch frequency
- User retention (D1, D7, D30)
- Link reactivation rate

### Quality Metrics
- Report rate per 1000 Glimpses
- Average upload time
- Focus switch latency
- Time to Link formation

## Risk Mitigation

### Content Moderation
- AI pre-screening before upload completion
- Progressive trust system for new users
- Community reporting with quick response
- Automated takedown after X reports
- Appeal system for false positives

### Technical Risks
- Offline queue for poor connectivity
- CDN distribution for global performance
- Rate limiting per user
- Efficient image compression
- Graceful degradation

### User Safety
- Block immediately breaks Links
- No public follower counts
- Private by default
- No location sharing in topics
- Encrypted private Glimpses

## Launch Strategy

### Phase 1: Beta (Month 1-2)
- 1000 users in single city
- Core features only
- Heavy community management
- Daily user interviews

### Phase 2: City Expansion (Month 3-4)
- 5 cities, 10K users
- Introduce Pro tier
- Local venue partnerships
- Influencer collaborations

### Phase 3: National (Month 5-6)
- Open registration
- Business accounts
- Focus Events beta
- Press campaign

## Development Timeline

### Sprint 1-2: Foundation
- React Native setup with Convex
- Basic camera and upload
- User authentication
- Core data models

### Sprint 3-4: Focus System
- Three focus types
- Real-time feed updates
- Focus switching UI
- Location services

### Sprint 5-6: Social Features
- Link detection
- Private Glimpse exchange
- Notifications
- Basic discovery

### Sprint 7-8: Polish & Safety
- Content moderation
- Reporting system
- Performance optimization
- Beta preparation

## Open Questions

1. Should we allow text in Links from day one or keep it purely visual?
2. How do we handle Glimpses at sensitive locations (hospitals, schools)?
3. Should Focus Events be exclusive to business accounts or allow user-generated events?
4. What's the right balance between ephemerality and memory?
5. How do we prevent "focus bombing" (mass focusing on someone)?

## Conclusion

Glimpse represents a fundamental shift in social media philosophy. By constraining choice and emphasizing presence, we create space for authentic connection. The technical architecture using React Native and Convex provides the real-time, reactive foundation necessary for this vision.

The path to profitability is clear through Pro subscriptions and business partnerships, while maintaining the core ethos of intentional, authentic social connection.