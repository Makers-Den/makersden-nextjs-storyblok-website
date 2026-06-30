import { defaultLocale, type Locale } from '@/i18n/config';
import { buildLocalizedPath } from '@/i18n/paths';

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
  isLinkUrl,
  isLinkWithAnchor,
} from '../typeGuards';

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

const appendAnchor = (href: string, anchor: string) => `${href}${anchor}`;

const generateHrefFromSbStoryLink = (
  sbLink: SbStoryLink,
  anchor: string,
  locale: Locale,
) => {
  const link = sbLink.story?.full_slug ?? sbLink.cached_url ?? '';

  // If it's an empty string then it hasn't been defined in CMS.
  if (link === '') {
    return '#';
  }

  return appendAnchor(buildLocalizedPath(link, locale), anchor);
};

/**
 * Converts a SbLink to a href compatible url
 * @param sbLink
 */
export const sbLinkToHref = (
  sbLink: SbMultilink | undefined,
  locale: Locale = defaultLocale,
): string => {
  if (!sbLink) {
    return '';
  }
  const anchor = isLinkWithAnchor(sbLink) ? '#' + sbLink.anchor : '';

  if (isLinkAsset(sbLink) || isLinkUrl(sbLink)) {
    return appendAnchor(sbLink.url ?? sbLink.cached_url ?? '#', anchor);
  }

  if (isLinkStory(sbLink)) {
    return generateHrefFromSbStoryLink(sbLink, anchor, locale);
  }

  if (isLinkEmail(sbLink)) {
    return `mailto:${sbLink.email}`;
  }

  return '#';
};

export const sbLinkToButtonLinkProps = (
  sbLink: LinkSbContent['link'] | undefined,
  name: string | undefined,
  props?: Omit<LinkProps, 'href' | 'children'>,
): LinkProps | undefined => {
  if (!sbLink) {
    return undefined;
  }

  if (
    !(
      (sbLink as SbAssetLink | SbAbstractLink | SbStoryLink).cached_url ??
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
  linkContents: LinkSbContent[] | undefined,
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

  if (!href.startsWith('/')) {
    return `/${href}`;
  }

  return href;
};
