import type {
  SbAssetLink,
  SbEmailLink,
  SbMultilink,
  SbStoryLink,
  SbUrlLink,
} from './storyblok';
export const isLinkWithAnchor = (
  link: SbMultilink,
): link is SbAssetLink | SbStoryLink =>
  !!(link as SbAssetLink | SbStoryLink)?.anchor;

export const isLinkEmail = (link: SbMultilink): link is SbEmailLink =>
  link?.linktype === 'email';

export const isLinkStory = (link: SbMultilink): link is SbStoryLink =>
  link?.linktype === 'story';

export const isLinkAsset = (link: SbMultilink): link is SbAssetLink =>
  link.linktype === 'asset';

export const isLinkUrl = (link: SbMultilink): link is SbUrlLink =>
  link.linktype === 'url';
