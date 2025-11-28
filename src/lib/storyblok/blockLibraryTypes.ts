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

export type Colors = "red" | "green" | "blue" | "black" | "white" | "transparent" | "gray";

export type CtaSectionCtaLinkBlockType = "CtaLink";

export type Spacing = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

export interface CtaSectionSbContent {
  title?: SbRichtext;
  text?: SbRichtext;
  backgroundColor?: Colors;
  ctaLink?: CtaLinkSbContent[];
  spacingTop?: Spacing;
  spacingBottom?: Spacing;
  _uid: string;
  component: "CtaSection";
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
  backgroundColor?: Colors;
  spacingTop?: Spacing;
  spacingBottom?: Spacing;
  title?: SbRichtext;
  faqItems: FaqItemSbContent[];
  _uid: string;
  component: "FaqSection";
  [k: string]: any;
}

export type FooterSectionLinksBlockType = "Link";

export interface FooterSectionSbContent {
  title?: string;
  links?: LinkSbContent[];
  _uid: string;
  component: "FooterSection";
  [k: string]: any;
}

export type GlobalSettingsFooterSectionsBlockType = "FooterSection";

export type GlobalSettingsFooterBottomLinksBlockType = "Link";

export type GlobalSettingsFooterSocialLinksBlockType = "SocialLink";

export type GlobalSettingsNavItemsBlockType = "Link" | "NavSection" | "NavJournalSection";

export type GlobalSettingsRedirectsBlockType = "RedirectItem";

export interface GlobalSettingsSbContent {
  footerSections?: FooterSectionSbContent[];
  footerBottomLinks?: LinkSbContent[];
  footerSocialLinks?: SocialLinkSbContent[];
  footerCopyrightNotice?: string;
  navItems?: (LinkSbContent | NavSectionSbContent | NavJournalSectionSbContent)[];
  redirects?: RedirectItemSbContent[];
  logo?: SbAsset;
  illustration?: SbAsset;
  _uid: string;
  component: "GlobalSettings";
  [k: string]: any;
}

export type GridSectionCardsBlockType = "ImageAndTextCard" | "IconAndTextCard";

export interface GridSectionSbContent {
  title?: SbRichtext;
  cards?: (ImageAndTextCardSbContent | IconAndTextCardSbContent)[];
  backgroundColor?: Colors;
  spacingTop?: Spacing;
  spacingBottom?: Spacing;
  responsiveColumns?: "" | "4/2/1" | "3/2/1";
  _uid: string;
  component: "GridSection";
  [k: string]: any;
}

export interface HeroNarrowSectionSbContent {
  title?: string;
  _uid: string;
  component: "HeroNarrowSection";
  [k: string]: any;
}

export type HeroSectionCtaLinksBlockType = "CtaLink";

export interface HeroSectionSbContent {
  title?: SbRichtext;
  backgroundImage?: SbAsset;
  ctaLinks?: CtaLinkSbContent[];
  _uid: string;
  component: "HeroSection";
  [k: string]: any;
}

export type HeroSplitSectionRightSideBlockType = "Image" | "ImageCardLink" | "FeaturedAuthorStory";

export type HeroSplitSectionRightSideFillBlockType = "Image";

export interface HeroSplitSectionSbContent {
  title?: SbRichtext;
  text?: SbRichtext;
  rightSide?: (ImageSbContent | ImageCardLinkSbContent | FeaturedAuthorStorySbContent)[];
  rightSideFill?: ImageSbContent[];
  _uid: string;
  component: "HeroSplitSection";
  [k: string]: any;
}

export interface IconAndTextCardSbContent {
  icon?: SbAsset;
  title?: string;
  text?: string;
  _uid: string;
  component: "IconAndTextCard";
  [k: string]: any;
}

export interface ImageSbContent {
  image?: SbAsset;
  fit?: "" | "cover" | "contain";
  maxHeight?: number;
  stretchToFill?: "" | "width" | "height" | "widthAndHeight";
  noRounding?: boolean;
  _uid: string;
  component: "Image";
  [k: string]: any;
}

export interface ImageAndTextCardSbContent {
  image?: SbAsset;
  title?: string;
  text?: string;
  _uid: string;
  component: "ImageAndTextCard";
  [k: string]: any;
}

export interface ImageCardLinkSbContent {
  image?: SbAsset;
  link?: SbMultilink;
  pillText?: string;
  _uid: string;
  component: "ImageCardLink";
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

export interface LogosSectionSbContent {
  title?: SbRichtext;
  logos?: SbMultiasset;
  backgroundColor?: Colors;
  spacingTop?: Spacing;
  spacingBottom?: Spacing;
  _uid: string;
  component: "LogosSection";
  [k: string]: any;
}

export type NavSectionItemsBlockType = "NavSectionLinkItem";

export interface NavSectionSbContent {
  title?: string;
  items?: NavSectionLinkItemSbContent[];
  _uid: string;
  component: "NavSection";
  [k: string]: any;
}

export interface NavSectionLinkItemSbContent {
  title?: string;
  description?: string;
  link?: SbMultilink;
  _uid: string;
  component: "NavSectionLinkItem";
  [k: string]: any;
}

export type PageAdditionalMetadataBlockType = "JsonLdMetadata";

export interface PageSbContent {
  body?: (
    | CtaSectionSbContent
    | FaqSectionSbContent
    | GridSectionSbContent
    | HeroNarrowSectionSbContent
    | HeroSplitSectionSbContent
    | LogosSectionSbContent
    | SplitSectionSbContent
  )[];
  title?: string;
  description?: string;
  nonIndexable?: boolean;
  additionalMetadata?: JsonLdMetadataSbContent[];
  navType?: "" | "white" | "black" | "transparent";
  layoutType?: "" | "default" | "lead page";
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

export interface SocialLinkSbContent {
  name?: string;
  icon?: SbAsset;
  link?: SbMultilink;
  _uid: string;
  component: "SocialLink";
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

export type SplitSectionLeftContentBlockType =
  | "RichTextContent"
  | "Image"
  | "TitleAndText"
  | "FeaturedAuthorStory"
  | "ImageCardLink";

export type SplitSectionRightContentBlockType =
  | "RichTextContent"
  | "Image"
  | "TitleAndText"
  | "FeaturedAuthorStory"
  | "ImageCardLink"
  | "NestedGrid";

export interface SplitSectionSbContent {
  title?: SbRichtext;
  leftContent?: (
    | RichTextContentSbContent
    | ImageSbContent
    | TitleAndTextSbContent
    | FeaturedAuthorStorySbContent
    | ImageCardLinkSbContent
  )[];
  rightContent?: (
    | RichTextContentSbContent
    | ImageSbContent
    | TitleAndTextSbContent
    | FeaturedAuthorStorySbContent
    | ImageCardLinkSbContent
    | NestedGridSbContent
  )[];
  proportions?: "" | "33/66" | "50/50" | "66/33";
  mobileOrder?: "" | "left on top" | "right on top";
  backgroundColor?: Colors;
  spacingTop?: Spacing;
  spacingBottom?: Spacing;
  _uid: string;
  component: "SplitSection";
  [k: string]: any;
}

export interface TeaserSbContent {
  headline?: string;
  _uid: string;
  component: "Teaser";
  [k: string]: any;
}

export interface TitleAndTextSbContent {
  title?: SbRichtext;
  text?: SbRichtext;
  _uid: string;
  component: "TitleAndText";
  [k: string]: any;
}

export interface TranslationsSbContent {
  example: string;
  _uid: string;
  component: "Translations";
  [k: string]: any;
}

export type Datasources = "colors" | "spacing";
