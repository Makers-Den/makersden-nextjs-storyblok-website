# Component Patterns

## Overview

This document describes the component architecture, naming conventions, and common patterns used throughout the application.

## Component Categories

### 1. Page Components (`src/page-components/`)

Top-level content types that represent full pages in Storyblok.

**Location**: `src/page-components/`

**Example**: `Page.tsx`

```typescript
import type { PageSbContent } from '@/lib/storyblok';
import type { PageComponentProps } from '@/types';

function Page({ blok, translations }: PageComponentProps<PageSbContent>) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <GenericStoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
          translations={translations}
        />
      ))}
    </main>
  );
}

export default Page;
```

**Characteristics**:
- Exported as default
- Receives `blok`, `translations`, and `locale`
- Uses `PageComponentProps<T>` type
- Renders body blocks via `GenericStoryblokComponent`
- Wraps content in semantic HTML (main, article, etc.)

### 2. Block Components (`src/block-components/`)

Reusable content blocks that can be nested within pages or other blocks.

**Location**: `src/block-components/[component-name]/`

**Example**: `Feature.tsx`

```typescript
import { storyblokEditable } from '@storyblok/react/rsc';
import { type FeatureSbContent } from '@/lib/storyblok';

export function Feature({ blok }: { blok: FeatureSbContent }) {
  return (
    <div className='column feature' {...storyblokEditable(blok)}>
      {blok.name}
    </div>
  );
}
```

**Characteristics**:
- Named export (not default)
- Each component in its own directory
- Receives `blok` prop with typed content
- Uses `storyblokEditable()` for Visual Editor
- Registered in `src/storyblok.ts`

### 3. UI Components (`src/components/`)

Generic React components not directly mapped to Storyblok.

**Location**: `src/components/[component-name]/`

**Examples**: `Typography`, `Container`, `StoryblokImage`

```typescript
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsxm('container mx-auto px-4', className)}>
      {children}
    </div>
  );
}
```

**Characteristics**:
- Standard React components
- Reusable across block/page components
- Not registered in Storyblok
- May include client components

## Component Patterns

### Editable Wrapper Pattern

Make components editable in Storyblok Visual Editor:

```typescript
import { storyblokEditable } from '@storyblok/react/rsc';

export function MyComponent({ blok }: { blok: MyComponentSbContent }) {
  return (
    <section {...storyblokEditable(blok)}>
      {/* Content */}
    </section>
  );
}
```

The `storyblokEditable()` function adds:
- `data-blok-c` attribute (component info)
- `data-blok-uid` attribute (unique ID)

### Nested Blocks Pattern

For components that contain other blocks:

**Example**: `Grid.tsx`

```typescript
import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

export function Grid({ blok }: { blok: GridSbContent }) {
  return (
    <div className='grid grid-cols-3' {...storyblokEditable(blok)}>
      {blok.columns?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
```

**Key Points**:
- Use `StoryblokServerComponent` to render nested blocks
- Always provide `key` prop (use `_uid`)
- TypeScript knows which components are allowed in `columns`

### Generic Component Wrapper

For passing translations and locale to nested components:

**File**: `src/components/generic-storyblok-component/GenericStoryblokComponent.tsx`

```typescript
export function GenericStoryblokComponent(props: Props): JSX.Element {
  return <BaseStoryblokComponent {...props} />;
}
```

Usage:

```typescript
{blok.body?.map((nestedBlok) => (
  <GenericStoryblokComponent
    blok={nestedBlok}
    key={nestedBlok._uid}
    translations={translations}
  />
))}
```

## Layout Pattern

### Global Layout

**File**: `src/components/layout/Layout.tsx`

```typescript
export function Layout({ children, locale, globalSettings }: LayoutProps) {
  const { navItems = [], footerItems = [] } = globalSettings.content;

  return (
    <div className='flex min-h-screen flex-col'>
      <Header navItems={navItems} locale={locale} />
      {children}
      <Footer footerItems={footerItems} />
    </div>
  );
}
```

**Characteristics**:
- Wraps all pages
- Provides header/footer from global settings
- Ensures consistent structure

### Header Component

**File**: `src/block-components/header/Header.tsx`

```typescript
export function Header({ navItems, locale }: HeaderProps) {
  return (
    <header>
      <nav>
        {navItems.map((item) => (
          <StoryblokLink key={item._uid} link={item.link}>
            {item.name}
          </StoryblokLink>
        ))}
      </nav>
      <LocaleSwitcher locale={locale} />
    </header>
  );
}
```

### Footer Component

Similar pattern to Header with footer-specific content.

## Image Handling

### StoryblokImage Component

**File**: `src/components/images/StoryblokImage.tsx`

Optimized image component for Storyblok assets:

```typescript
<StoryblokImage
  storyblokImage={blok.image}
  sizes='(min-width: 1024px) 50vw, 100vw'
  className='rounded-lg'
  priority={false}
/>
```

**Features**:
- Automatic Storyblok Image Service optimization
- Next.js Image component integration
- Responsive sizing
- Lazy loading by default

### PureStoryblokImage

**File**: `src/components/images/PureStoryblokImage.tsx`

For images without Next.js Image wrapper (e.g., background images):

```typescript
<PureStoryblokImage
  storyblokImage={blok.bgImage}
  width={1920}
  height={1080}
  className='absolute inset-0'
/>
```

## Link Handling

### StoryblokLink Component

**File**: `src/components/storyblok-link/StoryblokLink.tsx`

```typescript
<StoryblokLink link={blok.link} className='button'>
  {blok.linkText}
</StoryblokLink>
```

**Features**:
- Automatic href conversion
- Handles target and rel
- Next.js Link integration
- External link detection

## Typography Components

### Typography System

**File**: `src/components/typography/Typography.tsx`

Provides consistent typography with variants:

```typescript
// Base Typography component
<Typography variant='text' as='p' className='my-4'>
  Content here
</Typography>

// Convenience components
<HeadingXl as='h1'>Main Heading</HeadingXl>
<HeadingLg as='h2'>Subheading</HeadingLg>
<HeadingMd as='h3'>Section Title</HeadingMd>
<HeadingSm as='h4'>Subsection</HeadingSm>
<Text>Body text</Text>
<TextLg>Large body text</TextLg>
```

**Variants**:
- `headingXl` - Extra large headings
- `headingLg` - Large headings
- `headingMd` - Medium headings
- `headingSm` - Small headings
- `textLg` - Large body text
- `text` - Regular body text

**Features**:
- Polymorphic `as` prop (renders different HTML tags)
- Optional text balancing with `react-wrap-balancer`
- Consistent spacing and sizing
- Responsive typography

## Rich Text Pattern

### Rendering Rich Text

```typescript
import { renderText } from '@/lib/richTextUtils';

export function RichTextContent({ blok }: { blok: RichTextContentSbContent }) {
  return (
    <div className='prose'>
      {renderText(blok.text)}
    </div>
  );
}
```

### Custom Rich Text Styling

```typescript
import { renderTextWithOptions } from '@/lib/richTextUtils';

{renderTextWithOptions(blok.intro, {
  className: 'text-lg text-gray-600',
  variant: 'textLg',
  useBalancer: true,
})}
```

## FAQ Pattern

**File**: `src/block-components/faq-section/FaqSection.tsx`

Example of complex block with nested items:

```typescript
export function FaqSection({ blok }: { blok: FaqSectionSbContent }) {
  return (
    <section {...storyblokEditable(blok)}>
      {renderHeadingMd(blok.title, 'h2')}
      <Accordion type='single' collapsible>
        {blok.faqItems?.map((item) => (
          <AccordionItem key={item._uid} value={item._uid}>
            <AccordionTrigger>
              {renderText(item.question)}
            </AccordionTrigger>
            <AccordionContent>
              {renderText(item.answer)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
```

**Pattern**:
- Outer component with `storyblokEditable()`
- Maps over nested items
- Uses UI library components (Accordion)
- Renders rich text fields

## Context Providers

### CommonContextProviders

**File**: `src/components/common-context-providers/CommonContextProviders.tsx`

Wraps the app with necessary context providers:

```typescript
export function CommonContextProviders({ children }: Props) {
  return (
    <StoryblokProvider>
      {/* Add other providers here */}
      {children}
    </StoryblokProvider>
  );
}
```

### StoryblokProvider

**File**: `src/components/storyblok/StoryblokProvider.tsx`

Enables Storyblok Visual Editor bridge:

```typescript
export function StoryblokProvider({ children }: StoryblokProviderProps) {
  storyblokInit({
    accessToken: env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
  });

  return <>{children}</>;
}
```

## Locale Switching

### LocaleSwitcher Component

**File**: `src/components/local-switcher/LocaleSwitcher.tsx`

```typescript
<LocaleSwitcher locale={currentLocale} />
```

Provides language switching between configured locales.

## Server vs Client Components

### Server Components (Default)

All components are Server Components by default:

```typescript
// This is a Server Component
export function Feature({ blok }: { blok: FeatureSbContent }) {
  // Can fetch data directly
  // No event handlers
  // No browser APIs
  return <div>{blok.name}</div>;
}
```

**Benefits**:
- Zero JavaScript sent to client
- Direct data fetching
- Better SEO and performance

### Client Components

When needed, use `'use client'` directive:

```typescript
'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Use When**:
- Event handlers needed
- Browser APIs required
- React hooks (useState, useEffect)
- Third-party interactive libraries

## Component Naming Conventions

### File Names
- PascalCase for component files: `MyComponent.tsx`
- Match component name exactly

### Component Names
- PascalCase: `MyComponent`
- Descriptive and specific: `FaqSection` not `Faq`

### Directory Structure
- One directory per block component
- Co-locate related files

```
block-components/
  faq-section/
    FaqSection.tsx
    FaqSection.test.tsx (optional)
    index.ts (optional)
```

## Props Patterns

### Typed Props with SbContent

```typescript
interface ComponentProps {
  blok: FeatureSbContent;
  translations?: Translations;
  locale?: Locale;
}

export function Feature({ blok, translations, locale }: ComponentProps) {
  // ...
}
```

### Optional Props

Use TypeScript optional properties:

```typescript
interface Props {
  required: string;
  optional?: string;
  withDefault?: string;
}

export function MyComponent({
  required,
  optional,
  withDefault = 'default value'
}: Props) {
  // ...
}
```

## Best Practices

### 1. Always Use Type Safety

```typescript
// Good
import { type FeatureSbContent } from '@/lib/storyblok';
export function Feature({ blok }: { blok: FeatureSbContent }) { }

// Bad
export function Feature({ blok }: { blok: any }) { }
```

### 2. Use storyblokEditable

```typescript
// Good - enables Visual Editor
<div {...storyblokEditable(blok)}>

// Bad - no Visual Editor support
<div>
```

### 3. Handle Optional Fields

```typescript
// Good - handles undefined
{blok.items?.map((item) => ...)}

// Bad - will crash if items is undefined
{blok.items.map((item) => ...)}
```

### 4. Use Semantic HTML

```typescript
// Good
<article>
  <header>
    <h1>{blok.title}</h1>
  </header>
  <section>{content}</section>
</article>

// Bad
<div>
  <div>
    <div>{blok.title}</div>
  </div>
  <div>{content}</div>
</div>
```

### 5. Extract Complex Logic

```typescript
// Good - logic extracted
const getIconComponent = (iconName: string) => {
  const icons = {
    twitter: TwitterIcon,
    facebook: FacebookIcon,
  };
  return icons[iconName] || null;
};

export function SocialLinks({ blok }) {
  const Icon = getIconComponent(blok.icon);
  return Icon ? <Icon /> : null;
}

// Bad - complex logic inline
export function SocialLinks({ blok }) {
  return (
    <>
      {blok.icon === 'twitter' ? (
        <TwitterIcon />
      ) : blok.icon === 'facebook' ? (
        <FacebookIcon />
      ) : null}
    </>
  );
}
```

### 6. Use Utilities

```typescript
// Good - use utility
<div className={clsxm('base-class', isActive && 'active')}>

// Bad - manual string concatenation
<div className={`base-class ${isActive ? 'active' : ''}`}>
```

## Common Mistakes to Avoid

### 1. Forgetting Key Prop

```typescript
// Bad
{items.map(item => <div>{item.name}</div>)}

// Good
{items.map(item => <div key={item._uid}>{item.name}</div>)}
```

### 2. Not Handling Empty States

```typescript
// Bad
<div>{blok.items.map(...)}</div>

// Good
<div>
  {!blok.items?.length && <p>No items</p>}
  {blok.items?.map(...)}
</div>
```

### 3. Using Client Components Unnecessarily

```typescript
// Bad - doesn't need to be client component
'use client';
export function StaticContent({ content }) {
  return <div>{content}</div>;
}

// Good - server component
export function StaticContent({ content }) {
  return <div>{content}</div>;
}
```

### 4. Not Exporting Correctly

```typescript
// Bad - Page components
export function Page() { }

// Good - Page components use default export
export default function Page() { }

// Good - Block components use named export
export function Feature() { }
```
