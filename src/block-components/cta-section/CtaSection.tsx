import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { renderHeadingLg, renderText } from '@/lib/richTextUtils';
import { type CtaSectionSbContent } from '@/lib/storyblok';

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
      <Container className='flex flex-col items-center gap-6'>
        {/* Title */}
        {blok.title && isRichtextNotEmpty(blok.title) && (
          <div className='text-center'>{renderHeadingLg(blok.title, 'h2')}</div>
        )}

        {/* Description Text */}
        {blok.text && isRichtextNotEmpty(blok.text) && (
          <div className='max-w-[488px] text-center'>
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
      </Container>
    </SectionWrapper>
  );
}
