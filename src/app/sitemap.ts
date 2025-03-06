import { type MetadataRoute } from 'next';

import { CANONICAL_BASE_URL_NO_SLASH } from '@/lib/constants';
import {
  findAllPageStories,
  SITEMAP_EXCLUDED_SLUGS,
} from '@/lib/storyblok/storyblokRepository';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // TODO: this should take locales into account
  const allPageStories = await findAllPageStories();
  const indexableStories = allPageStories
    .flatMap((item) => item.stories)
    .filter((story) => !story.content.nonIndexable);

  const sitemapSlugs = indexableStories
    .map((story) => story.full_slug)
    .filter((slug) => {
      const split = slug.split('/');
      const lastSlugPart = split[split.length - 1];
      return !SITEMAP_EXCLUDED_SLUGS.includes(lastSlugPart);
    });

  const sitemapFields = sitemapSlugs.map((sitemapSlug) => {
    const slug = sitemapSlug.endsWith('/')
      ? sitemapSlug.slice(0, -1)
      : sitemapSlug;

    return {
      url: `${CANONICAL_BASE_URL_NO_SLASH}/${slug}`,
      lastModified: new Date().toISOString(),
    };
  });

  // Add home page index manually
  sitemapFields.push({
    url: `${CANONICAL_BASE_URL_NO_SLASH}/`,
    lastModified: new Date().toISOString(),
  });

  return sitemapFields;
};

export default sitemap;
