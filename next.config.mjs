import { fileURLToPath } from 'url';
import { dirname } from 'path';

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  // Ensure Next infers the correct workspace root when multiple lockfiles exist
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/output#caveats
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true
  }
};

export default nextConfig;

// NOTE: Some hosting providers (for example Vercel Preview Deployments)
// automatically add an `X-Robots-Tag: noindex` header to preview/staging
// deployments to prevent those URLs from being indexed. That behavior is
// controlled by the hosting platform and cannot be overridden by application
// code in those environments. The block below adds an explicit X-Robots-Tag
// header only when running in production so that your production deployment
// will have a positive robots header from the app itself.
// If the 'noindex' header you saw was from a preview/staging URL, no change
// to app code will remove it — you'd need to change the hosting provider
// settings or use a production deployment.

// Add production-only header to explicitly allow indexing from the app
export async function headers() {
  if (globalThis.process?.env?.NODE_ENV !== 'production') {
    return [];
  }

  return [
    {
      // apply to all routes
      source: '/(.*)',
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'index, follow'
        }
      ]
    }
  ];
}
