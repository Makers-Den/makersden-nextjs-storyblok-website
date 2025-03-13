import { type Locale } from './i18n/config';
import type {
  SbAsset,
  SbRichtext,
  TranslationsSbContent,
} from './lib/storyblok';

export type WithClassName = { className: string };

// Youtube API v3 types

export type YoutubeResponse = {
  items: Item[];
};
export type Item = {
  snippet: Snippet;
  contentDetails: ContentDetails;
};

export interface ContentDetails {
  duration: string;
}

export type Snippet = {
  publishedAt: Date;
  thumbnails: Thumbnails;
};

export type Thumbnails = {
  default: DefaultThumbnail;
};

export type DefaultThumbnail = {
  url: string;
};

export type StoryblokBlock = {
  _uid: string;
  component: string;
  _editable: string;
  [key: string]: BlockFields;
};

export type BlockFields = string | boolean | SbRichtext | StoryblokBlock[];

export type StoryblokStoryTypes =
  | 'Category'
  | 'Client Testimonial'
  | 'Post'
  | 'Posts Overview'
  | 'Page';

export type SearchCategories = 'Blog' | 'Services' | 'Company';

export type AlgoliaRecord = {
  objectID: number;
  name: string;
  description: string;
  body: string;
  full_slug: string;
  searchCategory: string;
};

export type WithHighlighMetadata = {
  __highlightMetadata: {
    'data-blok-c'?: string;
    'data-blok-uid'?: string;
  };
};

export type GetPropsFromSbContent<T> = Omit<T, 'component' | '_uid'> &
  Partial<WithHighlighMetadata>;

export interface PageProps {
  params: Promise<{ slug: string[]; locale?: Locale }>;
  searchParams: Promise<Record<string, string>>;
}

export interface StoryContent {
  title?: string;
  description?: string;
  nonIndexable?: boolean;
  ogImage?: SbAsset;
  illustration?: SbAsset;
  component?: string;
  name?: string;
  intro?: string;
}

type NoStringIndex<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};

export type Translations = Omit<
  NoStringIndex<TranslationsSbContent>,
  'component' | '_uid'
>;

export type PageComponentProps<T> = {
  blok: T;
  translations: Translations;
  locale: Locale;
};
