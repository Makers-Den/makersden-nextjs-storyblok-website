const SITE_URL = process.env.SITE_URL || 'https://makersden.io';
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
