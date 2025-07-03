import React from 'react';
import { ConvexProvider as ConvexClientProvider, ConvexReactClient } from 'convex/react';

// This will be replaced with your actual Convex deployment URL
const convex = new ConvexReactClient(process.env.CONVEX_URL || 'https://your-deployment.convex.cloud');

interface ConvexProviderProps {
  children: React.ReactNode;
}

export function ConvexProvider({ children }: ConvexProviderProps) {
  return (
    <ConvexClientProvider client={convex}>
      {children}
    </ConvexClientProvider>
  );
}