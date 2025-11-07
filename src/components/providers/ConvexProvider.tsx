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

  // Check Clerk publishable key. If it's not set during build, avoid
  // rendering ClerkProvider (it throws during prerender) — just render
  // children so the build won't fail. In production set
  // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in Vercel environment variables.
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as
    | string
    | undefined;

  if (!clerkKey) {
    // No Clerk key available — avoid initializing Clerk during build.
    return <>{children}</>;
  }

  // If Convex is missing but Clerk is present, render Clerk only so auth
  // stays available client-side while skipping Convex at build time.
  if (!convex) {
    return <ClerkProvider publishableKey={clerkKey}>{children}</ClerkProvider>;
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
