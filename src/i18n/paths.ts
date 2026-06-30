import { type StoryblokStory } from '@/lib/storyblok';

import { defaultLocale, type Locale, locales } from './config';

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocalePrefix(pathOrSlug: string): string {
  const cleanPath = pathOrSlug.replace(/^\/+|\/+$/g, '');
  const [firstSegment, ...restSegments] = cleanPath.split('/').filter(Boolean);

  if (isLocale(firstSegment)) {
    return restSegments.join('/');
  }

  return cleanPath;
}

export function buildLocalizedPath(
  pathOrSlug: string,
  locale: Locale = defaultLocale,
): string {
  const cleanSlug = stripLocalePrefix(pathOrSlug);
  const path = !cleanSlug || cleanSlug === 'home' ? '/' : `/${cleanSlug}`;

  if (locale === defaultLocale) {
    return path;
  }

  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function getLanguageAlternates(pathOrSlug: string) {
  return getLanguageAlternatesForLocales(pathOrSlug, locales);
}

export function getLanguageAlternatesForLocales(
  pathOrSlug: string,
  availableLocales: readonly Locale[],
) {
  const defaultPath = buildLocalizedPath(pathOrSlug, defaultLocale);

  return {
    ...Object.fromEntries(
      availableLocales.map((locale) => [
        locale,
        buildLocalizedPath(pathOrSlug, locale),
      ]),
    ),
    'x-default': defaultPath,
  };
}

export function getAvailableLocalesForStory(
  story: Pick<StoryblokStory, 'alternates'>,
  locale: Locale,
) {
  return Array.from(
    new Set<Locale>([
      locale,
      ...(story.alternates ?? []).flatMap((alternate) => {
        if (!alternate.published) return [];

        const localePrefix = alternate.full_slug
          .replace(/^\/+|\/+$/g, '')
          .split('/')
          .find(isLocale);
        return localePrefix ? [localePrefix] : [];
      }),
    ]),
  );
}
