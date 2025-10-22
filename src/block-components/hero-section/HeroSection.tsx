import { storyblokEditable } from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { renderHeadingLg } from '@/lib/richTextUtils';
import { type HeroSectionSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';

export function HeroSection({ blok }: { blok: HeroSectionSbContent }) {
  return (
    <section
      className='relative flex min-h-[400px] items-center justify-center overflow-hidden md:min-h-[500px] lg:min-h-[600px]'
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

      {/* Content Container */}
      <div className='relative z-10 flex w-full flex-col items-center gap-8 px-4 py-16 text-center md:px-6 md:py-20 lg:gap-12 lg:py-24'>
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
            {renderHeadingLg(blok.title)}
          </div>
        )}

        {/* CTA Links */}
        {blok.ctaLinks && blok.ctaLinks.length > 0 && (
          <div className='flex flex-wrap items-center justify-center gap-4 md:gap-5'>
            {blok.ctaLinks.map((linkItem) => (
              <StoryblokLink
                link={linkItem.link}
                key={linkItem._uid}
                className={clsxm(
                  // Background color from Figma design (#F1B254)
                  'bg-[#F1B254]',
                  // Padding and spacing
                  'px-10 py-5',
                  // Border radius
                  'rounded-[10px]',
                  // Typography - match Figma design
                  'text-xl font-medium tracking-wide',
                  // Text color from Figma design (#212849)
                  'text-[#212849]',
                  // Hover effects
                  'transition-all duration-200',
                  'hover:bg-[#e5a649]',
                  'hover:shadow-lg',
                  // Responsive
                  'md:text-[20px]',
                )}
              >
                {linkItem.name}
              </StoryblokLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
