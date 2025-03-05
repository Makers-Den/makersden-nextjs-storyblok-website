import { defaultLocale } from 'i18n.config';
import { notFound } from 'next/navigation';

import { CommonContextProviders } from '@/components/common-context-providers/CommonContextProviders';
import { GenericStoryblokComponent } from '@/components/generic-storyblok-component/GenericStoryblokComponent';
import { Layout } from '@/components/layout/Layout';

import { getPageProps } from './getPageProps';

import { type PageProps } from '@/types';

export async function StoryblokPage({
  params,
  searchParams: searchParamsPromise,
}: PageProps) {
  const { slug, locale } = await params;
  const searchParams = await searchParamsPromise;
  const pathname = slug?.length ? '/' + slug?.join('/') : '';

  const data = await getPageProps({
    ...searchParams,
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
        <GenericStoryblokComponent
          blok={data.story.content}
          translations={translations}
        />
      </Layout>
    </CommonContextProviders>
  );
}
