import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { generateStaticParams as _generateStaticParams } from '@/app/generateStaticParams';
import { StoryblokPage } from '@/app/StoryblokPage';
import { routing } from '@/i18n/routing';

import { getMetadata } from '../../getPageProps';

import { type PageProps } from '@/types';

async function LocaleStoryblokPage(props: PageProps) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <StoryblokPage {...props} />;
}

export default LocaleStoryblokPage;

export const generateMetadata = getMetadata;

export const generateStaticParams = _generateStaticParams;

export const dynamicParams = true;
export const revalidate = 300; // 5 minutes
