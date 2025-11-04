Required environment variables for Vercel deployment

This project uses Convex and Clerk and needs the following environment variables in your Vercel project settings (Production and Preview as appropriate):

- NEXT_PUBLIC_CONVEX_URL
  - Example: https://wandering-akita-848.convex.cloud
  - Purpose: URL of your Convex deployment used by the browser client.

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  - Purpose: Clerk publishable key for client-side auth.

- NEXT_PUBLIC_SITE_URL
  - Example: https://puremelt.in
  - Purpose: used for metadata, sitemaps and canonical URLs.

Optional / recommended

- NEXT_PUBLIC_BRAND_NAME
  - Used in metadata and site title.

Notes

- The build previously failed because `ConvexReactClient` was constructed at module load using `process.env.NEXT_PUBLIC_CONVEX_URL`. The app now creates the Convex client lazily at runtime and will not crash during prerender if the var is missing. However, you should set `NEXT_PUBLIC_CONVEX_URL` in Vercel so runtime Convex functionality works.

- Add the Clerk publishable key to Vercel so client-side auth works in Preview and Production builds.

How to add variables in Vercel

1. Open your project in Vercel.
2. Go to Settings → Environment Variables.
3. Add the key-value pairs shown above. Set the environment scope (Production, Preview, Development) as needed.
4. Redeploy.

Troubleshooting

- If you see "No address provided to ConvexReactClient" during build or runtime, ensure `NEXT_PUBLIC_CONVEX_URL` is set correctly.
- If ESLint warnings appear during build about missing packages, run `npm install` locally and add the reported package(s) to `devDependencies`.
