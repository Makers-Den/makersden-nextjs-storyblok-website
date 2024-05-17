import { StoryblokComponent } from '@storyblok/react/rsc';
import { defaultLocale } from 'i18n.config';
import { notFound } from 'next/navigation';

import { CommonContextProviders } from '@/components/common-context-providers/CommonContextProviders';
import { Layout } from '@/components/layout/Layout';

import { getPageProps } from './getPageProps';

import { type PageProps } from '@/types';

export async function StoryblokPage({ params, searchParams }: PageProps) {
  const locale = params.locale;
  const pathname = params?.slug?.length ? '/' + params?.slug?.join('/') : '';

  const data = await getPageProps({
    ...searchParams,
    slug: pathname,
    locale,
  });

  const { globalSettingsStory, story } = data;

  if (!story || !globalSettingsStory) {
    notFound();
  }

  return (
    <CommonContextProviders>
      <Layout
        locale={locale ?? defaultLocale}
        globalSettings={globalSettingsStory}
      >
        <StoryblokComponent blok={data.story.content} />
      </Layout>
    </CommonContextProviders>
  );
}
