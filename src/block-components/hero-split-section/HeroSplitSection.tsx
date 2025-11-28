import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import { renderHeadingXl, renderText } from '@/lib/richTextUtils';
import { type HeroSplitSectionSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';

export function HeroSplitSection({
  blok,
}: {
  blok: HeroSplitSectionSbContent;
}) {
  return (
    <div
      className='relative min-h-[400px] bg-white lg:min-h-[600px]'
      {...storyblokEditable(blok)}
    >
      {/* Right Side Fill Background - desktop: at 50% viewport, mobile: full width below content */}
      {blok.rightSideFill && blok.rightSideFill.length > 0 && (
        <div className='top-0 left-0 h-[50vh] w-full lg:absolute lg:left-1/2 lg:h-full lg:w-1/2'>
          {blok.rightSideFill.map((fillBlok) => (
            <StoryblokServerComponent blok={fillBlok} key={fillBlok._uid} />
          ))}
        </div>
      )}

      {/* Main Content */}
      <Container className='relative z-10 flex min-h-[400px] flex-col items-stretch md:gap-5 lg:min-h-[600px] lg:flex-row lg:items-center'>
        {/* Left Side - Text Content */}
        <div className='flex w-full flex-col gap-6 py-12 lg:w-1/2 lg:py-16'>
          {/* Title */}
          {blok.title && renderHeadingXl(blok.title, 'h1')}

          {/* Text */}
          {blok.text && <div>{renderText(blok.text)}</div>}
        </div>

        {/* Right Side - Content Blocks (within Container) */}
        {blok.rightSide && blok.rightSide.length > 0 && (
          <div className='relative z-10 flex w-full flex-col gap-6 py-12 lg:w-1/2 lg:py-16'>
            {blok.rightSide.map((sideBlok) => (
              <StoryblokServerComponent blok={sideBlok} key={sideBlok._uid} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
