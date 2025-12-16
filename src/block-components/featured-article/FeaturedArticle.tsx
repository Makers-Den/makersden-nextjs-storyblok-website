import { storyblokEditable } from '@storyblok/react/rsc';
import { ArrowRightIcon } from 'lucide-react';

import clsxm from '@/lib/clsxm';
import { isRichtextNotEmpty } from '@/lib/isRichtext';
import { richTextToString } from '@/lib/richTextUtils';
import {
  type ArticleSbContent,
  type FeaturedArticleSbContent,
  type StoryblokStory,
} from '@/lib/storyblok';
import { isStoryblokStory } from '@/lib/typeGuards';

import { Container } from '@/components/container/Container';
import { StoryblokImage } from '@/components/images/StoryblokImage';
import { SectionWrapper } from '@/components/section-wrapper/SectionWrapper';
import { HeadingMd, Text } from '@/components/typography/Typography';
import { Badge } from '@/components/ui/badge';

import { Link } from '@/i18n/navigation';

export function FeaturedArticle({ blok }: { blok: FeaturedArticleSbContent }) {
  // Validate that the featured article relation is resolved
  if (blok.featuredArticle && !isStoryblokStory(blok.featuredArticle)) {
    throw new Error(
      'FeaturedArticle: Featured article is not a story. You likely forgot to resolve the relations.',
    );
  }

  const article = blok.featuredArticle as StoryblokStory<ArticleSbContent>;

  // Get description from intro rich text
  const description =
    article.content.intro && isRichtextNotEmpty(article.content.intro)
      ? richTextToString(article.content.intro)
      : undefined;

  return (
    <SectionWrapper
      color={blok.backgroundColor}
      spacingTop={blok.spacingTop}
      spacingBottom={blok.spacingBottom}
      {...storyblokEditable(blok)}
    >
      <Container>
        <div className='bg-muted flex flex-col items-center gap-8 rounded-4xl p-5 lg:flex-row lg:gap-12 lg:p-14'>
          {/* Image */}
          <div
            className={clsxm(
              'relative h-[400px] w-full overflow-hidden rounded-4xl',
              'lg:h-[500px] lg:w-1/2',
            )}
          >
            {article.content.image ? (
              <StoryblokImage
                priority
                className='object-cover'
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                storyblokImage={article.content.image}
              />
            ) : (
              <div className='bg-muted flex h-full w-full items-center justify-center'>
                <Text className='text-muted-foreground'>No image</Text>
              </div>
            )}
          </div>

          {/* Content */}
          <div className='flex w-full flex-col justify-center lg:w-1/2'>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              {/* Category Badge */}
              {article.content.categories &&
                article.content.categories.length > 0 && (
                  <Badge className='mb-6'>
                    {isStoryblokStory(article.content.categories[0])
                      ? article.content.categories[0].content.name
                      : 'Article'}
                  </Badge>
                )}

              {/* Title */}
              <HeadingMd className='text-foreground mb-6'>
                {article.content.title}
              </HeadingMd>

              {/* Description */}
              {description && (
                <Text className='text-muted-foreground mb-8'>
                  {description}
                </Text>
              )}

              {/* Read More Button */}
              <Link
                href={`/${article.full_slug}`}
                className={clsxm(
                  'bg-primary text-primary-foreground',
                  'inline-flex items-center gap-2 rounded-md px-6 py-3',
                  'font-medium transition-opacity hover:opacity-90',
                )}
              >
                Read More
                <ArrowRightIcon className='h-5 w-5' />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
