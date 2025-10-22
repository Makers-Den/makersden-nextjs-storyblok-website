/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { SbAsset, SbMultiasset, SbMultilink, SbRichtext, SbTable, StoryblokStory } from './sbInternalTypes';
export interface CtaLinkSbContent {
  name?: string;
  type?: "" | "default" | "secondary" | "outline" | "ghost" | "link";
  link?: SbMultilink;
  _uid: string;
  component: "CtaLink";
  [k: string]: any;
}

export interface FaqItemSbContent {
  question?: SbRichtext;
  answer?: SbRichtext;
  _uid: string;
  component: "FaqItem";
  [k: string]: any;
}

export type FaqSectionFaqItemsBlockType = "FaqItem";

export interface FaqSectionSbContent {
  title?: SbRichtext;
  faqItems: FaqItemSbContent[];
  _uid: string;
  component: "FaqSection";
  [k: string]: any;
}

export type Icons = "twitter" | "facebook";

export interface FeatureSbContent {
  name?: string;
  icons?: Icons;
  _uid: string;
  component: "Feature";
  [k: string]: any;
}

export type GlobalSettingsNavItemsBlockType = "Link";

export type GlobalSettingsFooterItemsBlockType = "Link";

export type GlobalSettingsRedirectsBlockType = "RedirectItem";

export interface GlobalSettingsSbContent {
  navItems?: LinkSbContent[];
  footerItems?: LinkSbContent[];
  redirects?: RedirectItemSbContent[];
  logo?: SbAsset;
  illustration?: SbAsset;
  _uid: string;
  component: "GlobalSettings";
  [k: string]: any;
}

export interface GridSbContent {
  gap?: number;
  columns?: (
    | FaqSectionSbContent
    | FeatureSbContent
    | HeroSectionSbContent
    | RichTextContentSbContent
    | SplitContentSectionSbContent
    | TeaserSbContent
  )[];
  _uid: string;
  component: "Grid";
  [k: string]: any;
}

export type HeroSectionCtaLinksBlockType = "Link";

export interface HeroSectionSbContent {
  title?: SbRichtext;
  backgroundImage?: SbAsset;
  ctaLinks?: LinkSbContent[];
  _uid: string;
  component: "HeroSection";
  [k: string]: any;
}

export interface JsonLdMetadataSbContent {
  jsonLd?: string;
  _uid: string;
  component: "JsonLdMetadata";
  [k: string]: any;
}

export interface LinkSbContent {
  name?: string;
  link?: SbMultilink;
  _uid: string;
  component: "Link";
  [k: string]: any;
}

export type PageAdditionalMetadataBlockType = "JsonLdMetadata";

export interface PageSbContent {
  body?: (
    | FaqSectionSbContent
    | FeatureSbContent
    | HeroSectionSbContent
    | RichTextContentSbContent
    | SplitContentSectionSbContent
    | TeaserSbContent
  )[];
  title?: string;
  description?: string;
  nonIndexable?: boolean;
  additionalMetadata?: JsonLdMetadataSbContent[];
  _uid: string;
  component: "Page";
  [k: string]: any;
}

export interface RedirectItemSbContent {
  from?: string;
  to?: string;
  isPermanent?: boolean;
  _uid: string;
  component: "RedirectItem";
  [k: string]: any;
}

export interface RichTextContentSbContent {
  text?: SbRichtext;
  _uid: string;
  component: "RichTextContent";
  [k: string]: any;
}

export type SplitContentSectionLeftSectionBlockType = "RichTextContent";

export type SplitContentSectionRightSectionBlockType = "RichTextContent";

export interface SplitContentSectionSbContent {
  sectionsProportions?: "" | "33/66" | "50/50" | "66/33";
  leftSection?: RichTextContentSbContent[];
  rightSection?: RichTextContentSbContent[];
  _uid: string;
  component: "SplitContentSection";
  [k: string]: any;
}

export interface TeaserSbContent {
  headline?: string;
  _uid: string;
  component: "Teaser";
  [k: string]: any;
}

export interface TranslationsSbContent {
  example: string;
  _uid: string;
  component: "Translations";
  [k: string]: any;
}

export type Datasources = "icons";
