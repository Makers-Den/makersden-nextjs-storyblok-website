import { storyblokEditable } from '@storyblok/react/rsc';

import { type TeaserSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';

export function Teaser({ blok }: { blok: TeaserSbContent }) {
  return (
    <Container className='mb.10' {...storyblokEditable(blok)}>
      <h2 className='mb-10 text-2xl'>{blok.headline}</h2>
    </Container>
  );
}
