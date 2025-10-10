# Architecture

## Overview

This application uses Next.js 15 App Router with a dynamic, content-driven architecture powered by Storyblok CMS. All pages are generated dynamically based on content structure in Storyblok.

## Routing Architecture

### Dynamic Catch-All Route

**Location**: `src/app/[locale]/[[...slug]]/page.tsx`

The entire application uses a single catch-all route that handles all page requests:

```
/                           → home page
/about                      → about page
/services/consulting        → nested page
/de/ueber-uns              → German about page (localized)
```

**Key Files:**
- `src/app/[locale]/[[...slug]]/page.tsx` - Main page component
- `src/app/[locale]/[[...slug]]/layout.tsx` - Locale-specific layout
- `src/app/StoryblokPage.tsx` - Core page rendering logic
- `src/app/getPageProps.ts` - Data fetching and metadata generation

### Route Parameters

- `[locale]` - Optional locale parameter (en, de)
- `[[...slug]]` - Optional catch-all for any path depth

The double brackets `[[...slug]]` make the slug optional, allowing the route to match both `/` and `/any/path/here`.

## Data Flow

### 1. Request Flow

```
User Request → Next.js Route → getPageProps() → Storyblok API → Page Component
```

**Steps:**

1. User navigates to a URL
2. Next.js matches the URL to `[locale]/[[...slug]]/page.tsx`
3. `getPageProps()` is called with locale and slug
4. Three Storyblok requests are made in parallel:
   - Main page content
   - Global settings (navigation, footer)
   - Translations
5. Data is passed to `StoryblokPage` component
6. Layout wraps the page with Header/Footer
7. Content blocks are rendered dynamically

### 2. Page Props Resolution

**File**: `src/app/getPageProps.ts`

```typescript
export const getPageProps = async ({
  slug: string,
  locale: string | undefined,
}) => {
  // Fetches:
  // 1. Global settings (globals/settings)
  // 2. Translations (globals/translations)
  // 3. Page content (based on slug)

  return {
    globalSettingsStory,
    translations,
    story,
    preview,
    locale,
  }
}
```

**Special Cases:**
- Empty slug → defaults to 'home'
- `/home` path → only accessible in preview mode
- Missing content → triggers 404
- Redirects → handled via global settings

### 3. Static Generation

**File**: `src/app/generateStaticParams.ts`

The app uses Incremental Static Regeneration (ISR):

```typescript
export const revalidate = 300; // 5 minutes
export const dynamicParams = true; // Allow new pages
```

At build time:
- Fetches all pages from Storyblok
- Generates static params for known pages
- New pages are generated on-demand

## Component Architecture

### Component Hierarchy

```
RootLayout
  └─ LocaleStoryblokPage
      └─ StoryblokPage
          └─ CommonContextProviders
              └─ Layout
                  ├─ Header (from GlobalSettings)
                  ├─ <StoryblokStory>
                  │   └─ Page Component
                  │       └─ Body Blocks (Grid, Feature, Teaser, etc.)
                  └─ Footer (from GlobalSettings)
```

### Component Types

**1. Page Components** (`src/page-components/`)
- Top-level content types (Page, Post, Category, etc.)
- Receive full story and translations
- Render body blocks

**2. Block Components** (`src/block-components/`)
- Reusable content blocks (Grid, Feature, Teaser, etc.)
- Mapped in `src/storyblok.ts`
- Nestable within pages and other blocks

**3. UI Components** (`src/components/`)
- Generic React components
- Not directly mapped to Storyblok
- Used by block/page components

## Storyblok Component Mapping

**File**: `src/storyblok.ts`

```typescript
export const getStoryblokApi = storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    Feature: Feature,      // Maps "Feature" CMS component
    Page: Page,           // Maps "Page" CMS component
    Grid: Grid,           // Maps "Grid" CMS component
    Teaser: Teaser,       // Maps "Teaser" CMS component
    FaqSection: FaqSection,
  },
})
```

When Storyblok returns content with `component: "Feature"`, it automatically renders the `Feature` React component.

## Data Fetching Patterns

### Server Components

All page and block components are React Server Components by default, allowing:
- Direct database/API access
- Zero client-side JavaScript for content
- Better SEO and performance

### Preview Mode

**Files**:
- `src/app/api/preview/route.ts` - Enable preview
- `src/app/api/exit-preview/route.ts` - Disable preview

Preview mode uses Next.js `draftMode()`:
- Enables viewing unpublished content
- Fetches 'draft' version instead of 'published'
- Bypasses cache with `cv` parameter

```typescript
if (isPreview || isDevelopment) {
  storiesParams.version = 'draft';
  storiesParams.cv = Date.now(); // Cache bust
}
```

## Metadata Generation

**File**: `src/app/getPageProps.ts:140`

Metadata is generated per-page:
- Title from page content or default
- Description from page or rich text intro
- Open Graph images (dynamic generation)
- Twitter card metadata
- Canonical URLs
- Robots directives (noindex support)

```typescript
export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const pageProps = await getPageProps({ slug, locale });

  return {
    title,
    description,
    openGraph: { ... },
    twitter: { ... },
    alternates: { canonical },
  }
}
```

## Environment-Specific Behavior

### Development
- Fetches draft content
- Cache-busted requests
- Verbose error messages

### Preview
- Fetches draft content
- Enabled via `/api/preview` route
- Allows Visual Editor bridge

### Production
- Fetches published content
- ISR with 5-minute revalidation
- Optimized caching

## Performance Optimizations

### 1. Incremental Static Regeneration (ISR)
- Pages regenerate every 5 minutes
- Stale content served instantly
- Background regeneration

### 2. Storyblok Client Caching
```typescript
cache: {
  clear: 'auto',
  type: 'memory',
}
```

### 3. Resolved Relations
Only relations defined in `RESOLVED_RELATIONS` are fetched:
```typescript
export const RESOLVED_RELATIONS_ARRAY = [];
export const RESOLVED_RELATIONS = RESOLVED_RELATIONS_ARRAY.join(',');
```

### 4. Parallel Data Fetching
Global settings, translations, and page content are fetched concurrently.

## Error Handling

### Not Found
- 404 status when slug doesn't exist
- Custom `not-found.tsx` page

### Redirects
- Content manager can define redirects in Global Settings
- Supports permanent and temporary redirects

### Missing Global Settings
- Throws error if global settings/translations missing
- Prevents partial page renders

## Special Routes

### API Routes
- `/api/preview` - Enable draft mode
- `/api/exit-preview` - Disable draft mode
- `/api/og` - Dynamic OG image generation
- `/api/default-og` - Default OG image

### Sitemap
- `src/app/sitemap.ts` - Dynamic sitemap generation
- Fetches all pages from Storyblok
- Excludes specific slugs (home, not-found, dev-page)

## Key Architectural Decisions

1. **Single Catch-All Route**: Simplifies routing, all logic in one place
2. **Server Components**: Maximum performance, minimal client JS
3. **Type Generation**: Automatic types from Storyblok schemas
4. **Component Mapping**: Direct CMS → React component mapping
5. **ISR**: Balance between static and dynamic content
6. **Locale Prefix**: "as-needed" - `/` for default locale, `/de` for German
