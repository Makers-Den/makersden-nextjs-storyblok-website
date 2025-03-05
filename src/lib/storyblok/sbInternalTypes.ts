import { type JSX } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type BlockComponent = (props: any) => JSX.Element;

export type SbCommonContent = {
  _uid?: string;
  component?: string;
};

export interface StoryblokStory<TContent = SbCommonContent> {
  name: string;
  created_at: string;
  published_at: string;
  id: number;
  uuid: string;
  content: TContent;
  slug: string;
  full_slug: string;
  sort_by_date: string | null;
  position: number;
  tag_list: string[];
  is_startpage: boolean;
  parent_id: number;
  meta_data: any;
  group_id: string;
  first_published_at: string | null;
  release_id?: number | null;
  lang: string;
  path?: string;
  alternates: {
    id: number;
    name: string;
    slug: string;
    published: boolean;
    full_slug: string;
    is_folder: boolean;
    parent_id: number;
  }[];
  default_full_slug: string;
  translated_slugs: {
    path: string;
    name: string | null;
    lang: string;
  }[];
  _stopResolving?: boolean;
}

export type StoryblokStoryWithBody = StoryblokStory<
  SbBlock & { body: SbBlock[] }
>;

export type SbRichtextBlock = {
  src?: string;
  _uid?: string;
  text?: SbRichtext;
  component?: string;
  _editable?: string;
};

export type SbRichtext = {
  type?: string;
  content?: {
    type?: 'heading' | 'paragraph';
    attrs?: {
      level?: number;
    };
    content?: {
      type?: string;
      text?: string;
    }[];
  }[];
};

export type SbTable = {
  thead: {
    _uid: string;
    value?: string;
    component: number;
  }[];
  tbody: {
    _uid: string;
    body: {
      _uid?: string;
      value?: string;
      component?: number;
    }[];
    component: number;
  }[];
};

export type SbMultiasset = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
}[];

export type SbAsset = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
};

export type SbEmailLink = {
  email?: string;
  linktype?: 'email';
};

export type SbStoryLink = {
  id?: string;
  cached_url?: string;
  anchor?: string;
  linktype?: 'story';
  story?: {
    name: string;
    created_at?: string;
    published_at?: string;
    id: number;
    uuid: string;
    content?: any;
    slug: string;
    full_slug: string;
    url: string;
    sort_by_date?: null | string;
    position?: number;
    tag_list?: string[];
    is_startpage?: boolean;
    parent_id?: null | number;
    meta_data?: any;
    group_id?: string;
    first_published_at?: string;
    release_id?: null | number;
    lang?: string;
    path?: null | string;
    alternates?: any[];
    default_full_slug?: null | string;
    translated_slugs?: null | any[];
  };
};

export type SbAssetLink = {
  url?: string;
  cached_url?: string;
  anchor?: string;
  linktype?: 'asset';
};

export type SbUrlLink = {
  url?: string;
  cached_url?: string;
  anchor?: string;
  linktype?: 'url';
};

export type SbAbstractLink = {
  cached_url?: string;
  url?: string;
  linktype?: string;
};

export type Multilink =
  | SbAbstractLink
  | SbStoryLink
  | SbAssetLink
  | SbEmailLink;

export type SbMultilink = Multilink & {
  target?: string;
  rel?: string;
  title?: string;
};

export type SbBlok<T extends string> = {
  _uid: string;
  component: T;
};

export type BlockFields = string | boolean | SbRichtext | SbBlock[];

export type SbBlock = {
  _uid: string;
  component: string;
  _editable: string;
  [key: string]: BlockFields;
};
