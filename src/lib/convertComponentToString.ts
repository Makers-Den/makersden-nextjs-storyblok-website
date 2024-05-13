import { richTextToString } from '@/lib/richTextUtils';
import { BlockFields, SbBlock } from '@/lib/storyblok';

import { isValidRichtext } from './isRichtext';

const spacingFilter = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  'square',
];
const backgroundFilter = ['grid', 'transparent', 'grey', 'darkGrey'];
const postTypeFilter = ['article', 'case-study', 'video'];
const sectionsProportions = ['33/66', '50/50', '66/33'];
const stringFilter = [
  ...spacingFilter,
  ...backgroundFilter,
  ...postTypeFilter,
  ...sectionsProportions,
];
const fieldsFilter = [
  '_editable',
  '_uid',
  'component',
  'logos',
  'image',
  'icon',
  'spacingTop',
  'spacingBottom',
  'parallaxLayers',
];

const isStoryblokBlock = (value: BlockFields): value is SbBlock[] => {
  return Array.isArray(value);
};

export const convertCompontentToString = (component: SbBlock) => {
  const result: string = Object.entries(component)
    .map(([key, value]) => {
      if (fieldsFilter.includes(key) || typeof value === 'boolean' || !value) {
        return undefined;
      }

      if (typeof value === 'object') {
        if (isValidRichtext(value)) {
          const text = richTextToString(value);
          if (text) {
            return text;
          } else {
            return undefined;
          }
        }
        if (isStoryblokBlock(value)) {
          if (typeof value[0] === 'string') {
            return undefined; // ? this will ensure that linked stories are changed to undefined
          }
          return value
            .map((block) => convertCompontentToString(block))
            .join('\n');
        }

        return undefined;
      }
      return value;
    })
    .filter((value) => value !== undefined && !stringFilter.includes(value))
    .join('\n');

  return result.length > 0 ? result : undefined;
};
