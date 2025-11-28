import { storyblokEditable } from '@storyblok/react/rsc';

import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { renderHeadingLg } from '@/lib/richTextUtils';
import { type LogosSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import { StoryblokImage } from '@/components/images/StoryblokImage';
import { SectionWrapper } from '@/components/section-wrapper/SectionWrapper';

export function LogosSection({ blok }: { blok: LogosSectionSbContent }) {
  const hasTitle = blok.title && isRichtextNotEmpty(blok.title);
  const hasLogos = blok.logos && blok.logos.length > 0;

  if (!hasTitle && !hasLogos) {
    return null;
  }

  return (
    <SectionWrapper
      color={blok.backgroundColor}
      spacingTop={blok.spacingTop}
      spacingBottom={blok.spacingBottom}
      {...storyblokEditable(blok)}
    >
      <Container className='py-12 md:py-16'>
        <div className='flex flex-col items-center gap-8 md:gap-12'>
          {/* Title */}
          {hasTitle && (
            <div className='text-center'>
              {renderHeadingLg(blok.title!, 'h2')}
            </div>
          )}

          {/* Logos - Scrollable horizontal layout */}
          {hasLogos && (
            <div className='relative w-full'>
              {/* Left fade gradient */}
              <div
                className='pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent md:w-24'
                aria-hidden='true'
              />

              {/* Right fade gradient */}
              <div
                className='pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent md:w-24'
                aria-hidden='true'
              />

              {/* Scrollable logos container */}
              <div className='scrollbar-hide overflow-x-auto'>
                <div className='flex items-center justify-start gap-8 px-8 py-4 md:justify-center md:gap-12 md:px-12'>
                  {blok.logos!.map((logo) => (
                    <div
                      key={logo.id}
                      className='relative h-16 w-32 flex-shrink-0 grayscale transition-all hover:grayscale-0 md:h-20 md:w-40'
                    >
                      <StoryblokImage
                        storyblokImage={logo}
                        className='object-contain'
                        fill
                        sizes='(max-width: 768px) 128px, 160px'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  );
}
