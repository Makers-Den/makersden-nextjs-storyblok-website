import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { renderHeadingLg } from '@/lib/richTextUtils';
import {
  type Colors,
  type GridSectionSbContent,
  type Opacity,
} from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import { SectionWrapper } from '@/components/section-wrapper/SectionWrapper';

// Map responsiveColumns enum to static Tailwind grid classes
function getGridClasses(responsiveColumns?: string): string {
  switch (responsiveColumns) {
    case '4/2/1':
      return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4';
    case '3/2/1':
      return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
    case '2/2/1':
      return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2';
    default:
      // Default: 4 columns on desktop, 2 on tablet, 1 on mobile
      return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4';
  }
}

export type CardStyleProps = {
  backgroundColor?: Colors;
  backgroundOpacity?: Opacity;
  width?: '' | 'auto' | 'stretchToFill';
};

export function GridSection({ blok }: { blok: GridSectionSbContent }) {
  const gridClasses = getGridClasses(blok.responsiveColumns);

  return (
    <SectionWrapper
      color={blok.backgroundColor}
      spacingTop={blok.spacingTop}
      spacingBottom={blok.spacingBottom}
      {...storyblokEditable(blok)}
    >
      <Container className='flex flex-col items-center gap-12'>
        {/* Section Title */}
        {blok.title && (
          <div className='text-center'>{renderHeadingLg(blok.title, 'h2')}</div>
        )}

        {/* Cards Grid */}
        {blok.cards && blok.cards.length > 0 && (
          <div
            className={clsxm(
              gridClasses,
              'w-full justify-items-center gap-6 md:gap-8',
            )}
          >
            {blok.cards.map((card) => (
              <StoryblokServerComponent
                blok={card}
                key={card._uid}
                backgroundColor={blok.cardBackgroundColor}
                backgroundOpacity={blok.cardBackgroundOpacity}
                width={blok.cardWidth}
              />
            ))}
          </div>
        )}
      </Container>
    </SectionWrapper>
  );
}
