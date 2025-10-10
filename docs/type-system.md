# Type System

## Overview

This project uses TypeScript in strict mode with comprehensive type safety throughout the application. Types are automatically generated from Storyblok schemas and carefully crafted for the rest of the application.

## TypeScript Configuration

**File**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "es2015",
    "module": "esnext",
    "jsx": "preserve",
    "moduleResolution": "Bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "~/*": ["./public/*"]
    }
  }
}
```

**Key settings**:
- `strict: true` - All strict checks enabled
- Path aliases: `@/` for `src/`, `~/` for `public/`
- ES2015 target for modern browser support

## Generated Types

### Storyblok Component Types

**File**: `src/lib/storyblok/blockLibraryTypes.ts` (auto-generated)

Types are automatically generated from Storyblok schemas via `pnpm generate-sb-types`.

**Example generated types**:

```typescript
export interface PageSbContent {
  body?: (
    | FaqSectionSbContent
    | FeatureSbContent
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

export interface FeatureSbContent {
  name?: string;
  icons?: Icons;
  _uid: string;
  component: "Feature";
  [k: string]: any;
}

export type BlockComponents =
  | "FaqSection"
  | "Feature"
  | "RichTextContent"
  | "SplitContentSection"
  | "Teaser";
```

**Key patterns**:
- Interface name: `{ComponentName}SbContent`
- Always includes `_uid: string`
- Always includes `component: string` with literal type
- Optional fields use `?:`
- Nested blocks use union types

### Datasource Types

Generated enum types for Storyblok datasources:

```typescript
export type Icons = "twitter" | "facebook";
export type Datasources = "icons";
```

### Block Type Enums

For fields that accept specific blocks:

```typescript
export type PageAdditionalMetadataBlockType = "JsonLdMetadata";
export type FaqSectionFaqItemsBlockType = "FaqItem";
```

## Core Storyblok Types

**File**: `src/lib/storyblok/sbInternalTypes.ts`

Core types for Storyblok data structures:

### StoryblokStory<T>

Wrapper for story content:

```typescript
export interface StoryblokStory<Content = any> {
  name: string;
  created_at: string;
  published_at: string | null;
  id: number;
  uuid: string;
  content: Content;
  slug: string;
  full_slug: string;
  sort_by_date: string | null;
  position: number;
  tag_list: string[];
  is_startpage: boolean;
  parent_id: number | null;
  meta_data: any;
  group_id: string;
  first_published_at: string | null;
  release_id: number | null;
  lang: string;
  path: string;
  alternates: AlternateObject[];
  default_full_slug: string | null;
  translated_slugs: TranslatedSlug[] | null;
}

// Usage
const story: StoryblokStory<PageSbContent> = await findStory({ slug });
```

### SbRichtext

Rich text field type:

```typescript
export interface SbRichtext {
  type: 'doc';
  content: Array<{
    type: string;
    content?: Array<{
      text?: string;
      type: string;
      marks?: Array<{
        type: string;
        attrs?: Record<string, any>;
      }>;
    }>;
    attrs?: Record<string, any>;
  }>;
}

// Usage
interface MyComponent {
  description: SbRichtext;
}
```

### SbAsset

Image/file asset type:

```typescript
export interface SbAsset {
  id: number;
  alt: string;
  name: string;
  focus: string | null;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: 'asset';
}

// Usage
interface MyComponent {
  image: SbAsset;
  logo?: SbAsset;
}
```

### SbMultilink

Link field with multiple types:

```typescript
export type SbMultilink =
  | SbEmailLink
  | SbUrlLink
  | SbStoryLink
  | SbAssetLink
  | SbAbstractLink;

// Story link
export interface SbStoryLink {
  id: string;
  cached_url: string;
  linktype: 'story';
  story?: StoryblokStory;
  anchor?: string;
  target?: '_blank' | '_self';
}

// URL link
export interface SbUrlLink {
  id: string;
  url: string;
  linktype: 'url';
  cached_url: string;
  anchor?: string;
  target?: '_blank' | '_self';
}

// Usage
interface MyComponent {
  link: SbMultilink;
}
```

### Other Core Types

```typescript
// Multiple assets
export interface SbMultiasset {
  fieldtype: 'multiasset';
  files: SbAsset[];
}

// Table
export interface SbTable {
  fieldtype: 'table';
  thead: Array<{ value: string }>;
  tbody: Array<{ body: Array<{ value: string }> }>;
}
```

## Application Types

**File**: `src/types.ts`

Custom application-level types:

### PageProps

Next.js page props:

```typescript
export interface PageProps {
  params: Promise<{ slug: string[]; locale?: Locale }>;
  searchParams: Promise<Record<string, string>>;
}
```

### PageComponentProps

Props for page/block components:

```typescript
export type PageComponentProps<T> = {
  blok: T;
  translations: Translations;
  locale: Locale;
};

// Usage
function Page({ blok, translations, locale }: PageComponentProps<PageSbContent>) {
  // ...
}
```

### Translations

Extracted translations type:

```typescript
type NoStringIndex<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};

export type Translations = Omit<
  NoStringIndex<TranslationsSbContent>,
  'component' | '_uid'
>;
```

### StoryContent

Generic story content interface:

```typescript
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
```

### Helper Types

```typescript
export type WithClassName = { className: string };

export type GetPropsFromSbContent<T> = Omit<T, 'component' | '_uid'> &
  Partial<WithHighlighMetadata>;
```

## Repository Types

**File**: `src/lib/storyblok/storyblokRepositoryTypes.ts`

Types for data fetching:

### FindStoryArgs

```typescript
export interface FindStoryArgs {
  slug: string;
  locale?: string;
  isPreview?: boolean;
  resolveRelations?: string;
  resolveLinks?: 'url' | 'story';
}

export type FindStoryFn = <StoryType = StoryblokStory<PageSbContent>>(
  args: FindStoryArgs
) => Promise<{ story: StoryType }>;
```

### FindStoriesArgs

```typescript
export interface FindStoriesArgs {
  startsWith?: string;
  excludingSlugs?: string;
  filterQuery?: Filter | Filter[];
  sortBy?: string;
  resolveRelations?: string;
  withTag?: string;
  perPage?: number;
  page?: number;
  locale?: string;
  isPreview?: boolean;
  contentType?: ContentTypeName;
}

export type WithTotal<T> = {
  stories: T;
  total: number;
};

export type FindStoriesFn = <StoryType = StoryblokStory<PageSbContent>>(
  args: FindStoriesArgs
) => Promise<WithTotal<(StoryType & HasPosition)[]>>;
```

### Filter Type

```typescript
export interface Filter {
  condition: string;
  value: string | Record<string, any>;
}

// Usage
filterQuery: {
  condition: '[content_type][in]',
  value: 'Post'
}
```

## Type Guards

**File**: `src/lib/typeGuards.ts`

Runtime type checking:

```typescript
export function isLinkStory(link: any): link is SbStoryLink {
  return link?.linktype === 'story';
}

export function isLinkUrl(link: any): link is SbUrlLink {
  return link?.linktype === 'url';
}

export function isLinkAsset(link: any): link is SbAssetLink {
  return link?.linktype === 'asset';
}

export function isLinkEmail(link: any): link is SbEmailLink {
  return link?.linktype === 'email';
}

export function isLinkWithAnchor(
  link: any
): link is { anchor: string } {
  return typeof link?.anchor === 'string' && link.anchor.length > 0;
}

// Usage
if (isLinkStory(link)) {
  // TypeScript knows link.story exists
  console.log(link.story.full_slug);
}
```

## Type Utilities

### Conditional Types

```typescript
// Remove string index signature
type NoStringIndex<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};

// Extract props without metadata
type GetPropsFromSbContent<T> = Omit<T, 'component' | '_uid'>;
```

### Generic Component Types

```typescript
// For components that accept any block
type BlockComponent<T extends { component: string }> = {
  blok: T;
};

// For components with translations
type TranslatableComponent<T> = {
  blok: T;
  translations: Translations;
};
```

## Best Practices

### 1. Use Generated Types

```typescript
// Good - type-safe
import { type PageSbContent } from '@/lib/storyblok';
function Page({ blok }: { blok: PageSbContent }) { }

// Bad - no type safety
function Page({ blok }: { blok: any }) { }
```

### 2. Type Component Props

```typescript
// Good - explicit types
interface FeatureProps {
  blok: FeatureSbContent;
  translations?: Translations;
}

export function Feature({ blok, translations }: FeatureProps) { }

// Acceptable - inline for simple cases
export function Feature({ blok }: { blok: FeatureSbContent }) { }
```

### 3. Use Type Guards

```typescript
// Good - type-safe
if (isLinkStory(link)) {
  const url = link.story.full_slug;
}

// Bad - runtime error risk
const url = (link as SbStoryLink).story.full_slug;
```

### 4. Handle Optional Fields

```typescript
// Good - safe access
{blok.items?.map(item => ...)}
{blok.title || 'Default Title'}

// Bad - will crash if undefined
{blok.items.map(item => ...)}
```

### 5. Narrow Union Types

```typescript
// Block component can be multiple types
type BlockType =
  | FeatureSbContent
  | TeaserSbContent
  | GridSbContent;

// Narrow with type guard
function renderBlock(blok: BlockType) {
  if (blok.component === 'Feature') {
    // TypeScript knows blok is FeatureSbContent
    return <Feature blok={blok} />;
  }
}
```

### 6. Use Const Assertions

```typescript
// Good - literal types
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number]; // 'en' | 'de'

// Bad - string type
export const locales = ['en', 'de'];
export type Locale = string;
```

## Common Type Patterns

### Optional Props with Defaults

```typescript
interface Props {
  required: string;
  optional?: string;
}

function MyComponent({
  required,
  optional = 'default'
}: Props) { }
```

### Extending Types

```typescript
interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

interface ButtonProps extends BaseProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}
```

### Generic Components

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <>{items.map(renderItem)}</>;
}
```

### Utility Props Types

```typescript
// Extract component props type
type ButtonProps = React.ComponentProps<typeof Button>;

// Omit props
type DivWithoutChildren = Omit<
  React.HTMLProps<HTMLDivElement>,
  'children'
>;

// Pick props
type OnlyClassNameAndId = Pick<
  React.HTMLProps<HTMLDivElement>,
  'className' | 'id'
>;
```

## Type Regeneration

### When to Regenerate

Run `pnpm generate-sb-types` when:
1. Adding new Storyblok components
2. Modifying component schemas
3. Adding/changing fields
4. Adding datasources
5. After pulling from Storyblok

### Type Generation Process

```bash
# Full process
pnpm generate-sb-types

# Step by step:
# 1. Login to Storyblok CLI
storyblok login

# 2. Pull component schemas
storyblok pull-components --space=$SPACE_ID

# 3. Generate types
node ./scripts/generateSbTypes.mjs
```

## Troubleshooting Types

### Type Errors After Schema Changes

1. Regenerate types: `pnpm generate-sb-types`
2. Restart TypeScript server in IDE
3. Clear Next.js cache: `rm -rf .next`

### Unknown Type Errors

Check:
1. Import path is correct
2. Type is exported
3. File is included in tsconfig
4. TypeScript version compatibility

### Any Type Leaking

Generated types use `[k: string]: any` for flexibility. To make stricter:

```typescript
// Instead of using blok directly
type StrictBlok = Omit<PageSbContent, keyof any>;
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Storyblok TypeScript](https://www.storyblok.com/docs/guide/essentials/typescript)
- [Next.js TypeScript](https://nextjs.org/docs/basic-features/typescript)
