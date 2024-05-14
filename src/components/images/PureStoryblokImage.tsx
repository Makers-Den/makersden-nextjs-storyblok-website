import Image, { type ImageProps } from 'next/image';

import clsxm from '@/lib/clsxm';
import { type SbAsset } from '@/lib/storyblok';

interface StoryBlokImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  storyblokImage?: SbAsset;
  fallbackImage?: { filename: string; alt: string };
}

/** When passing svg it fall back to image.
 * Keep in mind that layout another next/image specific props do not have an effect on img element.
 * Use className prop to style svg.
 */
export const PureStoryblokImage = ({
  storyblokImage,
  fallbackImage,
  className,
  height,
  width,
  ...props
}: StoryBlokImageProps) => {
  const { filename, alt } = storyblokImage ?? fallbackImage ?? {};

  if (!filename && !fallbackImage?.filename) {
    return null;
  }

  let computedFilename = filename;

  // NextJS image component does not like protocol relative urls
  if (filename?.startsWith('//')) {
    computedFilename = 'https:' + filename;
  }

  return (
    <>
      <Image
        className={clsxm('h-auto max-w-full', className)}
        src={computedFilename + '/m/' || ''}
        alt={alt ?? 'image'}
        height={height}
        width={width}
        {...props}
      />
    </>
  );
};
