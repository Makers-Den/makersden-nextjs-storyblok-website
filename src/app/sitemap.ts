import { type MetadataRoute } from 'next';

import { getSitemapEntries, type LocalizedSitemapStories } from '@/lib/sitemap';
import { type PageSbContent, type StoryblokStory } from '@/lib/storyblok';
import {
  ALL_PAGE_TYPES,
  findStories,
} from '@/lib/storyblok/storyblokRepository';

import { type Locale, locales } from '@/i18n/config';

const fetchStoriesForSitemap = async (
  locale: Locale,
  contentType: (typeof ALL_PAGE_TYPES)[number],
) => {
  const stories: StoryblokStory<PageSbContent>[] = [];
  let page = 1;
  let total = 0;

  do {
    const result = await findStories<StoryblokStory<PageSbContent>>({
      contentType,
      locale,
      perPage: 100,
      page,
    });

    stories.push(...result.stories);
    total = result.total;
    page += 1;
  } while (stories.length < total);

  return { locale, stories };
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const storyResults = await Promise.all(
    locales.flatMap((locale: Locale) =>
      ALL_PAGE_TYPES.map((contentType) =>
        fetchStoriesForSitemap(locale, contentType),
      ),
    ),
  );

  return getSitemapEntries(storyResults as LocalizedSitemapStories[]);
};

export default sitemap;
