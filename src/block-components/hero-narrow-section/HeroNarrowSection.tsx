import { storyblokEditable } from '@storyblok/react/rsc';

import { type HeroNarrowSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import { Heading2Xl } from '@/components/typography/Typography';

export function HeroNarrowSection({
  blok,
}: {
  blok: HeroNarrowSectionSbContent;
}) {
  return (
    <section
      className='relative flex min-h-[180px] items-center justify-center bg-black py-14 text-white'
      {...storyblokEditable(blok)}
    >
      {/* Content Container */}
      <Container className='flex flex-col items-center text-center'>
        {/* Title */}
        {blok.title && (
          <div className='max-w-4xl'>
            <Heading2Xl as='h1'>{blok.title}</Heading2Xl>
          </div>
        )}
      </Container>
    </section>
  );
}
