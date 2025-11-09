import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Matchers
const isAccountRoot = createRouteMatcher(['/account']);
const isAuthPages = createRouteMatcher(['/account/login', '/account/register']);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    // req.nextUrl is immutable; clone it before mutating.
    const url = req.nextUrl.clone();

    // If not signed in and trying to access /account, redirect to /account/login
    if (!userId && isAccountRoot(req)) {
        url.pathname = '/account/login';
        return NextResponse.redirect(url);
    }

    // If signed in and trying to access /account/login or /account/register, redirect to /account
    if (userId && isAuthPages(req)) {
        url.pathname = '/account';
        return NextResponse.redirect(url);
    }
});

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
