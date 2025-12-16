import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { renderHeadingLg, renderText } from '@/lib/richTextUtils';
import { type HeroSplitSectionSbContent } from '@/lib/storyblok';

import { AnimateOnScroll } from '@/components/animate-on-scroll/AnimateOnScroll';

export function HeroSplitSection({
  blok,
}: {
  blok: HeroSplitSectionSbContent;
}) {
  const hasRightSideFill = blok.rightSideFill && blok.rightSideFill.length > 0;

  return (
    <div className='bg-background' {...storyblokEditable(blok)}>
      <div
        className={clsxm(
          'mx-auto grid max-w-screen-2xl',
          hasRightSideFill && 'lg:grid-cols-2',
        )}
      >
        {/* Left Side */}
        <div className='order-2 flex flex-col justify-center px-4 py-12 sm:px-6 lg:order-1 lg:px-8 lg:py-16'>
          <AnimateOnScroll>
            <div className='flex max-w-xl flex-col gap-6'>
              {/* Title */}
              {blok.title && renderHeadingLg(blok.title, 'h1')}

              {/* Text */}
              {blok.text && (
                <div className='text-muted-foreground'>
                  {renderText(blok.text)}
                </div>
              )}

              {/* CTA Button(s) */}
              {blok.ctaLinks && blok.ctaLinks.length > 0 && (
                <div className='flex flex-wrap gap-4 pt-4'>
                  {blok.ctaLinks.map((cta) => (
                    <StoryblokServerComponent blok={cta} key={cta._uid} />
                  ))}
                </div>
              )}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Right Side */}
        {hasRightSideFill && (
          <div className='order-1 p-4 lg:order-2 lg:py-6 [&_img]:w-full [&_img]:rounded-lg'>
            <AnimateOnScroll animationType='fadeLeft' delay={0.5}>
              {blok.rightSideFill!.map((fillBlok) => (
                <StoryblokServerComponent blok={fillBlok} key={fillBlok._uid} />
              ))}
            </AnimateOnScroll>
          </div>
        )}
      </div>
    </div>
  );
}
