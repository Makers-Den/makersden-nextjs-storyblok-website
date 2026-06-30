import { getSitemapEntries } from '@/lib/sitemap';

describe('localized sitemap entries', () => {
  it('emits default and German URLs for shared slugs', () => {
    const entries = getSitemapEntries(
      [
        {
          locale: 'en',
          stories: [
            { full_slug: 'home', content: {} },
            { full_slug: 'about', content: {} },
          ],
        },
        {
          locale: 'de',
          stories: [
            { full_slug: 'home', content: {} },
            { full_slug: 'about', content: {} },
          ],
        },
      ],
      'https://template.example/',
    );

    expect(entries.map((entry) => entry.url)).toEqual([
      'https://template.example/',
      'https://template.example/about',
      'https://template.example/de',
      'https://template.example/de/about',
    ]);
  });

  it('filters globals, noindex stories, and editor-only slugs', () => {
    const entries = getSitemapEntries(
      [
        {
          locale: 'en',
          stories: [
            { full_slug: 'globals/settings', content: {} },
            { full_slug: 'private', content: { nonIndexable: true } },
            { full_slug: 'not-found', content: {} },
            { full_slug: 'articles/hello', content: {} },
          ],
        },
      ],
      'https://template.example',
    );

    expect(entries.map((entry) => entry.url)).toEqual([
      'https://template.example/articles/hello',
    ]);
  });
});
