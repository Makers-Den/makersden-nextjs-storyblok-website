import {
  buildLocalizedPath,
  getLanguageAlternates,
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
});
