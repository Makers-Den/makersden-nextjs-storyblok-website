import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { renderHeadingLg } from '@/lib/richTextUtils';
import { type SplitSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';
import { SectionWrapper } from '@/components/section-wrapper/SectionWrapper';

export function SplitSection({ blok }: { blok: SplitSectionSbContent }) {
  const hasTitle = blok.title && isRichtextNotEmpty(blok.title);

  // Determine grid columns based on proportions
  const getProportionClasses = () => {
    switch (blok.proportions) {
      case '33/66':
        return 'md:grid-cols-[1fr_2fr]';
      case '66/33':
        return 'md:grid-cols-[2fr_1fr]';
      case '50/50':
      default:
        return 'md:grid-cols-2';
    }
  };

  // Determine mobile order classes
  const getMobileOrderClasses = () => {
    if (blok.mobileOrder === 'right on top') {
      return {
        left: 'order-2 md:order-none',
        right: 'order-1 md:order-none',
      };
    }
    // Default: left on top (or empty string)
    return {
      left: '',
      right: '',
    };
  };

  const mobileOrderClasses = getMobileOrderClasses();

  return (
    <SectionWrapper
      color={blok.backgroundColor}
      spacingTop={blok.spacingTop}
      spacingBottom={blok.spacingBottom}
      {...storyblokEditable(blok)}
    >
      <Container>
        <div className={clsxm(hasTitle && 'flex flex-col gap-8 md:gap-12')}>
          {/* Title */}
          {hasTitle && <div>{renderHeadingLg(blok.title!, 'h2')}</div>}

          {/* Split Grid */}
          <div
            className={clsxm(
              'grid grid-cols-1 gap-8 md:gap-12',
              getProportionClasses(),
            )}
          >
            {/* Left Column */}
            <div
              className={clsxm('flex flex-col gap-6', mobileOrderClasses.left)}
            >
              {blok.leftContent?.map((nestedBlok) => (
                <StoryblokServerComponent
                  blok={nestedBlok}
                  key={nestedBlok._uid}
                />
              ))}
            </div>

            {/* Right Column */}
            <div
              className={clsxm('flex flex-col gap-6', mobileOrderClasses.right)}
            >
              {blok.rightContent?.map((nestedBlok) => (
                <StoryblokServerComponent
                  blok={nestedBlok}
                  key={nestedBlok._uid}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
