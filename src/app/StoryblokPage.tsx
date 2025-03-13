import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

import { CommonContextProviders } from '@/components/common-context-providers/CommonContextProviders';
import { Layout } from '@/components/layout/Layout';

import { defaultLocale } from '@/i18n/config';

import { getPageProps } from './getPageProps';

import { type PageProps } from '@/types';

export async function StoryblokPage({ params }: PageProps) {
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
      <Layout
        locale={locale ?? defaultLocale}
        globalSettings={globalSettingsStory}
      >
        <StoryblokStory story={data.story} translations={translations} />
      </Layout>
    </CommonContextProviders>
  );
}
