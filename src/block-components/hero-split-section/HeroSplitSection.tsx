import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { isRichtextNotEmpty } from '@/lib/isRichtext';
import {
  renderHeadingLg,
  renderText,
  richTextToString,
} from '@/lib/richTextUtils';
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
  const titleText = blok.title ? richTextToString(blok.title) : '';
  const titleClass =
    titleText.length > 48
      ? 'text-[clamp(2.625rem,4vw,3.75rem)] leading-[0.96] tracking-normal md:leading-[0.94]'
      : 'text-[clamp(3rem,5vw,5.125rem)] leading-[0.98] tracking-normal md:leading-[0.94]';
  const title =
    blok.title && isRichtextNotEmpty(blok.title) ? blok.title : null;
  const text = blok.text && isRichtextNotEmpty(blok.text) ? blok.text : null;
  const renderedTitle = title
    ? renderHeadingLg(title, 'h1', clsxm('font-black', titleClass))
    : null;

  return (
    <section
      className='bg-brand-navy relative isolate overflow-hidden text-white'
      {...storyblokEditable(blok)}
    >
      <Container className='relative z-10'>
        <div
          className={clsxm(
            'grid min-h-[calc(100svh-var(--nav-h))] items-center gap-8 py-12 md:gap-10 md:py-16 lg:py-0',
            hasAnyRightSide
              ? 'lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]'
              : 'grid-cols-1',
          )}
        >
          {/* Left Side */}
          <div className='order-2 flex flex-col justify-center lg:order-1 lg:py-20 lg:pl-[clamp(0rem,4vw,4rem)]'>
            <AnimateOnScroll>
              <div className='flex max-w-[42rem] flex-col gap-6 text-center md:text-left'>
                {/* Title */}
                {renderedTitle && (
                  <div className='relative'>{renderedTitle}</div>
                )}

                {/* Text */}
                {text && (
                  <div className='text-muted-foreground mx-auto max-w-[38rem] md:mx-0 [&_p]:!my-0'>
                    {renderText(text)}
                  </div>
                )}

                {/* CTA Button(s) */}
                {blok.ctaLinks && blok.ctaLinks.length > 0 && (
                  <div className='flex flex-wrap justify-center gap-4 pt-1 md:justify-start'>
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
            <div className='relative order-1 flex min-h-[24rem] flex-col items-center justify-center gap-6 py-4 lg:order-2 lg:min-h-[calc(100svh-var(--nav-h))] lg:py-20'>
              {hasRightSideFill && (
                <AnimateOnScroll animationType='fadeLeft' delay={0.35}>
                  <div
                    className={clsxm(
                      'relative z-10 mx-auto flex aspect-[690/856] h-[min(30rem,70vw)] w-auto max-w-[min(34rem,84vw)] items-center justify-center lg:h-[min(62vh,34rem)] lg:max-w-[min(34rem,40vw)]',
                    )}
                  >
                    <div className='relative z-10 flex h-full w-full items-center justify-center [&_img]:!h-full [&_img]:!max-h-none [&_img]:!w-full [&_img]:!max-w-full [&_img]:rounded-xl [&_img]:object-contain [&>div]:h-full [&>div]:w-full'>
                      {blok.rightSideFill?.map((fillBlok) => (
                        <StoryblokServerComponent
                          blok={fillBlok}
                          key={fillBlok._uid}
                        />
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {hasBothRightSide && (
                <AnimateOnScroll animationType='fadeLeft' delay={0.5}>
                  <div className='relative z-20 flex flex-col gap-6 lg:aspect-auto'>
                    {blok.rightSide?.map((nestedBlok) => (
                      <div className='relative z-10' key={nestedBlok._uid}>
                        <StoryblokServerComponent blok={nestedBlok} />
                      </div>
                    ))}
                  </div>
                </AnimateOnScroll>
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
