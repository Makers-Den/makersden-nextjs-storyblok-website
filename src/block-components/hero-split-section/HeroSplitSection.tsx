import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';
import { NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';

import clsxm from '@/lib/clsxm';
import { renderText, richTextToString } from '@/lib/richTextUtils';
import { type HeroSplitSectionSbContent } from '@/lib/storyblok';

import { AnimateOnScroll } from '@/components/animate-on-scroll/AnimateOnScroll';
import { Container } from '@/components/container/Container';
import { HeadingLg } from '@/components/typography/Typography';

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
  const renderedTitle = blok.title
    ? renderText(blok.title, {
        nodeResolvers: {
          [NODE_PARAGRAPH]: (children) => (
            <HeadingLg as='h1' className={clsxm('my-0 font-black', titleClass)}>
              {children}
            </HeadingLg>
          ),
        },
      })
    : null;

  return (
    <section
      className='border-brand-green/10 bg-brand-navy relative overflow-hidden border-b text-white'
      {...storyblokEditable(blok)}
    >
      {/* Full-bleed (right side fill) block for large screens */}
      {hasRightSideFill && (
        <div className='pointer-events-none absolute inset-y-0 left-[52%] hidden w-[48%] lg:block'>
          <div className='border-brand-green/15 h-full w-full border-l'>
            <AnimateOnScroll animationType='fadeLeft' delay={0.5}>
              <div className='flex h-full w-full items-center justify-center px-[clamp(2rem,5vw,6rem)] py-[clamp(3rem,8vh,8rem)] [&_img]:h-auto [&_img]:max-h-[min(62vh,38rem)] [&_img]:w-auto [&_img]:max-w-[min(84%,46rem)] [&_img]:rounded-none [&_img]:object-contain'>
                {blok.rightSideFill?.map((fillBlok) => (
                  <StoryblokServerComponent
                    blok={fillBlok}
                    key={fillBlok._uid}
                  />
                ))}
              </div>
            </AnimateOnScroll>
            <div
              className='absolute inset-0 bg-[linear-gradient(90deg,rgba(19,24,37,0.28)_0%,rgba(19,24,37,0.02)_36%,rgba(19,24,37,0)_100%)]'
              aria-hidden='true'
            />
          </div>
        </div>
      )}
      <div
        className='pointer-events-none absolute top-0 left-0 h-full w-1/2 bg-[radial-gradient(circle_at_12%_24%,rgba(115,19,235,0.16),transparent_24rem)]'
        aria-hidden='true'
      />
      <div
        className='bg-brand-green/35 pointer-events-none absolute inset-x-0 bottom-0 h-px'
        aria-hidden='true'
      />

      <Container className='relative z-10'>
        <div
          className={clsxm(
            'grid',
            hasAnyRightSide
              ? 'lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]'
              : 'grid-cols-1',
          )}
        >
          {/* Left Side */}
          <div className='order-2 flex min-h-[calc(100svh-var(--nav-h))] flex-col justify-center py-14 lg:order-1 lg:py-20'>
            <AnimateOnScroll>
              <div className='flex max-w-[44rem] flex-col gap-7'>
                {/* Title */}
                {renderedTitle && (
                  <div className='relative'>
                    <div
                      className='bg-brand-green mb-7 h-px w-20'
                      aria-hidden='true'
                    />
                    {renderedTitle}
                  </div>
                )}

                {/* Text */}
                {blok.text && (
                  <div className='text-muted-foreground max-w-[38rem]'>
                    {renderText(blok.text)}
                  </div>
                )}

                {/* CTA Button(s) */}
                {blok.ctaLinks && blok.ctaLinks.length > 0 && (
                  <div className='flex flex-wrap gap-4 pt-2'>
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
            <div className='relative order-1 flex flex-col items-center justify-center gap-6 py-6 lg:order-2 lg:min-h-[calc(100svh-var(--nav-h))] lg:py-20'>
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
                <div className='relative z-10 flex flex-col items-center justify-center gap-6 lg:hidden [&_img]:h-auto [&_img]:max-h-[22rem] [&_img]:w-auto [&_img]:max-w-full [&_img]:object-contain'>
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
