import Image, { type ImageProps } from 'next/image';

import clsxm from '@/lib/clsxm';
import { type SbAsset } from '@/lib/storyblok';
import { getDimensionsFromStoryblokAssetFilename } from '@/lib/utils/getters';

interface StoryBlokImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  storyblokImage?: SbAsset;
  fallbackImage?: { filename: string; alt: string };
}

const calcWidthOrHeight = (
  givenWidth: string | number | undefined,
  parsedWidth: number,
  fill: ImageProps['fill'],
): number | undefined => {
  if (fill) {
    return undefined;
  }

  if (givenWidth) {
    return Number(givenWidth);
  }

  return !isNaN(parsedWidth) ? parsedWidth : undefined;
};

/** When passing svg it fallback to image.
 * Keep in mind that fill an other next/image specific props do not have an effect on img element.
 * Use className prop to style svg.
 */
export const StoryblokImage = ({
  storyblokImage,
  fallbackImage,
  className,
  width,
  height,
  fill,
  ...props
}: StoryBlokImageProps) => {
  const { filename, alt } = storyblokImage ?? fallbackImage ?? {};

  const isSvg = filename?.includes('.svg');

  if (!filename && !fallbackImage?.filename) {
    return null;
  }

  let computedFilename = filename;

  // NextJS image component does not like protocol relative urls
  if (filename?.startsWith('//')) {
    computedFilename = 'https:' + filename;
  }

  const dimensions = getDimensionsFromStoryblokAssetFilename(
    computedFilename ?? '',
  );
  return (
    <>
      {!isSvg && (
        <Image
          className={clsxm('h-auto max-w-full', className)}
          src={computedFilename + '/m/' || ''}
          alt={alt ?? 'image'}
          width={calcWidthOrHeight(width, dimensions.width, fill)}
          height={calcWidthOrHeight(height, dimensions.height, fill)}
          fill={fill}
          {...props}
        />
      )}
      {isSvg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={className}
          src={computedFilename}
          width={width}
          height={height}
          alt={alt ?? 'vector image'}
          loading='lazy'
        />
      )}
    </>
  );
};
