import { isDevelopment } from './constants';
import { getCanonicalUrl } from './getCanonicalUrl';
import { getDevUrl } from './getDevUrl';

type BuildOgImageUrlArgs = {
  title?: string;
  image?: string;
  illustration?: string;
};

// OG IMAGES WON'T WORK ON DEV
// TODO: make it work on dev, because it can
/**
 * Builds an url to an opengraph image.
 * The endpoint in question will generate a custom open graph image
 * at runtime based on the parameters we're passing.
 *
 * If we don't receive valid parameters we will fall-back to a static default og image.
 */
export const buildOgImageUrl = ({
  title,
  image,
  illustration,
}: BuildOgImageUrlArgs): string => {
  if (image) {
    return image;
  }

  const uriEncodedTitle = encodeURIComponent(title ?? '');
  const uriEncodedIllustrationUrl = encodeURIComponent(illustration ?? '');

  if (title) {
    const path = `api/og?title=${uriEncodedTitle}&imageUrl=${uriEncodedIllustrationUrl}`;
    return isDevelopment ? getDevUrl(path) : getCanonicalUrl(path);
  }

  const path = `api/default-og?imageUrl=${uriEncodedIllustrationUrl}`;
  return isDevelopment ? getDevUrl(path) : getCanonicalUrl(path);
};
