import { storyblokEditable } from '@storyblok/react/rsc';

import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { renderText } from '@/lib/richTextUtils';
import {
  type ArticleSbContent,
  type CategorySbContent,
  type StoryblokStory,
} from '@/lib/storyblok';
import { isStoryblokStory } from '@/lib/typeGuards';

import { AnimateOnScroll } from '@/components/animate-on-scroll/AnimateOnScroll';
import { Container } from '@/components/container/Container';
import { StoryblokImage } from '@/components/images/StoryblokImage';
import { HeadingLg, Text } from '@/components/typography/Typography';
import { Badge } from '@/components/ui/badge';

import { type PageComponentProps } from '@/types';

export default function ArticlePage({
  blok,
  locale,
}: PageComponentProps<ArticleSbContent>) {
  const category =
    blok.categories && blok.categories.length > 0
      ? (blok.categories[0] as StoryblokStory<CategorySbContent>)
      : null;

  return (
    <main {...storyblokEditable(blok)}>
      {/* Hero Section with Overlaid Content */}
      <section className='relative'>
        {/* Hero Image */}
        {blok.image && (
          <AnimateOnScroll
            delay={0}
            duration={1.2}
            className='relative h-[500px] w-full md:h-[600px] lg:h-[700px]'
          >
            <StoryblokImage
              storyblokImage={blok.image}
              fill
              className='object-cover'
              sizes='100vw'
              priority
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-black/50' />
          </AnimateOnScroll>
        )}

        {/* Overlaid Content */}
        <div className='absolute inset-0 flex flex-col justify-end'>
          <Container className='pb-12 md:pb-16'>
            {/* Category Badge & Date */}
            <AnimateOnScroll delay={0.1} duration={0.6}>
              <div className='mb-4 flex items-center gap-3'>
                {category && isStoryblokStory(category) && (
                  <Badge className='border-transparent bg-white/20 py-1 text-white backdrop-blur-sm'>
                    {category.content.name}
                  </Badge>
                )}

                {blok.date && (
                  <time dateTime={blok.date} className='text-sm text-white/80'>
                    {new Date(blok.date).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </AnimateOnScroll>

            {/* Title */}
            <AnimateOnScroll delay={0.2} duration={0.6}>
              <HeadingLg className='mb-4 text-white'>{blok.title}</HeadingLg>
            </AnimateOnScroll>

            {/* Subtitle/Intro */}
            {blok.intro && isRichtextNotEmpty(blok.intro) && (
              <AnimateOnScroll delay={0.3} duration={0.6}>
                <div className='prose prose-lg mb-8 max-w-3xl text-white/90'>
                  {renderText(blok.intro)}
                </div>
              </AnimateOnScroll>
            )}

            {/* Author Section */}
            {isStoryblokStory(blok.author) && (
              <AnimateOnScroll delay={0.4} duration={0.6}>
                <div className='flex items-center gap-3'>
                  {/* Author Avatar */}
                  {blok.author.content.image && (
                    <div className='relative size-9 shrink-0 overflow-hidden rounded-full'>
                      <StoryblokImage
                        storyblokImage={blok.author.content.image}
                        fill
                        className='object-cover'
                        sizes='36px'
                      />
                    </div>
                  )}

                  {/* Author Name */}
                  <Text className='text-base font-medium text-white md:text-lg'>
                    {blok.author.content.name}
                  </Text>
                </div>
              </AnimateOnScroll>
            )}
          </Container>
        </div>
      </section>

      {/* Article Content */}
      <section className='py-8 md:py-12'>
        <Container>
          <AnimateOnScroll delay={0.2} duration={0.8}>
            <div className='mx-auto max-w-3xl'>
              {blok.content && isRichtextNotEmpty(blok.content) && (
                <div className='prose prose-lg max-w-none [&>*:first-child]:mt-4'>
                  {renderText(blok.content)}
                </div>
              )}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </main>
  );
}
