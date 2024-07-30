import { type Metadata } from 'next';
import { RedirectType } from 'next/dist/client/components/redirect';
import { draftMode } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { buildOgImageUrl } from '@/lib/buildOgImageUrl';
import { CANONICAL_BASE_URL_NO_SLASH } from '@/lib/constants';
import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { richtextToString } from '@/lib/richTextUtils';
import {
  type GlobalSettingsSbContent,
  type PageSbContent,
  type StoryblokStory,
} from '@/lib/storyblok';
import {
  findStory,
  RESOLVED_RELATIONS,
} from '@/lib/storyblok/storyblokRepository';

import { type PageProps, type StoryContent } from '@/types';

export const getPageProps = async (
  args: {
    slug: string;
    locale: string | undefined;
  } & Record<string, string | undefined>
) => {
  const { slug: slugArgs, locale } = args;

  const isPreview = draftMode().isEnabled;
  const slugAsStr = slugArgs;

  // "/home" as a path should only work within Storyblok
  if (slugAsStr === 'home' && !isPreview) {
    return {
      notFound: true,
    };
  }

  // Default to 'home' for globals and empty slug
  const slug: string =
    !slugAsStr || slugAsStr.startsWith('globals') ? 'home' : slugAsStr;

  let globalSettingsStory: StoryblokStory<GlobalSettingsSbContent> | undefined =
    undefined;

  try {
    const globalSettingsResponseData = await findStory<
      StoryblokStory<GlobalSettingsSbContent>
    >({
      slug: 'globals/settings',
      isPreview,
      resolveLinks: 'url',
    });

    globalSettingsStory = globalSettingsResponseData?.story;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Unable to load global from Storyblok', err);
  }

  if (!globalSettingsStory) {
    throw new Error('Unable to load global settings');
  }

  // Look for Content manager defined redirects
  const redirectItems = globalSettingsStory.content.redirects ?? [];
  const redirectItem = redirectItems.find((item) => item.from === slug);

  try {
    const pageData = await findStory<StoryblokStory<PageSbContent>>({
      slug,
      locale,
      isPreview,
      resolveRelations: RESOLVED_RELATIONS,
    });

    if (!pageData?.story) {
      throw new Error(`No data or data didn't contain story for ${slug}`);
    }

    const pageStory = pageData.story;

    return {
      globalSettingsStory: globalSettingsStory,
      story: pageStory,
      preview: !!isPreview,
      locale,
    };
  } catch (err) {
    // No story exists for this slug
    if ((err as { status?: number })?.status === 404) {
      if (redirectItem) {
        // this non-existent slug has a redirect setup
        redirect(
          redirectItem.to ?? '',
          redirectItem.isPermanent ? RedirectType.replace : RedirectType.push
        );
      } else {
        notFound();
      }
    }

    throw err;
  }
};

const defaultMeta = {
  title: "Makers' Den - Your ReactJS Agency for Web & Apps in Berlin.",
  siteName: "Makers' Den",
  description:
    "Makers' Den is your ReactJS Development Agency for Web & Apps. Talk to us about Frontend or Full-stack ReactJS, React Native Mobile Apps and Fast Headless CMS based Websites.",
  /** Without additional '/' on the end */
  url: CANONICAL_BASE_URL_NO_SLASH,
  type: 'website',
  robots: 'follow, index',
} as const;

export const getMetadata = async ({
  params,
}: Omit<PageProps, 'searchParams'>): Promise<Metadata> => {
  const pathname = params.slug?.length ? '/' + params?.slug?.join('/') : '';
  const pageProps = await getPageProps({
    slug: pathname,
    locale: params.locale,
  });

  const { globalSettingsStory, story } = pageProps;

  if (!story || !globalSettingsStory) {
    return {};
  }

  const {
    title: contentTitle,
    description: contentDescription,
    ogImage: image,
    illustration,
    nonIndexable,
    component,
    name,
    intro,
  }: StoryContent = story.content;

  const ogImage = buildOgImageUrl({
    title: contentTitle,
    image: image?.filename,
    illustration: illustration?.filename
      ? illustration.filename
      : globalSettingsStory.content.illustration?.filename,
  });

  let title = contentTitle ?? defaultMeta.title;

  if (component === 'Category') {
    title = `Latest ${name} posts`;
  }

  if (!title.includes("Makers' Den")) {
    title = `${title} - Makers' Den`;
  }

  let description = contentDescription ?? defaultMeta.description;

  if (component === 'Post' && isRichtextNotEmpty(intro)) {
    description = richtextToString(intro);
  }

  const ogType = 'article';
  return {
    title,
    description,
    robots: nonIndexable ? 'noindex' : 'follow, follow',
    openGraph: {
      title,
      images: ogImage,
      siteName: defaultMeta.siteName,
      description,
      url: `${defaultMeta.url}${pathname}`,
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@makersden',
      title: title,
      description,
      images: ogImage,
    },
    alternates: {
      canonical: `${defaultMeta.url}${pathname}`,
    },
  };
};
