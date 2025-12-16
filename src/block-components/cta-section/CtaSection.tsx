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
        <AnimateOnScroll className='flex flex-col items-center gap-2'>
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
