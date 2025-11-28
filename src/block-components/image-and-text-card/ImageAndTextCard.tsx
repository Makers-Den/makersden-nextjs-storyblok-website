import { storyblokEditable } from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { toCssVariableName } from '@/lib/colors';
import { type ImageAndTextCardSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';
import { HeadingSm, Text } from '@/components/typography/Typography';

import { type CardStyleProps } from '../grid-section/GridSection';

export function ImageAndTextCard({
  blok,
  backgroundColor,
  backgroundOpacity,
  width,
}: {
  blok: ImageAndTextCardSbContent;
} & CardStyleProps) {
  return (
    <div
      style={{
        backgroundColor:
          backgroundColor &&
          `color-mix(in srgb, var(${toCssVariableName(backgroundColor)}), transparent ${backgroundOpacity ? backgroundOpacity : 100}%)`,
      }}
      className={clsxm(
        (!width || width === 'auto') && 'w-auto max-w-[280px]',
        width === 'stretchToFill' && 'w-full',
        'flex flex-shrink-0 flex-col gap-[15px] overflow-hidden rounded-lg border-[1.5px] border-gray-200 bg-white',
      )}
      {...storyblokEditable(blok)}
    >
      {/* Card Image with desaturated blueish filter */}
      {blok.image && (
        <div className='relative h-[177px] w-full overflow-hidden rounded-t-lg'>
          <StoryblokImage
            storyblokImage={blok.image}
            className='object-cover opacity-80 saturate-[0.7] [filter:sepia(1)_hue-rotate(190deg)]'
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
        {blok.text && <Text className='text-foreground'>{blok.text}</Text>}
      </div>
    </div>
  );
}
