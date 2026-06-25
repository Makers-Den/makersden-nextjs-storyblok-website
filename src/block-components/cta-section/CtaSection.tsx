import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { renderHeadingLg, renderText } from '@/lib/richTextUtils';
import { type CtaSectionSbContent } from '@/lib/storyblok';

import { AnimateOnScroll } from '@/components/animate-on-scroll/AnimateOnScroll';
import { Container } from '@/components/container/Container';
import { SectionWrapper } from '@/components/section-wrapper/SectionWrapper';

export function CtaSection({ blok }: { blok: CtaSectionSbContent }) {
  return (
    <SectionWrapper
      color={blok.backgroundColor}
      spacingTop={blok.spacingTop}
      spacingBottom={blok.spacingBottom}
      {...storyblokEditable(blok)}
    >
      <Container className='text-center'>
        <AnimateOnScroll className='mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 py-14 md:px-12 md:py-[4.5rem]'>
          {/* Title */}
          {blok.title && isRichtextNotEmpty(blok.title) && (
            <div className='max-w-4xl'>{renderHeadingLg(blok.title, 'h2')}</div>
          )}

          {/* Description */}
          {blok.text && isRichtextNotEmpty(blok.text) && (
            <div className='max-w-xl text-current/70'>
              {renderText(blok.text)}
            </div>
          )}

          {/* CTA Button(s) */}
          {blok.ctaLink && blok.ctaLink.length > 0 && (
            <div className='flex flex-wrap items-center justify-center gap-4 pt-2 md:gap-5'>
              {blok.ctaLink.map((cta) => (
                <StoryblokServerComponent blok={cta} key={cta._uid} />
              ))}
            </div>
          )}
        </AnimateOnScroll>
      </Container>
    </SectionWrapper>
  );
}
