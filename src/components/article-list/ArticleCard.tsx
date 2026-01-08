import { ArrowRightIcon } from 'lucide-react';

import clsxm from '@/lib/clsxm';
import {
  type ArticleSbContent,
  type CategorySbContent,
  type StoryblokStory,
} from '@/lib/storyblok';
import { isStoryblokStory } from '@/lib/typeGuards';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { HeadingSm, Text } from '@/components/typography/Typography';
import { Badge } from '@/components/ui/badge';

import { Link } from '@/i18n/navigation';

interface ArticleCardProps {
  article: StoryblokStory<ArticleSbContent & { intro?: string }>;
  isOnlyItem?: boolean;
}

export function ArticleCard({ article, isOnlyItem }: ArticleCardProps) {
  const category =
    article.content.categories && article.content.categories.length > 0
      ? (article.content.categories[0] as StoryblokStory<CategorySbContent>)
      : null;

  return (
    <article
      className={clsxm(
        'group bg-card flex flex-col overflow-hidden rounded-lg shadow-lg transition-shadow',
        isOnlyItem && 'lg:flex-row',
      )}
    >
      {/* Image with Category Badge */}
      <div
        className={clsxm(
          'relative overflow-hidden',
          isOnlyItem ? 'h-64 lg:h-auto lg:w-1/2' : 'h-64',
        )}
      >
        {article.content.image ? (
          <StoryblokImage
            storyblokImage={article.content.image}
            fill
            className='object-cover transition-transform'
            sizes={
              isOnlyItem
                ? '(max-width: 1024px) 100vw, 50vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
          />
        ) : (
          <div className='bg-muted flex h-full w-full items-center justify-center'>
            <Text className='text-muted-foreground'>No image</Text>
          </div>
        )}

        {/* Category Badge */}
        {category && isStoryblokStory(category) && (
          <div className='absolute top-4 right-4'>
            <Badge>{category.content.name}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={clsxm(
          'flex flex-1 flex-col px-8 py-10 md:px-10',
          isOnlyItem && 'lg:w-1/2 lg:px-16 lg:py-16',
        )}
      >
        {/* Title */}
        <HeadingSm className='mb-8'>{article.content.title}</HeadingSm>

        {/* Divider */}
        <div className='bg-border mb-10 h-px' />

        {/* Description */}
        {article.content.intro && (
          <Text className='text-muted-foreground mb-10 line-clamp-3 leading-relaxed'>
            {article.content.intro}
          </Text>
        )}

        {/* Read More Link */}
        <Link
          href={`/${article.full_slug}`}
          className='mt-auto inline-flex items-center gap-2 font-medium hover:underline'
        >
          Read More
          <ArrowRightIcon className='h-5 w-5' />
        </Link>
      </div>
    </article>
  );
}
