import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define your protected and public routes
const PROTECTED_ROUTES = ['/account'];
const PUBLIC_ROUTES = ['/', '/about', '/contact', '/product', '/recipes', '/buy-now'];

const RedirectDestination = {
    SIGN_IN: '/sign-in',
    ACCOUNT: '/account',
};

const isPublicRoute = createRouteMatcher(PUBLIC_ROUTES);
const isProtectedRoute = createRouteMatcher(PROTECTED_ROUTES);

export default clerkMiddleware(async (auth, request) => {
    try {
        const { userId } = await auth();

        // Allow public routes to proceed without authentication
        if (isPublicRoute(request)) {
            return NextResponse.next();
        }

        // Redirect unauthenticated users to the sign-in page for protected routes
        if (!userId && isProtectedRoute(request)) {
            return NextResponse.redirect(new URL(RedirectDestination.SIGN_IN, request.url));
        }

        // If authenticated and accessing /account, allow
        if (userId && isProtectedRoute(request)) {
            return NextResponse.next();
        }

        return NextResponse.next();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Middleware error:', error);
        return new Response('An unexpected error occurred. Please try again later.', { status: 500 });
    }
});

export const config = {
    matcher: [
        // Apply middleware to all routes except static files and Next.js internals
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
        '/(api|trpc)(.*)'
    ]
};
