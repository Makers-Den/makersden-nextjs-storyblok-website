import { generateStaticParams as _generateStaticParams } from '@/app/generateStaticParams';
import { StoryblokPage } from '@/app/StoryblokPage';

import { getMetadata } from '../../getPageProps';

import { type PageProps } from '@/types';

async function LocaleStoryblokPage(props: PageProps) {
  return <StoryblokPage {...props} />;
}

export default LocaleStoryblokPage;

export const generateMetadata = getMetadata;

export const generateStaticParams = _generateStaticParams;

export const dynamicParams = true;
export const revalidate = 300; // 5 minutes
