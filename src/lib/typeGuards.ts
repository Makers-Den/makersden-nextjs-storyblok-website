/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  SbAssetLink,
  SbEmailLink,
  SbMultilink,
  SbStoryLink,
} from './storyblok';
export const isLinkWithAnchor = (
  link: SbMultilink
): link is SbAssetLink | SbStoryLink => !!(link as any)?.anchor;

export const isLinkEmail = (link: SbMultilink): link is SbEmailLink =>
  (link as any)?.linktype === 'email';

export const isLinkStory = (link: SbMultilink): link is SbStoryLink =>
  (link as any)?.linktype === 'story';

export const isLinkAsset = (link: SbMultilink): link is SbAssetLink =>
  (link as any)?.linktype === 'asset' || (link as any)?.linktype === 'url';
