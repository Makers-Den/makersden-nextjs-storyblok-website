import { CANONICAL_BASE_URL_NO_SLASH } from '@/lib/constants';
import { type StoryblokStory } from '@/lib/storyblok/sbInternalTypes';

import { defaultLocale, type Locale, locales } from '@/i18n/config';

/**
 * Converts a slug segment into a human-readable name.
 * Examples:
 * - "about-us" → "About Us"
 */
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

type BreadcrumbListItem = {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
};

type BreadcrumbListSchema = {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbListItem[];
} | null;

/**
 * Generates a BreadcrumbList JSON-LD schema from a Storyblok story.
 *
 * @param story - The Storyblok story object
 * @param locale - The current locale
 * @returns BreadcrumbList schema or null if homepage
 *
 * @example
 * // For a story with full_slug "en/about/team"
 * generateBreadcrumbList(story, 'en')
 * // Returns breadcrumbs: Home → About → Team
 */
export function generateBreadcrumbList(
  story: StoryblokStory,
  locale: Locale,
): BreadcrumbListSchema {
  // Don't show breadcrumbs on homepage
  if (story.is_startpage) {
    return null;
  }

  const localePath = locale === defaultLocale ? '' : `/${locale as Locale}`;

  const { full_slug } = story;

  // Remove locale prefix from full_slug if present
  let pathWithoutLocale = full_slug;
  for (const loc of locales) {
    if (full_slug.startsWith(`${loc}/`)) {
      pathWithoutLocale = full_slug.slice(loc.length + 1);
      break;
    }
  }

  // Split into segments, filter out empty strings
  const segments = pathWithoutLocale.split('/').filter((s) => s.length > 0);

  // If no segments (homepage), return null
  if (segments.length === 0) {
    return null;
  }

  // Build breadcrumb items
  const items: BreadcrumbListItem[] = [];

  // Always start with Home
  items.push({
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: `${CANONICAL_BASE_URL_NO_SLASH}/${localePath}`,
  });

  // Add intermediate segments
  let currentPath = `${CANONICAL_BASE_URL_NO_SLASH}/${localePath}`;
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: slugToName(segment),
      // Don't include 'item' for the last breadcrumb (current page)
      ...(isLast ? {} : { item: currentPath }),
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
