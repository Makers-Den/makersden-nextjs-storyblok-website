import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { renderHeadingLg, renderText } from '@/lib/richTextUtils';
import { type HeroSplitSectionSbContent } from '@/lib/storyblok';

import { AnimateOnScroll } from '@/components/animate-on-scroll/AnimateOnScroll';
import { Container } from '@/components/container/Container';

export function HeroSplitSection({
  blok,
}: {
  blok: HeroSplitSectionSbContent;
}) {
  const hasRightSideFill = (blok.rightSideFill?.length ?? 0) > 0;
  const hasRightSide = (blok.rightSide?.length ?? 0) > 0;
  const hasAnyRightSide = hasRightSideFill || hasRightSide;
  const hasBothRightSide = hasRightSideFill && hasRightSide;
  return (
    <section
      className='bg-background relative overflow-hidden'
      {...storyblokEditable(blok)}
    >
      {/* Full-bleed (right side fill) block for large screens */}
      {hasRightSideFill && (
        <div className='pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-[1920px] -translate-x-1/2 lg:block'>
          <div className='ml-auto h-full w-1/2'>
            <AnimateOnScroll animationType='fadeLeft' delay={0.5}>
              <div className='h-full w-full [&_img]:h-full [&_img]:w-full [&_img]:rounded-none [&_img]:object-cover'>
                {blok.rightSideFill?.map((fillBlok) => (
                  <StoryblokServerComponent
                    blok={fillBlok}
                    key={fillBlok._uid}
                  />
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      )}

      <Container className='relative z-10'>
        <div
          className={clsxm(
            'grid',
            hasAnyRightSide ? 'lg:grid-cols-2' : 'grid-cols-1',
          )}
        >
          {/* Left Side */}
          <div className='order-2 flex flex-col justify-center py-12 lg:order-1 lg:py-16'>
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
          {hasAnyRightSide && (
            <div className='relative order-1 flex flex-col items-center justify-center gap-6 py-6 lg:order-2 lg:py-16'>
              {hasBothRightSide && (
                <AnimateOnScroll animationType='fadeLeft' delay={0.5}>
                  <div className='relative z-10 flex flex-col gap-6 lg:aspect-auto'>
                    {/* Mobile right-side fill content */}
                    <div className='absolute inset-0 lg:hidden'>
                      {blok.rightSideFill?.map((fillBlok) => (
                        <StoryblokServerComponent
                          blok={fillBlok}
                          key={fillBlok._uid}
                        />
                      ))}
                    </div>

                    {/* Desktop right-side content */}
                    {blok.rightSide?.map((nestedBlok) => (
                      <div className='relative z-10'>
                        <StoryblokServerComponent
                          blok={nestedBlok}
                          key={nestedBlok._uid}
                        />
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
              )}
              {hasRightSideFill && !hasRightSide && (
                <div className='relative z-10 flex flex-col gap-6 lg:hidden'>
                  {blok.rightSideFill?.map((fillBlok) => (
                    <StoryblokServerComponent
                      blok={fillBlok}
                      key={fillBlok._uid}
                    />
                  ))}
                </div>
              )}
              {hasRightSide && !hasRightSideFill && (
                <div className='relative z-10 flex flex-col gap-6'>
                  {blok.rightSide?.map((nestedBlok) => (
                    <StoryblokServerComponent
                      blok={nestedBlok}
                      key={nestedBlok._uid}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
