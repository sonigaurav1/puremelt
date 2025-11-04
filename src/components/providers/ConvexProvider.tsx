// features/auth/providers/ConvexProvider.tsx
'use client';

import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { ReactNode, useMemo } from 'react';
// import { EdgeStoreProvider } from '@/lib/edgestore';

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // Create the Convex client lazily on the client to avoid build-time
  // errors when NEXT_PUBLIC_CONVEX_URL isn't available (e.g., during
  // Vercel build where env vars must be set in project settings).
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string | undefined;

  const convex = useMemo(() => {
    if (!convexUrl) return null;
    return new ConvexReactClient(convexUrl);
    // convexUrl is static at runtime, so empty deps are fine; include for clarity
  }, [convexUrl]);

  // If the Convex URL isn't present (common during build), fall back to
  // rendering children inside ClerkProvider only so prerendering doesn't fail.
  // In production you should set NEXT_PUBLIC_CONVEX_URL in Vercel project settings.
  if (!convex) {
    return (
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      >
        {children}
      </ClerkProvider>
    );
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
