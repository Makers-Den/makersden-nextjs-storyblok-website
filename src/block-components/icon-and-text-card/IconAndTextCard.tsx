import { storyblokEditable } from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { type IconAndTextCardSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { HeadingSm, Text } from '@/components/typography/Typography';
import { Card } from '@/components/ui/card';

export function IconAndTextCard({
  blok,
  isNested,
}: {
  blok: IconAndTextCardSbContent;
  isNested?: boolean;
}) {
  return (
    <Card
      className={clsxm(
        'flex h-full w-full max-w-sm flex-col items-start text-left',
        isNested
          ? 'gap-4 border-0 bg-transparent'
          : 'border-border/30 bg-card/30 gap-5 p-6',
      )}
      {...storyblokEditable(blok)}
    >
      {/* Icon */}
      {blok.icon && (
        <div
          className={clsxm(
            'relative flex shrink-0 items-center justify-center',
            isNested ? 'size-12' : 'size-14 rounded-sm p-3',
          )}
        >
          <StoryblokImage
            storyblokImage={blok.icon}
            fill
            className='object-contain'
          />
        </div>
      )}

      {/* Title */}
      {blok.title && (
        <div
          className={clsxm(
            'flex',
            isNested ? 'min-h-[60px]' : 'min-h-[4rem] items-start',
          )}
        >
          <HeadingSm as='h3' className='text-foreground text-left'>
            {blok.title}
          </HeadingSm>
        </div>
      )}

      {/* Text */}
      {blok.text && (
        <Text className={clsxm('text-muted-foreground w-full text-left')}>
          {blok.text}
        </Text>
      )}
    </Card>
  );
}
