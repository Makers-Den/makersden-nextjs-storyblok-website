import { type PageSbContent, type StoryblokStory } from '@/lib/storyblok';
import { findStories } from '@/lib/storyblok/storyblokRepository';

import { type Locale, locales } from '@/i18n/config';

/**
 * This should return all the paths that are generated during build time.
 * For a server side rendered site, also for ISG, everything will work even if
 * this doesn't return anything.
 *
 * If you have a SSG setup, all of the pages will have to be returned here.
 *
 * I assume it's a good idea to at least have the highest traffic
 * pages generated during build time. E.g. all regular "Page" content and maybe 6 latest blog posts.
 *
 *
 * @param locale Leave undefined if you want the default locale
 */
export const generateStaticParams = async () => {
  // Note, will only work for up to the 100 first stories,
  // if you have 100+ of a page type you'll have to implement paging
  const [pagesResult] = await Promise.all([
    findStories<StoryblokStory<PageSbContent>>({
      contentType: 'Page',
      perPage: 100,
    }),
  ]);

  const paths: Array<{ slug: string[]; locale: Locale }> = [];

  for (const story of pagesResult.stories) {
    const slug = story.full_slug.split('/');

    for (const locale of locales) {
      if (slug.length === 1 && slug[0] === 'home') {
        paths.push({ slug: [], locale });
        continue;
      }

      paths.push({ slug, locale });
    }
  }

  return paths;
};
