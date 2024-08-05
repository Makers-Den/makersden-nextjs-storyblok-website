import { type BlockFields, type SbRichtext } from './storyblok';

export const isValidRichtext = (
  value: BlockFields | undefined
): value is SbRichtext => {
  if (!value) return false;
  return typeof value === 'object' && 'type' in value && value.type === 'doc';
};

export const isRichtextNotEmpty = (
  value: BlockFields | undefined
): value is SbRichtext => {
  return !!(value as SbRichtext)?.content?.[0]?.content?.[0]?.text;
};
