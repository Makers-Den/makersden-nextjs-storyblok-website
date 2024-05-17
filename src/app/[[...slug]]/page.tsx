import { buildGenerateStaticParams } from '@/lib/buildGenerateStaticParams';

import { getMetadata } from '../getPageProps';
import { StoryblokPage } from '../StoryblokPage';

import { type PageProps } from '@/types';

async function EnglishStoryblokPage(props: PageProps) {
  return <StoryblokPage {...props} />;
}

export default EnglishStoryblokPage;

export const generateMetadata = getMetadata;

export const generateStaticParams = buildGenerateStaticParams();
