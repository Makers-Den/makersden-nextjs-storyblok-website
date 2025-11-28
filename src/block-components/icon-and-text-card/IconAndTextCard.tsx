import { storyblokEditable } from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { toCssVariableName } from '@/lib/colors';
import { type IconAndTextCardSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { HeadingSm, Text } from '@/components/typography/Typography';

import { type CardStyleProps } from '../grid-section/GridSection';

export function IconAndTextCard({
  blok,
  isNested,
  backgroundColor,
  backgroundOpacity,
  width,
}: {
  blok: IconAndTextCardSbContent;
  isNested?: boolean;
} & CardStyleProps) {
  return (
    <div
      style={{
        backgroundColor:
          backgroundColor &&
          `color-mix(in srgb, var(${toCssVariableName(backgroundColor)}), transparent ${backgroundOpacity ? backgroundOpacity : 100}%)`,
      }}
      className={clsxm(
        (!width || width === 'auto') && 'w-auto max-w-[320px]',
        width === 'stretchToFill' && 'w-full',
        'flex flex-col',
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
          <HeadingSm as='h3' className='text-center text-[#212849]'>
            {blok.title}
          </HeadingSm>
        </div>
      )}

      {/* Text */}
      {blok.text && (
        <Text
          className={clsxm(
            'w-full text-[#212849]',
            isNested ? '' : 'items-center px-3 text-center',
          )}
        >
          {blok.text}
        </Text>
      )}
    </div>
  );
}
