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
      className='border-line bg-card flex w-auto max-w-[280px] flex-shrink-0 flex-col gap-[15px] overflow-hidden rounded-lg border-[1.5px]'
      {...storyblokEditable(blok)}
    >
      {/* Card Image */}
      {blok.image && (
        <div className='relative h-[177px] w-full overflow-hidden rounded-t-lg'>
          <StoryblokImage
            storyblokImage={blok.image}
            className='object-cover'
            fill
            sizes='280px'
          />
        </div>
      )}

      {/* Card Content */}
      <div className='flex flex-col gap-[6px] px-[25px] pb-[15px]'>
        {blok.title && (
          <HeadingSm as='h3' className='text-foreground text-center'>
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
