import { storyblokEditable } from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { type IconAndTextCardSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { HeadingSm, Text } from '@/components/typography/Typography';

export function IconAndTextCard({
  blok,
  isNested,
}: {
  blok: IconAndTextCardSbContent;
  isNested?: boolean;
}) {
  return (
    <div
      className={clsxm(
        'flex w-auto max-w-[320px] flex-col',
        isNested ? 'gap-0 p-0' : 'items-center gap-3 p-3',
      )}
      {...storyblokEditable(blok)}
    >
      {/* Icon */}
      {blok.icon && (
        <div
          className={clsxm(
            'relative flex shrink-0 items-center justify-center',
            isNested
              ? 'size-12'
              : 'h-[70px] w-[70px] items-start justify-start',
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
            isNested
              ? 'min-h-[60px]'
              : 'min-h-[60px] items-center justify-center p-10 md:min-h-[90px]',
          )}
        >
          <HeadingSm as='h3' className='text-foreground text-center'>
            {blok.title}
          </HeadingSm>
        </div>
      )}

      {/* Text */}
      {blok.text && (
        <Text
          className={clsxm(
            'text-muted-foreground w-full',
            isNested ? '' : 'items-center px-3 text-center',
          )}
        >
          {blok.text}
        </Text>
      )}
    </div>
  );
}
