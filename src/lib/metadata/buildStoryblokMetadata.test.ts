import {
  type ArticleSbContent,
  type GlobalSettingsSbContent,
  type PageSbContent,
  type SbAsset,
  type SbRichtext,
} from '@/lib/storyblok';

import { type Locale } from '@/i18n/config';

import { buildStoryblokMetadata } from './buildStoryblokMetadata';

const asset = (filename: string): SbAsset => ({
  alt: '',
  copyright: '',
  filename,
  id: 1,
  name: filename,
});

const globalSettings = (illustration?: string): GlobalSettingsSbContent => ({
  _uid: 'settings',
  component: 'GlobalSettings',
  illustration: illustration ? asset(illustration) : undefined,
});

const baseArgs = {
  availableLocales: ['en', 'de'] as Locale[],
  canonicalPath: '/services',
  languages: {
    en: '/services',
    de: '/de/services',
    'x-default': '/services',
  },
  locale: 'en' as const,
};

describe('buildStoryblokMetadata', () => {
  it('builds Page metadata from Storyblok SEO fields', () => {
    const content: PageSbContent = {
      _uid: 'page',
      component: 'Page',
      title: 'Services',
      description: 'Reusable service page sections.',
    };

    const metadata = buildStoryblokMetadata({
      ...baseArgs,
      content,
      globalSettings: globalSettings(),
    });

    expect(metadata.title).toBe('Services - Makers Den');
    expect(metadata.description).toBe('Reusable service page sections.');
    expect(metadata.robots).toBe('follow, index');
    expect(metadata.openGraph).toMatchObject({
      description: 'Reusable service page sections.',
      title: 'Services - Makers Den',
      type: 'website',
      url: 'https://example.com/services',
    });
    expect(metadata.alternates).toEqual({
      canonical: '/services',
      languages: baseArgs.languages,
    });
  });

  it('sets noindex and direct OG images for Page content', () => {
    const content: PageSbContent = {
      _uid: 'page',
      component: 'Page',
      title: 'Landing',
      nonIndexable: true,
      ogImage: asset('https://a.storyblok.com/f/1/1200x630/direct.png'),
      illustration: asset(
        'https://a.storyblok.com/f/1/600x600/page-illustration.png',
      ),
    };

    const metadata = buildStoryblokMetadata({
      ...baseArgs,
      content,
      globalSettings: globalSettings(
        'https://a.storyblok.com/f/1/600x600/global-illustration.png',
      ),
    });

    expect(metadata.robots).toBe('noindex, nofollow');
    expect(metadata.openGraph?.images).toBe(
      'https://a.storyblok.com/f/1/1200x630/direct.png',
    );
    expect(metadata.twitter?.images).toBe(
      'https://a.storyblok.com/f/1/1200x630/direct.png',
    );
  });

  it('uses Page illustration before global illustration for generated OG images', () => {
    const content: PageSbContent = {
      _uid: 'page',
      component: 'Page',
      title: 'About',
      illustration: asset(
        'https://a.storyblok.com/f/1/600x600/page-illustration.png',
      ),
    };

    const metadata = buildStoryblokMetadata({
      ...baseArgs,
      content,
      globalSettings: globalSettings(
        'https://a.storyblok.com/f/1/600x600/global-illustration.png',
      ),
    });

    expect(metadata.openGraph?.images).toContain('/api/og?title=About');
    expect(metadata.openGraph?.images).toContain('page-illustration.png');
  });

  it('builds Article metadata with article OG type and intro description', () => {
    const intro: SbRichtext = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Article intro copy.' }],
        },
      ],
    };
    const content: ArticleSbContent = {
      _uid: 'article',
      author: 'author-id',
      component: 'Article',
      date: '2026-06-30',
      image: asset('https://a.storyblok.com/f/1/1200x630/article.png'),
      intro,
      title: 'Article title',
    };

    const metadata = buildStoryblokMetadata({
      ...baseArgs,
      content,
      globalSettings: globalSettings(),
    });

    expect(metadata.description).toBe('Article intro copy.');
    expect(metadata.openGraph).toMatchObject({
      images: 'https://a.storyblok.com/f/1/1200x630/article.png',
      title: 'Article title - Makers Den',
      type: 'article',
    });
  });
});
