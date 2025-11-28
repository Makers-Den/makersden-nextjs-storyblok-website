import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

import { RESOLVED_RELATIONS } from '@/lib/storyblok/storyblokRepository';

import { CommonContextProviders } from '@/components/common-context-providers/CommonContextProviders';
import { BreadcrumbListSchema } from '@/components/json-ld/BreadcrumbListSchema';
import { Layout } from '@/components/layout/Layout';

import { defaultLocale } from '@/i18n/config';

import { getPageProps } from './getPageProps';

import { type PageProps } from '@/types';

type LayoutType = 'default' | 'leadPage';
type NavType = 'white' | 'black' | 'transparent';

export async function StoryblokPage({ params, searchParams }: PageProps) {
  const { slug, locale } = await params;
  const pathname = slug?.length ? '/' + slug?.join('/') : '';

  const data = await getPageProps({
    slug: pathname,
    locale,
  });

  const { globalSettingsStory, translations, story } = data;

  if (!story || !globalSettingsStory) {
    notFound();
  }

  return (
    <CommonContextProviders>
      <BreadcrumbListSchema story={story} locale={locale ?? defaultLocale} />
      <Layout
        locale={locale ?? defaultLocale}
        globalSettings={globalSettingsStory}
        layoutType={(story.content.layoutType || 'default') as LayoutType}
        navType={(story.content.navType || 'white') as NavType}
      >
        <StoryblokStory
          bridgeOptions={{ resolveRelations: RESOLVED_RELATIONS }}
          story={data.story}
          translations={translations}
          searchParams={searchParams}
        />
      </Layout>
    </CommonContextProviders>
  );
}
