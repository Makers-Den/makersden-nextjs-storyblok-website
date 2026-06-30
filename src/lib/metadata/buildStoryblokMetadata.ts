import { type Metadata } from 'next';

import {
  BRAND_NAME,
  BRAND_TITLE_SUFFIX,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/brand';
import { buildOgImageUrl } from '@/lib/buildOgImageUrl';
import { CANONICAL_BASE_URL_NO_SLASH } from '@/lib/constants';
import {
  type ArticleSbContent,
  type GlobalSettingsSbContent,
  type PageSbContent,
  type SbRichtext,
} from '@/lib/storyblok';

import { defaultLocale, type Locale } from '@/i18n/config';

const defaultMeta = {
  title: SITE_NAME,
  siteName: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: CANONICAL_BASE_URL_NO_SLASH,
  robots: 'follow, index',
} as const;

type StoryblokMetadataContent = PageSbContent | ArticleSbContent;

type BuildStoryblokMetadataArgs = {
  availableLocales: Locale[];
  canonicalPath: string;
  content: StoryblokMetadataContent;
  globalSettings: GlobalSettingsSbContent;
  languages: Record<string, string>;
  locale?: Locale;
};

function richTextToPlainText(richText: SbRichtext | undefined): string {
  return (
    richText?.content
      ?.flatMap(
        (node) =>
          node.content?.map((child) => child.text).filter(Boolean) ?? [],
      )
      .join(' ')
      .trim() ?? ''
  );
}

function formatTitle(title: string): string {
  if (title.includes(BRAND_NAME)) return title;

  return `${title}${BRAND_TITLE_SUFFIX}`;
}

function getContentTitle(content: StoryblokMetadataContent): string {
  return formatTitle(content.title ?? defaultMeta.title);
}

function getContentDescription(content: StoryblokMetadataContent): string {
  if (content.component === 'Page' && content.description) {
    return content.description;
  }

  if (content.component === 'Article') {
    const intro = richTextToPlainText(content.intro);

    if (intro) return intro;
  }

  return defaultMeta.description;
}

function getContentOgImage(
  content: StoryblokMetadataContent,
  globalSettings: GlobalSettingsSbContent,
): string {
  if (content.component === 'Page') {
    return buildOgImageUrl({
      title: content.title ?? defaultMeta.title,
      image: content.ogImage?.filename,
      illustration:
        content.illustration?.filename ?? globalSettings.illustration?.filename,
    });
  }

  return buildOgImageUrl({
    title: content.title,
    image: content.image?.filename,
    illustration: globalSettings.illustration?.filename,
  });
}

export function buildStoryblokMetadata({
  availableLocales,
  canonicalPath,
  content,
  globalSettings,
  languages,
  locale,
}: BuildStoryblokMetadataArgs): Metadata {
  const currentLocale = locale ?? defaultLocale;
  const title = getContentTitle(content);
  const description = getContentDescription(content);
  const ogImage = getContentOgImage(content, globalSettings);
  const openGraphType = content.component === 'Article' ? 'article' : 'website';
  const nonIndexable = content.component === 'Page' && content.nonIndexable;

  return {
    metadataBase: new URL(defaultMeta.url),
    title,
    description,
    robots: nonIndexable ? 'noindex, nofollow' : defaultMeta.robots,
    openGraph: {
      title,
      images: ogImage,
      siteName: defaultMeta.siteName,
      description,
      url: `${defaultMeta.url}${canonicalPath}`,
      type: openGraphType,
      locale: currentLocale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: availableLocales
        .filter((availableLocale) => availableLocale !== currentLocale)
        .map((availableLocale) =>
          availableLocale === 'de' ? 'de_DE' : 'en_US',
        ),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@makersden',
      title,
      description,
      images: ogImage,
    },
    alternates: {
      canonical: canonicalPath,
      languages,
    },
  };
}
