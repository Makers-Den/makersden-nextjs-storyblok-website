import { buildGenerateStaticParams } from '@/lib/buildGenerateStaticParams';

import { StoryblokPage } from '@/app/StoryblokPage';

import { getMetadata } from '../../getPageProps';

import { type PageProps } from '@/types';

async function GermanStoryblokPage(props: PageProps) {
  return <StoryblokPage {...props} locale='de' />;
}

export default GermanStoryblokPage;

export const generateMetadata = getMetadata;

export const generateStaticParams = buildGenerateStaticParams('de');
