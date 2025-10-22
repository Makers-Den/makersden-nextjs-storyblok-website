# Storyblok Integration

## Overview

This application deeply integrates with Storyblok CMS, providing type-safe content management with automatic TypeScript type generation and seamless React component mapping.

## Storyblok Client Setup

### Client Initialization

**File**: `src/lib/storyblok/storyblokClient.ts`

```typescript
export const storyblokClient = new StoryblokClient({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  fetch: fetch,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});
```

### API Initialization

**File**: `src/storyblok.ts`

```typescript
export const getStoryblokApi = storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  apiOptions: {
    fetch: fetch,
    cache: { type: 'memory', clear: 'auto' },
  },
  use: [apiPlugin],
  components: {
    Feature: Feature,
    Page: Page,
    Grid: Grid,
    Teaser: Teaser,
    FaqSection: FaqSection,
  },
});
```

## Type Generation System

### Automatic Type Generation

The project automatically generates TypeScript types from Storyblok component schemas.

**Command**: `pnpm generate-sb-types`

**Process**:

1. Logs into Storyblok CLI
2. Pulls component schemas to `./storyblok-components/`
3. Builds the generator script
4. Generates TypeScript types to `src/lib/storyblok/blockLibraryTypes.ts`

### Generator Script

**File**: `src/lib/storyblok/storyblok-generate-ts/storyblokToTypescript.ts`

The generator:

- Converts Storyblok JSON schemas to TypeScript interfaces
- Handles nested blocks with proper typing
- Generates enum types for datasources
- Creates union types for block component groups
- Supports custom type mapping

**Example Output**:

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
  component: 'Page';
  [k: string]: any;
}
```

### Type System Structure

**File**: `src/lib/storyblok/blockLibraryTypes.ts` (generated)

Contains:

- Interface for each Storyblok component
- Enum types for datasources
- Union types for block groups
- `BlockComponents` type listing all nestable blocks

**File**: `src/lib/storyblok/sbInternalTypes.ts`

Contains Storyblok core types:

- `SbRichtext` - Rich text field type
- `SbAsset` - Image/file asset type
- `SbMultilink` - Link field type
- `SbTable` - Table field type
- `SbMultiasset` - Multiple assets type
- `StoryblokStory<T>` - Generic story wrapper

## Data Repository Pattern

### Storyblok Repository

**File**: `src/lib/storyblok/storyblokRepository.ts`

Provides high-level functions for fetching Storyblok content:

#### `findStory<T>(args)`

Fetches a single story by slug.

```typescript
const { story } = await findStory<StoryblokStory<PageSbContent>>({
  slug: 'about-us',
  locale: 'en',
  isPreview: false,
  resolveRelations: RESOLVED_RELATIONS,
  resolveLinks: 'url',
});
```

**Parameters**:

- `slug` - Full slug path (e.g., 'about-us', 'blog/my-post')
- `locale` - Language code (optional)
- `isPreview` - Fetch draft vs published
- `resolveRelations` - Comma-separated relation fields to populate
- `resolveLinks` - 'url' or 'story' link resolution

**Behavior**:

- Throws error if story not found
- Automatically switches to draft in preview/dev mode
- Cache-busts with `cv` parameter in preview/dev

#### `findStories<T>(args)`

Fetches multiple stories with filtering and pagination.

```typescript
const { stories, total } = await findStories<StoryblokStory<PostSbContent>>({
  startsWith: 'blog/',
  contentType: 'Post',
  sortBy: 'first_published_at:desc',
  perPage: 10,
  page: 1,
  filterQuery: { condition: '[content_type][in]', value: 'Post' },
  withTag: 'featured',
  locale: 'en',
});
```

**Parameters**:

- `startsWith` - Filter by slug prefix
- `excludingSlugs` - Exclude specific slugs
- `filterQuery` - Advanced filtering (single or array)
- `sortBy` - Sort field and direction
- `resolveRelations` - Relations to populate
- `withTag` - Filter by tag
- `perPage` - Results per page (default 10)
- `page` - Page number (default 1)
- `locale` - Language code
- `isPreview` - Fetch draft vs published
- `contentType` - Filter by content type

**Returns**:

```typescript
{
  stories: Array<StoryType & HasPosition>,
  total: number
}
```

#### `findAllPageSlugs(locales?)`

Fetches all page slugs for static generation.

```typescript
const { allSlugsWithLocale, allSlugsWithoutLocale } = await findAllPageSlugs([
  'en',
  'de',
]);
```

Returns:

- `allSlugsWithLocale` - Full slugs including locale prefix
- `allSlugsWithoutLocale` - Unique slugs without locale

**Note**: Currently limited to 100 stories per content type. Implement pagination for larger sites.

#### `findDatasourcesEntries<Val>(args)`

Fetches datasource entries (for options/dropdowns).

```typescript
const icons = await findDatasourcesEntries<'twitter' | 'facebook'>({
  datasource: 'icons',
  dimension: 'en',
  perPage: 25,
  page: 1,
});
```

### Constants

**File**: `src/lib/storyblok/storyblokRepository.ts`

```typescript
// Pages excluded from sitemap
export const SITEMAP_EXCLUDED_SLUGS = ['home', 'not-found', 'dev-page'];

// All page content types
export const ALL_PAGE_TYPES: ContentTypeName[] = ['Page'];

// Relations to resolve (empty by default)
export const RESOLVED_RELATIONS_ARRAY = [];
export const RESOLVED_RELATIONS = RESOLVED_RELATIONS_ARRAY.join(',');
```

## Component Registration

### Registering Components

Add new components to the mapping in `src/storyblok.ts`:

```typescript
components: {
  Feature: Feature,
  Page: Page,
  Grid: Grid,
  Teaser: Teaser,
  FaqSection: FaqSection,
  // Add new component here
  MyNewComponent: MyNewComponent,
}
```

### Dynamic Components

For code-splitting large components:

```typescript
const dynamicComponents = {
  HeavyComponent: dynamic(
    () => import('@/block-components/heavy/HeavyComponent'),
  ),
};

export const getStoryblokApi = storyblokInit({
  // ...
  components: {
    ...staticComponents,
    ...dynamicComponents,
  },
});
```

## Storyblok Editor Integration

### Visual Editor Bridge

The Visual Editor bridge enables live editing in Storyblok:

**Setup**: `src/app/StoryblokPage.tsx`

```typescript
<StoryblokStory
  bridgeOptions={{ resolveRelations: RESOLVED_RELATIONS }}
  story={story}
  translations={translations}
/>
```

### Editable Components

Make components editable in Visual Editor:

```typescript
import { storyblokEditable } from '@storyblok/react/rsc';

export function Feature({ blok }: { blok: FeatureSbContent }) {
  return (
    <div {...storyblokEditable(blok)}>
      {/* Component content */}
    </div>
  );
}
```

The `storyblokEditable()` function adds data attributes for Visual Editor.

## Content Types

### Global Settings

**Slug**: `globals/settings`
**Type**: `GlobalSettingsSbContent`

Contains:

- `navItems` - Header navigation links
- `footerItems` - Footer links
- `redirects` - Site-wide redirects
- `logo` - Site logo
- `illustration` - Default OG image

### Translations

**Slug**: `globals/translations`
**Type**: `TranslationsSbContent`

Contains translation strings used across the site.

### Page

**Type**: `PageSbContent`

Standard page with:

- `body` - Array of block components
- `title` - Page title (SEO)
- `description` - Meta description
- `nonIndexable` - Boolean for noindex
- `additionalMetadata` - JSON-LD metadata

## Link Handling

### Link Types

Storyblok supports multiple link types:

- Story links (internal pages)
- URL links (external)
- Asset links (files/downloads)
- Email links

### Converting Links to URLs

**File**: `src/lib/storyblok/sbLinkToHref.ts`

```typescript
import { sbLinkToHref } from '@/lib/storyblok';

const href = sbLinkToHref(link);
// Returns: '/', '/about', 'https://example.com', etc.
```

**Handles**:

- Internal story links with full_slug
- External URL links
- Asset/download links
- Email links (mailto:)
- Anchor links (#section)
- Empty/undefined links (returns '#')

### StoryblokLink Component

**File**: `src/components/storyblok-link/StoryblokLink.tsx`

Pre-built component for Storyblok links:

```typescript
<StoryblokLink link={blok.link}>
  Click Here
</StoryblokLink>
```

Automatically:

- Converts link to href
- Handles target and rel attributes
- Works with Next.js Link for client-side navigation

## Rich Text Handling

### Rich Text Rendering

**File**: `src/lib/richTextUtils.tsx`

Provides utilities for rendering Storyblok rich text with custom React components.

#### Basic Rendering

```typescript
import { renderText } from '@/lib/richTextUtils';

export function MyComponent({ blok }) {
  return <div>{renderText(blok.richTextField)}</div>;
}
```

#### Custom Rendering Functions

- `renderText(richtext, overrides?)` - Default rendering
- `renderTextLg(richtext)` - Large text paragraphs
- `renderHeadingXl(richtext, tag?)` - XL heading style
- `renderHeadingLg(richtext, tag?)` - Large heading style
- `renderHeadingMd(richtext, tag?)` - Medium heading style
- `renderTextWithOptions(richtext, options)` - Custom options

#### Converting Rich Text to String

```typescript
import { richTextToString } from '@/lib/richTextUtils';

const plainText = richTextToString(blok.intro);
// Returns: "This is the intro text without HTML"
```

### Custom Node Resolvers

The default rendering handles:

- **Headings** (h1-h4) with auto-generated IDs
- **Paragraphs** with custom styling
- **Lists** (ordered and unordered)
- **Images** (via StoryblokImage component)
- **Quotes** (blockquote styling)
- **Bold, underline, styled marks**
- **Custom styles** (subscript, superscript, highlights, quotes)

Override specific nodes:

```typescript
renderText(content, {
  nodeResolvers: {
    [NODE_PARAGRAPH]: (children) => (
      <p className="my-custom-class">{children}</p>
    ),
  },
});
```

## Preview Mode

### Enabling Preview

**Route**: `/api/preview`

```typescript
// Enable for specific slug
GET /api/preview?slug=/about&secret=YOUR_SECRET

// Response: Sets draft mode cookie, redirects to slug
```

### Disabling Preview

**Route**: `/api/exit-preview`

```typescript
GET / api / exit - preview;

// Response: Clears draft mode cookie, redirects to referrer
```

### Preview Detection

```typescript
import { draftMode } from 'next/headers';

const isPreview = (await draftMode()).isEnabled;
```

When preview is enabled:

- Fetches `draft` version instead of `published`
- Adds cache-busting parameter
- Enables Visual Editor bridge

## Best Practices

### 1. Always Use Generated Types

```typescript
// Good
import { type PageSbContent } from '@/lib/storyblok';
function Page({ blok }: { blok: PageSbContent }) { ... }

// Bad - no type safety
function Page({ blok }: { blok: any }) { ... }
```

### 2. Regenerate Types After Schema Changes

```bash
pnpm generate-sb-types
```

### 3. Use Repository Functions

```typescript
// Good - centralized, type-safe
import { findStory } from '@/lib/storyblok/storyblokRepository';

// Avoid - direct API calls bypass patterns
getStoryblokApi().get('cdn/stories/...');
```

### 4. Handle Resolved Relations

Only resolve relations when needed (reduces payload):

```typescript
// Define what to resolve
export const RESOLVED_RELATIONS_ARRAY = ['blog_post.author'];

// Use in queries
await findStory({
  slug,
  resolveRelations: RESOLVED_RELATIONS,
});
```

### 5. Use Type Guards

**File**: `src/lib/typeGuards.ts`

```typescript
if (isLinkStory(link)) {
  // TypeScript knows link is SbStoryLink
}
```

## Troubleshooting

### Types Not Updating

1. Check Storyblok CLI is logged in: `storyblok login`
2. Verify space access
3. Run `pnpm generate-sb-types`
4. Restart TypeScript server

### Component Not Rendering

1. Check component is registered in `src/storyblok.ts`
2. Verify component name matches exactly (case-sensitive)
3. Check component file exports correct function

### Preview Not Working

1. Verify `NEXT_PUBLIC_STORYBLOK_TOKEN` is set
2. Check preview secret matches
3. Ensure cookies are enabled
4. Use HTTPS for Visual Editor (run `pnpm proxy`)

### Relations Not Resolving

1. Add relation to `RESOLVED_RELATIONS_ARRAY`
2. Ensure field is configured as relation in Storyblok
3. Check relation format: `componentName.fieldName`
