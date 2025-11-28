import { generateBreadcrumbList } from '@/lib/jsonLd/generateBreadcrumbList';
import { type StoryblokStory } from '@/lib/storyblok/sbInternalTypes';

import { type Locale } from '@/i18n/config';

type BreadcrumbListSchemaProps = {
  story: StoryblokStory;
  locale: Locale;
};

/**
 * BreadcrumbList JSON-LD schema component.
 * Generates breadcrumb navigation structured data for SEO.
 *
 * @see https://schema.org/BreadcrumbList
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
export function BreadcrumbListSchema({
  story,
  locale,
}: BreadcrumbListSchemaProps) {
  const schema = generateBreadcrumbList(story, locale);

  // Don't render anything if no breadcrumbs (e.g., homepage)
  if (!schema) {
    return null;
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
