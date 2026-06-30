import {
  buildLocalizedPath,
  getAvailableLocalesForStory,
  getLanguageAlternates,
  getLanguageAlternatesForLocales,
  stripLocalePrefix,
} from '@/i18n/paths';

describe('i18n paths', () => {
  it('builds default and German paths from shared Storyblok slugs', () => {
    expect(buildLocalizedPath('home', 'en')).toBe('/');
    expect(buildLocalizedPath('home', 'de')).toBe('/de');
    expect(buildLocalizedPath('about', 'en')).toBe('/about');
    expect(buildLocalizedPath('about', 'de')).toBe('/de/about');
    expect(buildLocalizedPath('/de/about/', 'en')).toBe('/about');
  });

  it('strips locale prefixes from Storyblok slugs', () => {
    expect(stripLocalePrefix('en/articles/story')).toBe('articles/story');
    expect(stripLocalePrefix('/de/articles/story/')).toBe('articles/story');
    expect(stripLocalePrefix('/articles/story/')).toBe('articles/story');
  });

  it('builds hreflang alternates for as-needed locale prefixes', () => {
    expect(getLanguageAlternates('/about')).toEqual({
      en: '/about',
      de: '/de/about',
      'x-default': '/about',
    });
  });

  it('builds hreflang alternates only for available locales', () => {
    expect(getLanguageAlternatesForLocales('/about', ['en'])).toEqual({
      en: '/about',
      'x-default': '/about',
    });
  });

  it('uses all configured locales when Storyblok field translations have no alternates', () => {
    expect(
      getAvailableLocalesForStory(
        { alternates: [], translated_slugs: null },
        'en',
      ),
    ).toEqual(['en', 'de']);
  });

  it('derives available locales from translated slugs and published alternates', () => {
    expect(
      getAvailableLocalesForStory(
        {
          translated_slugs: [{ lang: 'de', name: null, path: 'de/about' }],
          alternates: [
            {
              id: 1,
              name: 'About',
              slug: 'about',
              published: true,
              full_slug: 'en/about',
              is_folder: false,
              parent_id: 0,
            },
            {
              id: 2,
              name: 'Draft',
              slug: 'draft',
              published: false,
              full_slug: 'fr/draft',
              is_folder: false,
              parent_id: 0,
            },
          ],
        },
        'en',
      ),
    ).toEqual(['en', 'de']);
  });
});
