import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import { renderHeading2Xl } from '@/lib/richTextUtils';
import { type HeroSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import { StoryblokImage } from '@/components/images/StoryblokImage';

export function HeroSection({ blok }: { blok: HeroSectionSbContent }) {
  return (
    <section
      className='bg-brand-navy relative mt-[calc(-1*var(--nav-h))] flex h-[95vh] min-h-[700px] items-center justify-center overflow-hidden pt-[calc(var(--nav-h)+100px)] pb-[calc(var(--nav-h))] text-white'
      {...storyblokEditable(blok)}
    >
      {/* Background Image */}
      {blok.backgroundImage && (
        <div className='absolute inset-0 z-0'>
          <StoryblokImage
            storyblokImage={blok.backgroundImage}
            fill
            className='object-cover'
            priority
            sizes='100vw'
          />
        </div>
      )}
      <div
        className='bg-brand-navy/80 pointer-events-none absolute inset-0 z-0'
        aria-hidden='true'
      />

      <Container className='relative z-10 flex flex-col items-center gap-8 py-16 text-center md:py-20 lg:gap-12 lg:py-24'>
        {/* Title */}
        {blok.title && (
          <div className='max-w-4xl text-white'>
            {renderHeading2Xl(blok.title)}
          </div>
        )}

        {/* CTA Links */}
        {blok.ctaLinks && blok.ctaLinks.length > 0 && (
          <div className='flex flex-wrap items-center justify-center gap-4 md:gap-5'>
            {blok.ctaLinks.map((ctaBlok) => (
              <StoryblokServerComponent blok={ctaBlok} key={ctaBlok._uid} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
