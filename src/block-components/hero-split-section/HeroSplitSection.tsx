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

const heroGridLabels = [
  { label: 'Apps', className: 'left-[72%] top-[18%]' },
  { label: 'AI', className: 'left-[72%] top-[34%]' },
  { label: 'TS/React', className: 'left-[57%] top-[50%]' },
  { label: 'Backends', className: 'left-[42%] top-[66%]' },
  { label: 'Frontends', className: 'left-[27%] top-[66%]' },
] as const;

function HeroGridDecorations() {
  return (
    <div className='pointer-events-none absolute inset-0 hidden lg:block'>
      {heroGridLabels.map((item) => (
        <div
          key={item.label}
          className={clsxm(
            'border-brand-green/25 absolute h-[clamp(7rem,10vw,10.5rem)] w-[clamp(7rem,10vw,10.5rem)] border-t border-r text-right',
            item.className,
          )}
        >
          <span className='text-brand-green/80 block p-5 pt-2 font-mono text-xs font-medium uppercase'>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

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
      className='border-brand-green/10 bg-brand-navy relative isolate overflow-hidden border-b text-white'
      {...storyblokEditable(blok)}
    >
      <div
        className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_28%,rgba(115,19,235,0.16),transparent_24rem),radial-gradient(circle_at_72%_18%,rgba(109,218,132,0.12),transparent_28rem)]'
        aria-hidden='true'
      />
      <div
        className='bg-brand-green/35 pointer-events-none absolute inset-x-0 bottom-0 h-px'
        aria-hidden='true'
      />
      <HeroGridDecorations />

      <Container className='relative z-10'>
        <div
          className={clsxm(
            'grid min-h-[calc(100svh-var(--nav-h))] items-center gap-10 py-12 md:py-16 lg:py-0',
            hasAnyRightSide
              ? 'lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]'
              : 'grid-cols-1',
          )}
        >
          {/* Left Side */}
          <div className='order-2 flex flex-col justify-center lg:order-1 lg:py-20 lg:pl-[clamp(0rem,4vw,4rem)]'>
            <AnimateOnScroll>
              <div className='flex max-w-[42rem] flex-col gap-7 text-center md:text-left'>
                {/* Title */}
                {renderedTitle && (
                  <div className='relative'>
                    <div
                      className='bg-brand-green mx-auto mb-7 h-px w-20 md:mx-0'
                      aria-hidden='true'
                    />
                    {renderedTitle}
                  </div>
                )}

                {/* Text */}
                {text && (
                  <div className='text-muted-foreground mx-auto max-w-[38rem] md:mx-0'>
                    {renderText(text)}
                  </div>
                )}

                {/* CTA Button(s) */}
                {blok.ctaLinks && blok.ctaLinks.length > 0 && (
                  <div className='flex flex-wrap justify-center gap-4 pt-2 md:justify-start'>
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
                      'relative z-10 mx-auto flex aspect-[690/856] w-full max-w-[min(32rem,84vw)] items-center justify-center lg:max-w-[min(38rem,42vw)]',
                      '[&_img]:h-auto [&_img]:max-h-[min(66vh,38rem)] [&_img]:w-full [&_img]:rounded-xl [&_img]:object-contain',
                    )}
                  >
                    <div
                      className='bg-brand-green/10 absolute inset-[12%] rounded-full blur-3xl'
                      aria-hidden='true'
                    />
                    <div className='relative z-10 flex h-full w-full items-center justify-center'>
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
