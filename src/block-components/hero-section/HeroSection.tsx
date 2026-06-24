import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
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
        className='pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(19,24,37,0.42)_0%,rgba(19,24,37,0.74)_55%,rgba(19,24,37,0.96)_100%)]'
        aria-hidden='true'
      />
      <div
        className='via-brand-green/60 pointer-events-none absolute inset-x-0 bottom-0 z-0 h-px bg-gradient-to-r from-transparent to-transparent'
        aria-hidden='true'
      />

      <Container className='relative z-10 flex flex-col items-center gap-8 py-16 text-center md:py-20 lg:gap-12 lg:py-24'>
        {/* Title */}
        {blok.title && (
          <div
            className={clsxm(
              'max-w-4xl',
              // Text shadow for readability on background
              '[text-shadow:0_4px_4px_rgba(0,0,0,0.55),0_10px_10px_rgba(0,0,0,0.25)]',
              // Typography - match Figma design
              'text-4xl leading-tight font-extralight tracking-wide text-white',
              'md:text-5xl',
              'lg:text-6xl lg:leading-none',
            )}
          >
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
