import { storyblokEditable } from '@storyblok/react/rsc';

import { type ImageAndTextCardSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { HeadingSm, Text } from '@/components/typography/Typography';

export function ImageAndTextCard({
  blok,
}: {
  blok: ImageAndTextCardSbContent;
}) {
  return (
    <div
      className='group flex h-full w-full max-w-sm flex-shrink-0 flex-col overflow-hidden rounded-md'
      {...storyblokEditable(blok)}
    >
      {/* Card Image */}
      {blok.image && (
        <div className='relative h-48 w-full overflow-hidden'>
          <StoryblokImage
            storyblokImage={blok.image}
            className='object-cover'
            fill
            sizes='280px'
          />
        </div>
      )}

      {/* Card Content */}
      <div className='flex flex-1 flex-col gap-4 p-6'>
        {blok.title && (
          <HeadingSm as='h3' className='text-foreground text-left'>
            {blok.title}
          </HeadingSm>
        )}
        {blok.text && (
          <Text className='text-muted-foreground'>{blok.text}</Text>
        )}
      </div>
    </div>
  );
}
