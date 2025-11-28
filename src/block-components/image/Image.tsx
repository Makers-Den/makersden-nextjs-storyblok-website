import { storyblokEditable } from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { type ImageSbContent } from '@/lib/storyblok';

import { StoryblokImage } from '@/components/images/StoryblokImage';

const fitToTwClass = {
  cover: 'object-cover',
  contain: 'object-contain',
} as const;

export function Image({ blok }: { blok: ImageSbContent }) {
  if (!blok.image) {
    return null;
  }

  const fitClass =
    fitToTwClass[blok.fit as keyof typeof fitToTwClass] ?? 'object-cover';

  const isFullWidth =
    blok.stretchToFill === 'width' || blok.stretchToFill === 'widthAndHeight';
  const isFullHeight =
    blok.stretchToFill === 'height' || blok.stretchToFill === 'widthAndHeight';

  return (
    <div
      {...storyblokEditable(blok)}
      className={clsxm(isFullWidth && 'w-full', isFullHeight && 'h-full')}
    >
      <StoryblokImage
        storyblokImage={blok.image}
        className={clsxm(
          isFullWidth && 'w-full',
          isFullHeight && 'h-full',
          !blok.noRounding && 'rounded-lg',
          fitClass,
        )}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px'
        style={{
          maxHeight: blok.maxHeight ? `${blok.maxHeight}px` : undefined,
        }}
      />
    </div>
  );
}
