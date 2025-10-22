# Utilities and Helper Functions

## Overview

This document catalogs all utility functions and helpers available in the codebase, organized by category.

## Styling Utilities

### clsxm

**File**: `src/lib/clsxm.ts`

Merges Tailwind CSS classes intelligently, handling conflicts:

```typescript
import clsxm from '@/lib/clsxm';

// Basic usage
clsxm('base-class', 'another-class');
// → 'base-class another-class'

// Conditional classes
clsxm('base', isActive && 'active', isDisabled && 'disabled');
// → 'base active' (if both true)

// Handles Tailwind conflicts
clsxm('px-4 py-2', 'px-6');
// → 'py-2 px-6' (px-6 overrides px-4)

// Arrays and objects
clsxm(['base', 'more'], { active: isActive, disabled: isDisabled });
```

**Use Case**: Combining conditional classes and avoiding Tailwind conflicts.

## String Utilities

### truncate

**File**: `src/lib/truncate.ts`

Truncates text to specified length:

```typescript
import { truncate } from '@/lib/truncate';

truncate('Long text here', 10);
// → 'Long te...'

truncate('Short', 10);
// → 'Short'
```

### sentenceToId

**File**: `src/lib/sentenceToId.ts`

Converts text to URL-friendly ID:

```typescript
import { sentenceToId } from '@/lib/sentenceToId';

sentenceToId('This is a Heading!')
// → 'this-is-a-heading'

// Use for heading IDs
<h2 id={sentenceToId(headingText)}>{headingText}</h2>
```

**Features**:

- Lowercase
- Removes special characters
- Replaces spaces with hyphens

### String Helpers

**File**: `src/lib/utils/string.ts`

```typescript
// Capitalize first letter
capitalize('hello world');
// → 'Hello world'

// Other string utilities...
```

## React Utilities

### getStringFromReactNode

**File**: `src/lib/getStringFromReactNode.ts`

Extracts text content from React elements:

```typescript
import { getStringFromReactNode } from '@/lib/getStringFromReactNode';

const element = <div>Hello <strong>World</strong></div>;
getStringFromReactNode(element)
// → 'Hello World'
```

**Use Case**: Getting plain text from JSX for IDs, meta tags, etc.

### convertComponentToString

**File**: `src/lib/convertComponentToString.ts`

Similar to `getStringFromReactNode` but for components:

```typescript
convertComponentToString(<MyComponent />)
// → String representation
```

## URL and Link Utilities

### sbLinkToHref

**File**: `src/lib/storyblok/sbLinkToHref.ts`

Converts Storyblok link objects to URLs:

```typescript
import { sbLinkToHref } from '@/lib/storyblok';

// Story link
sbLinkToHref({ linktype: 'story', cached_url: 'about-us', story: {...} })
// → '/about-us'

// URL link
sbLinkToHref({ linktype: 'url', url: 'https://example.com' })
// → 'https://example.com'

// Asset link
sbLinkToHref({ linktype: 'asset', url: '/files/doc.pdf' })
// → '/files/doc.pdf'

// Email link
sbLinkToHref({ linktype: 'email', email: 'hello@example.com' })
// → 'mailto:hello@example.com'

// With anchor
sbLinkToHref({ linktype: 'story', cached_url: 'about', anchor: 'team' })
// → '/about#team'
```

### sbLinkToButtonLinkProps

Converts link to button props:

```typescript
import { sbLinkToButtonLinkProps } from '@/lib/storyblok';

const linkProps = sbLinkToButtonLinkProps(blok.link, blok.linkText);
// → { href: '/about', children: 'Learn More' }

// Use with button component
{linkProps && <Button {...linkProps} />}
```

### linkContentsToButtonLinkProps

For arrays of link content:

```typescript
const linkProps = linkContentsToButtonLinkProps(blok.links);
// Returns props from first valid link
```

### ensurePrecedingSlash

**File**: `src/lib/storyblok/sbLinkToHref.ts:128`

Ensures internal links start with slash:

```typescript
ensurePrecedingSlash('about-us');
// → '/about-us'

ensurePrecedingSlash('/about-us');
// → '/about-us'

ensurePrecedingSlash('https://example.com');
// → 'https://example.com'
```

### getCanonicalUrl

**File**: `src/lib/getCanonicalUrl.ts`

Builds canonical URLs:

```typescript
import { getCanonicalUrl } from '@/lib/getCanonicalUrl';

getCanonicalUrl('/about-us');
// → 'https://yourdomain.com/about-us'
```

### buildOgImageUrl

**File**: `src/lib/buildOgImageUrl.ts`

Generates Open Graph image URLs:

```typescript
import { buildOgImageUrl } from '@/lib/buildOgImageUrl';

buildOgImageUrl({
  title: 'Page Title',
  image: 'https://cdn.storyblok.com/...',
  illustration: 'https://cdn.storyblok.com/...',
});
// → URL to generated OG image
```

**Logic**:

- Uses custom image if provided
- Falls back to illustration
- Generates dynamic image via `/api/og`

## Type Guards

**File**: `src/lib/typeGuards.ts`

Type guards for Storyblok link types:

```typescript
import {
  isLinkStory,
  isLinkUrl,
  isLinkAsset,
  isLinkEmail,
  isLinkWithAnchor,
} from '@/lib/typeGuards';

// Story link
if (isLinkStory(link)) {
  // TypeScript knows link.story exists
  console.log(link.story.full_slug);
}

// URL link
if (isLinkUrl(link)) {
  console.log(link.url);
}

// Asset link
if (isLinkAsset(link)) {
  console.log(link.url);
}

// Email link
if (isLinkEmail(link)) {
  console.log(link.email);
}

// Has anchor
if (isLinkWithAnchor(link)) {
  console.log(link.anchor);
}
```

## Rich Text Utilities

### isRichtext

**File**: `src/lib/isRichtext.ts`

Checks if rich text field has content:

```typescript
import { isRichtextNotEmpty } from '@/lib/isRichtext';

if (isRichtextNotEmpty(blok.intro)) {
  // Render intro
}
```

### richTextToString

**File**: `src/lib/richTextUtils.tsx:102`

Converts rich text to plain string:

```typescript
import { richTextToString } from '@/lib/richTextUtils';

const plainText = richTextToString(blok.richContent);
// → 'This is the text without HTML'
```

### richtextToString (alternative)

**File**: `src/lib/richTextUtils.tsx:354`

Alternative implementation:

```typescript
import { richtextToString } from '@/lib/richTextUtils';

const text = richtextToString(richtext);
```

## Environment and Config

### Constants

**File**: `src/lib/constants.ts`

```typescript
import {
  isDevelopment,
  isProduction,
  isPreviewEnv,
  CANONICAL_BASE_URL_NO_SLASH,
} from '@/lib/constants';

// Environment checks
if (isDevelopment) {
  // Dev-only code
}

if (isPreviewEnv) {
  // Preview environment code
}

// Site URL
console.log(CANONICAL_BASE_URL_NO_SLASH);
// → 'https://yourdomain.com'
```

### Environment Variables

**File**: `src/env.ts`

Type-safe environment variable access:

```typescript
import { env } from '@/env';

// Server-side only
env.STORYBLOK_SPACE_ID;

// Client-side accessible
env.NEXT_PUBLIC_STORYBLOK_TOKEN;
env.NEXT_PUBLIC_SITE_URL;
```

**Features**:

- Runtime validation with Zod
- Type-safe access
- Automatic environment detection

## Development Utilities

### getDevUrl

**File**: `src/lib/getDevUrl.ts`

Gets development environment URL:

```typescript
import { getDevUrl } from '@/lib/getDevUrl';

const url = getDevUrl();
// → 'http://localhost:3000' or custom dev URL
```

### log

**File**: `src/lib/log.ts`

Enhanced logging utility:

```typescript
import { log } from '@/lib/log';

log('info', 'User logged in', { userId: 123 });
log('error', 'Failed to fetch', { error });
log('debug', 'State updated', { state });
```

**Features**:

- Structured logging
- Development-only output
- Type-safe log levels

### delay

**File**: `src/lib/delay.ts`

Promise-based delay:

```typescript
import { delay } from '@/lib/delay';

async function slowOperation() {
  await delay(1000); // Wait 1 second
  // Continue...
}
```

## Math Utilities

### lerp

**File**: `src/lib/lerp.ts`

Linear interpolation:

```typescript
import { lerp } from '@/lib/lerp';

lerp(0, 100, 0.5);
// → 50

lerp(10, 20, 0.25);
// → 12.5
```

**Use Case**: Animations, smooth transitions, progress calculations.

## Custom Hooks

### useIsActivePath

**File**: `src/lib/hooks/useIsActivePath.ts`

Checks if path is currently active:

```typescript
'use client';
import { useIsActivePath } from '@/lib/hooks/useIsActivePath';

export function NavItem({ href, children }) {
  const isActive = useIsActivePath(href);

  return (
    <Link
      href={href}
      className={clsxm('nav-item', isActive && 'active')}
    >
      {children}
    </Link>
  );
}
```

**Features**:

- Exact or partial matching
- Handles localized paths
- Works with Next.js router

### useOnNavigation

**File**: `src/lib/hooks/useOnNavigation.ts`

Executes callback on route changes:

```typescript
'use client';
import { useOnNavigation } from '@/lib/hooks/useOnNavigation';

export function MyComponent() {
  useOnNavigation(() => {
    console.log('Route changed!');
    // Reset state, close modals, etc.
  });

  return <div>...</div>;
}
```

**Use Case**: Cleanup on navigation, analytics, state resets.

## Getter Utilities

**File**: `src/lib/utils/getters.ts`

Helper functions for extracting data:

```typescript
// Get first item from array safely
getFirst([1, 2, 3]);
// → 1

getFirst([]);
// → undefined

// Get property safely
getProperty(obj, 'nested.deep.property', 'default');
```

## Image URL Utilities

### Storyblok Image Service

Storyblok provides image service parameters:

```typescript
// Resize
`${imageUrl}/m/800x600`
// Filters
`${imageUrl}/filters:quality(80)`
// Format
`${imageUrl}/filters:format(webp)`
// Combined
`${imageUrl}/m/800x600/filters:quality(80):format(webp)`;
```

**StoryblokImage component handles this automatically.**

## Utility Best Practices

### 1. Import from Index

Most utilities can be imported from main lib folder:

```typescript
// Good
import { sbLinkToHref, isRichtextNotEmpty } from '@/lib/storyblok';

// Less ideal
import { sbLinkToHref } from '@/lib/storyblok/sbLinkToHref';
```

### 2. Use Type Guards

```typescript
// Good
if (isLinkStory(link)) {
  const slug = link.story.full_slug; // Type-safe
}

// Bad
if (link.linktype === 'story') {
  const slug = link.story.full_slug; // No type safety
}
```

### 3. Leverage clsxm

```typescript
// Good
className={clsxm('base', props.className, isActive && 'active')}

// Bad
className={`base ${props.className || ''} ${isActive ? 'active' : ''}`}
```

### 4. Use Environment Constants

```typescript
// Good
if (isDevelopment) {
  enableDebugMode();
}

// Bad
if (process.env.NODE_ENV === 'development') {
  enableDebugMode();
}
```

### 5. Check Rich Text Before Rendering

```typescript
// Good
{
  isRichtextNotEmpty(blok.content) && renderText(blok.content);
}

// Bad - might render empty divs
{
  renderText(blok.content);
}
```

## Testing Utilities

The project includes test utilities:

**File**: `src/lib/__tests__/buildOgImageUrl.test.ts`
**File**: `src/lib/__tests__/sbLinkToHref.test.ts`

Example test:

```typescript
import { sbLinkToHref } from '@/lib/storyblok';

describe('sbLinkToHref', () => {
  it('converts story link', () => {
    const result = sbLinkToHref({
      linktype: 'story',
      cached_url: 'about-us',
    });
    expect(result).toBe('/about-us');
  });
});
```

## When to Create New Utilities

Create a utility when:

1. Logic is used in 3+ places
2. Function is pure (no side effects)
3. Functionality is generic and reusable
4. Testing logic separately is valuable

Place in:

- `src/lib/` for general utilities
- `src/lib/storyblok/` for Storyblok-specific
- `src/lib/utils/` for categorized helpers
- `src/lib/hooks/` for custom React hooks
