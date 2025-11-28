import { CANONICAL_BASE_URL_NO_SLASH } from '@/lib/constants';

/**
 * Organization and WebSite JSON-LD schemas for the site.
 * These appear on every page and provide foundational structured data.
 *
 * @see https://schema.org/Organization
 * @see https://schema.org/WebSite
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${CANONICAL_BASE_URL_NO_SLASH}/#organization`,
        name: 'Acme Industries',
        url: CANONICAL_BASE_URL_NO_SLASH,
        // TODO: Add logo URL once available
        // logo: `${CANONICAL_BASE_URL_NO_SLASH}/logo.png`,
        description:
          'Leading publisher of peer-reviewed medical and health research journals',
        // TODO: Add social media profiles
        // sameAs: [
        //   'https://twitter.com/acme',
        //   'https://linkedin.com/company/acme',
        //   'https://facebook.com/acme',
        // ],
        // TODO: Add contact information
        // contactPoint: {
        //   '@type': 'ContactPoint',
        //   contactType: 'support',
        //   email: 'support@acme.com',
        // },
      },
      {
        '@type': 'WebSite',
        '@id': `${CANONICAL_BASE_URL_NO_SLASH}/#website`,
        name: 'Acme Industries',
        url: CANONICAL_BASE_URL_NO_SLASH,
        publisher: {
          '@id': `${CANONICAL_BASE_URL_NO_SLASH}/#organization`,
        },
        // TODO: Add SearchAction if search functionality is implemented
        // potentialAction: {
        //   '@type': 'SearchAction',
        //   target: `${CANONICAL_BASE_URL_NO_SLASH}/search?q={search_term_string}`,
        //   'query-input': 'required name=search_term_string',
        // },
      },
    ],
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
