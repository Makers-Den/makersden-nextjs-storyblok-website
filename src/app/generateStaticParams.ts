import { type Locale, locales } from 'i18n.config';

import { type PageSbContent, type StoryblokStory } from '@/lib/storyblok';
import { findStories } from '@/lib/storyblok/storyblokRepository';

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
