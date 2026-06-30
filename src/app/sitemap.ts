import { type MetadataRoute } from 'next';

import { getSitemapEntries, type LocalizedSitemapStories } from '@/lib/sitemap';
import {
  ALL_PAGE_TYPES,
  findStories,
} from '@/lib/storyblok/storyblokRepository';

import { type Locale, locales } from '@/i18n/config';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const storyResults = await Promise.all(
    locales.flatMap((locale: Locale) =>
      ALL_PAGE_TYPES.map((contentType) =>
        findStories({
          contentType,
          locale,
          perPage: 100,
        }).then(({ stories }) => ({ locale, stories })),
      ),
    ),
  );

  return getSitemapEntries(storyResults as LocalizedSitemapStories[]);
};

export default sitemap;
