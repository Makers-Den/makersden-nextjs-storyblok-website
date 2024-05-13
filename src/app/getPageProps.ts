import { Metadata } from 'next';
import { RedirectType } from 'next/dist/client/components/redirect';
import { notFound, redirect } from 'next/navigation';

import { buildOgImageUrl } from '@/lib/buildOgImageUrl';
import { CANONICAL_BASE_URL_NO_SLASH } from '@/lib/constants';
import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { createNamedLoggerFromFilename } from '@/lib/log';
import { richtextToString } from '@/lib/richTextUtils';
import {
  GlobalSettingsSbContent,
  PageSbContent,
  StoryblokStory,
} from '@/lib/storyblok';
import {
  findStory,
  RESOLVED_RELATIONS,
} from '@/lib/storyblok/storyblokRepository';

import { PageProps, StoryContent } from '@/types';

const log = createNamedLoggerFromFilename(__filename);

/**
 * Props passed to our CMS backed page.
 * Returned from `getStaticProps`
 */

export const postsOverviewPath = {
  article: 'articles',
  video: 'videos',
  'case-study': 'case-studies',
};

export const getPageProps = async (
  args: {
    slug: string;
  } & Record<string, string>
) => {
  const { slug: slugArgs, locale } = args;

  const isPreview = true;
  const slugAsStr = slugArgs;

  // "/home" as a path should only work within Storyblok
  if (slugAsStr === 'home' && !isPreview) {
    return {
      notFound: true,
    };
  }

  // If no slug we assume home
  let slug = slugAsStr || 'home';
  if (slug === 'global-settings' || slug.startsWith('globals')) {
    slug = 'home';
  }

  let globalStory: StoryblokStory<GlobalSettingsSbContent> | undefined =
    undefined;

  try {
    const globalData = await findStory<StoryblokStory<GlobalSettingsSbContent>>(
      {
        slug: 'global-settings',
        isPreview,
      }
    );

    if (!globalData || !globalData.story) {
      throw new Error('No global data received from repo');
    }

    globalStory = globalData.story;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Unable to load global from Storyblok', err);
  }

  if (!globalStory) {
    throw new Error('Unable to load global settings');
  }

  // Look for Content manager defined redirects
  const redirectItems = globalStory.content.redirects || [];
  const redirectItem = redirectItems.find((item) => item.from === slug);

  try {
    const pageData = await findStory<StoryblokStory<PageSbContent>>({
      slug,
      locale,
      isPreview,
      resolveRelations: RESOLVED_RELATIONS,
    });

    if (!pageData || !pageData.story) {
      throw new Error(`No data or data didn't contain story for ${slug}`);
    }

    const pageStory = pageData.story;

    return {
      globalSettingsStory: globalStory,
      story: pageStory,
      preview: !!isPreview,
      locale,
    };
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const httpErr = err as any;

    // No story exists for this slug
    if (httpErr?.status === 404) {
      if (redirectItem) {
        // this non-existant slug has a redirect setup
        redirect(
          redirectItem.to ?? '',
          redirectItem.isPermanent ? RedirectType.replace : RedirectType.push
        );
      } else {
        notFound();
      }
    }

    const statusText = httpErr?.response?.statusText as string;
    log.error(
      `Unexpected error during StoryblokPage generation for slug ${slug}: ${JSON.stringify(
        err
      )}, ${statusText}`,
      err
    );

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
  const data = await getPageProps({ slug: pathname });

  const { globalSettingsStory, story } = data;

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
