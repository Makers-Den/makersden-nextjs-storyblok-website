import { storyblokEditable } from '@storyblok/react/rsc';

import { type ImageAndTextCardSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { HeadingSm, Text } from '@/components/typography/Typography';
import { Card, CardContent } from '@/components/ui/card';

export function ImageAndTextCard({
  blok,
}: {
  blok: ImageAndTextCardSbContent;
}) {
  return (
    <Card
      className='group border-border/30 bg-card/30 flex h-full w-full max-w-sm flex-shrink-0 flex-col'
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
      <CardContent className='flex flex-1 flex-col gap-4 p-6'>
        {blok.title && (
          <HeadingSm as='h3' className='text-foreground text-left'>
            {blok.title}
          </HeadingSm>
        )}
        {blok.text && (
          <Text className='text-muted-foreground'>{blok.text}</Text>
        )}
      </CardContent>
    </Card>
  );
}
