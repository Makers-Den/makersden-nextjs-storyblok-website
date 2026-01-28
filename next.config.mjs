import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com', // Allow images from all domains
      },
    ],
  },
  async headers() {
    return [
      {
        // API routes - no caching
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // All pages - ISR-aligned cache control
        // Using CDN-Cache-Control and Vercel-CDN-Cache-Control for maximum compatibility
        // s-maxage matches revalidate (300s) so CDN respects ISR timing
        // stale-while-revalidate = 5x s-maxage (1500s) for high hit rates during regeneration
        source: '/:path*',
        headers: [
          {
            key: 'CDN-Cache-Control',
            value:
              'public, max-age=300, s-maxage=300, stale-while-revalidate=1500',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 's-maxage=300, stale-while-revalidate=1500',
          },
          {
            key: 'Cache-Control',
            value: 's-maxage=300, stale-while-revalidate=1500',
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
