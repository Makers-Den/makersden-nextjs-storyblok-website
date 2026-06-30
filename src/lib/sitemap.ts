import { CANONICAL_BASE_URL_NO_SLASH } from '@/lib/constants';

import { type Locale } from '@/i18n/config';
import { buildLocalizedPath, stripLocalePrefix } from '@/i18n/paths';

const SITEMAP_EXCLUDED_SLUGS = ['home', 'not-found', 'dev-page'];

type SitemapStory = {
  full_slug: string;
  content: {
    nonIndexable?: boolean;
  };
};

export type LocalizedSitemapStories = {
  locale: Locale;
  stories: SitemapStory[];
};

export function isSitemapStoryIndexable(story: SitemapStory): boolean {
  if (story.content.nonIndexable) {
    return false;
  }

  const cleanSlug = stripLocalePrefix(story.full_slug);
  if (!cleanSlug || cleanSlug.startsWith('globals/')) {
    return false;
  }

  const lastSlugPart = cleanSlug.split('/').at(-1);
  return !(
    lastSlugPart &&
    SITEMAP_EXCLUDED_SLUGS.includes(lastSlugPart) &&
    lastSlugPart !== 'home'
  );
}

export function getSitemapEntries(
  records: LocalizedSitemapStories[],
  siteUrl = CANONICAL_BASE_URL_NO_SLASH,
) {
  const urls = new Set<string>();
  const origin = `${siteUrl.replace(/\/+$/, '')}/`;
  const lastModified = new Date().toISOString();

  records.forEach(({ locale, stories }) => {
    stories.forEach((story) => {
      if (!isSitemapStoryIndexable(story)) {
        return;
      }

      urls.add(
        new URL(buildLocalizedPath(story.full_slug, locale), origin).toString(),
      );
    });
  });

  return [...urls].map((url) => ({
    url,
    lastModified,
  }));
}
