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
        <AnimateOnScroll className='border-brand-green/15 bg-panel/60 mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-lg border px-5 py-12 shadow-[0_24px_80px_rgba(10,14,26,0.18)] md:px-10 md:py-16'>
          {/* Title */}
          {blok.title && isRichtextNotEmpty(blok.title) && (
            <div className='max-w-4xl'>{renderHeadingLg(blok.title, 'h2')}</div>
          )}

          {/* Description */}
          {blok.text && isRichtextNotEmpty(blok.text) && (
            <div className='text-muted-foreground max-w-xl'>
              {renderText(blok.text)}
            </div>
          )}

          {/* CTA Button(s) */}
          {blok.ctaLink && blok.ctaLink.length > 0 && (
            <div className='flex items-center gap-5'>
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
