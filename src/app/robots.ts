import { type MetadataRoute } from 'next';

import { CANONICAL_BASE_URL_NO_SLASH } from '@/lib/constants';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  host: CANONICAL_BASE_URL_NO_SLASH,
  sitemap: `${CANONICAL_BASE_URL_NO_SLASH}/sitemap.xml`,
});

export default robots;
