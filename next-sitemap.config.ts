import { env } from '@/env';

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;
/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [`${SITE_URL}/server-sitemap.xml`],
  },
  sitemapSize: 7000,
};
