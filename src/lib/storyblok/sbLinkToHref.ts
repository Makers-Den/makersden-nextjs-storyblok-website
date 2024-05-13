import type {
  LinkSbContent,
  SbAbstractLink,
  SbAssetLink,
  SbMultilink,
  SbStoryLink,
} from './index';
import {
  isLinkAsset,
  isLinkEmail,
  isLinkStory,
  isLinkWithAnchor,
} from '../typeGuards';

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

const removeTrailingSlash = (path: string) => {
  if (path.substring(path.length - 1) === '/') {
    return path.substring(0, path.length - 1);
  }

  return path;
};

/**
 * Converts a SbLink to a href compatible url
 * @param sbLink
 */
export const sbLinkToHref = (sbLink: SbMultilink | undefined): string => {
  if (!sbLink) {
    return '';
  }
  const anchor = isLinkWithAnchor(sbLink) ? '#' + sbLink.anchor : '';

  if (isLinkAsset(sbLink)) {
    return `${sbLink.url}${anchor}`;
  }

  if (isLinkStory(sbLink)) {
    const link = `${sbLink.cached_url}${anchor}`;
    // If it's en empty string then it hasn't been defined in CMS.
    // Let's just default to a single hash
    if (link === '') {
      return '#';
    }

    if (sbLink.cached_url === 'home') {
      return '/';
    }

    const computedLink = link.startsWith('/') ? link : '/' + link;

    return removeTrailingSlash(computedLink);
  }

  if (isLinkEmail(sbLink)) {
    return `mailto:${sbLink.email}`;
  }

  return '#';
};

export const sbLinkToButtonLinkProps = (
  sbLink: LinkSbContent['link'] | undefined,
  name: string | undefined,
  props?: Omit<LinkProps, 'href' | 'children'>
): LinkProps | undefined => {
  if (!sbLink) {
    return undefined;
  }

  if (
    !(
      (sbLink as SbAssetLink | SbAbstractLink | SbStoryLink).cached_url ||
      (sbLink as SbAssetLink).url
    )
  ) {
    return undefined;
  }

  if (isLinkAsset(sbLink)) {
    return { href: `${sbLink.url}`, children: name, ...props };
  }

  if (isLinkStory(sbLink)) {
    return { href: sbLinkToHref(sbLink), children: name, ...props };
  }

  return undefined;
};

export const linkContentsToButtonLinkProps = (
  linkContents: LinkSbContent[] | undefined
): undefined | LinkProps => {
  if (!linkContents) {
    return undefined;
  }

  const [linkContent] = linkContents;

  if (!linkContent) {
    return undefined;
  }

  const { link, name, ...rest } = linkContent;

  return sbLinkToButtonLinkProps(link, name, rest);
};

/** Makes sure the href begins with a slash for internal links, useful when linking to stories by their `full_slug` */
export const ensurePrecedingSlash = (href: string) => {
  if (href.startsWith('http')) {
    return href;
  }

  if (href.substring(0, 1) !== '/') {
    return `/${href}`;
  }

  return href;
};
