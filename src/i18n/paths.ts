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
  const defaultPath = buildLocalizedPath(pathOrSlug, defaultLocale);

  return {
    en: defaultPath,
    de: buildLocalizedPath(pathOrSlug, 'de'),
    'x-default': defaultPath,
  };
}
