import type {
  SbAssetLink,
  SbEmailLink,
  SbMultilink,
  SbStoryLink,
  SbUrlLink,
  StoryblokStory,
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

export const isStoryblokStory = <T = unknown>(
  item: unknown,
): item is StoryblokStory<T> => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'uuid' in item &&
    'content' in item &&
    'full_slug' in item
  );
};

export const isStoryblokStories = <T = unknown>(
  items: unknown,
): items is StoryblokStory<T>[] => {
  return Array.isArray(items) && items.every((item) => isStoryblokStory(item));
};
