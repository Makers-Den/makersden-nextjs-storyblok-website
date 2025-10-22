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

### Content Container Pattern

**File**: `src/components/container/Container.tsx`

**IMPORTANT**: Block components with constrained content should **always** use the `Container` component to ensure content doesn't extend to the viewport edges. This provides consistent max-width and horizontal spacing across the site.

```typescript
import { Container } from '@/components/container/Container';

export function MyBlock({ blok }: { blok: MyBlockSbContent }) {
  return (
    <Container className='py-12' {...storyblokEditable(blok)}>
      <h2>{blok.title}</h2>
      <p>{blok.description}</p>
    </Container>
  );
}
```

**When to Use Container**:

- ✅ Text content sections
- ✅ Grid layouts with multiple columns
- ✅ Form sections
- ✅ FAQ sections
- ✅ List content
- ✅ Any content that should have consistent margins

**When NOT to Use Container**:

- ❌ Full-bleed background images or videos
- ❌ Edge-to-edge graphics
- ❌ Components that need to break out of container bounds

**Full-Bleed with Constrained Content Pattern**:

If you need a full-bleed background with constrained content, use Container inside:

```typescript
export function HeroSection({ blok }: { blok: HeroSectionSbContent }) {
  return (
    <section
      className='bg-primary py-24'
      {...storyblokEditable(blok)}
    >
      {/* Full-bleed background */}
      <Container>
        {/* Constrained content */}
        <h1>{blok.headline}</h1>
        <p>{blok.description}</p>
      </Container>
    </section>
  );
}
```

**Features**:

- Applies Tailwind's `container` class (responsive max-width)
- Centers content with `mx-auto`
- Accepts `className` for additional styling
- Renders as semantic `<section>` element
- Optional `id` prop for anchor links

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

**CRITICAL**: Always prefer using Typography component variants over custom text styles to ensure consistency across the site.

#### Available Typography Variants

**Convenience Components** (preferred):

```typescript
import {
  HeadingXl,
  HeadingLg,
  HeadingMd,
  HeadingSm,
  Text,
  TextLg,
  TextSm,
  TagText,
  TagTextSm,
  Quotation,
} from '@/components/typography/Typography';

// Headings
<HeadingXl as='h1'>Hero Headline</HeadingXl>      // Huge (only one per page)
<HeadingLg as='h2'>Section Title</HeadingLg>      // Large
<HeadingMd as='h3'>Subsection Title</HeadingMd>   // Medium
<HeadingSm as='h4'>Smaller Heading</HeadingSm>    // Small

// Body Text
<Text>Regular paragraph text</Text>               // Default paragraph
<TextLg>Larger paragraph text</TextLg>            // Large paragraph
<TextSm>Small paragraph text</TextSm>             // Small paragraph

// Special
<TagText>Category Tag</TagText>                   // Tag/label text
<Quotation>Quote text here</Quotation>            // Quotations
```

**Base Typography Component**:

```typescript
<Typography variant='text' as='p' className='my-4'>
  Content here
</Typography>
```

#### Typography Selection Guidelines

**When implementing a new block component:**

1. **Identify the text element** (heading, body, label, etc.)
2. **Choose the closest Typography variant** that matches the design
3. **If unsure which variant to use**, ask for guidance
4. **Never create custom text styles** - always use Typography variants

**Examples by Use Case:**

```typescript
// Page hero section
<HeadingXl as='h1'>{blok.heroTitle}</HeadingXl>

// Section titles
<HeadingLg as='h2'>{blok.sectionTitle}</HeadingLg>

// Card titles
<HeadingMd as='h3'>{blok.cardTitle}</HeadingMd>

// Body content
<Text>{blok.description}</Text>

// Intro/lead text
<TextLg>{blok.intro}</TextLg>

// Category labels
<TagText>{blok.category}</TagText>
```

#### Important Rules

**HeadingXl (H1) Usage**:
- There should only be **ONE** `HeadingXl` with `as='h1'` per page
- Typically used in hero sections
- Can use `HeadingXl` with `as='h2'` for visual XL styling on other elements

**Polymorphic `as` Prop**:
- Controls the actual HTML element rendered
- Allows semantic HTML while maintaining visual style
- Example: `<HeadingLg as='h2'>` renders `<h2>` with large heading styles

#### Features

- **Responsive sizing** - Font sizes adjust across breakpoints
- **Text balancing** - Optional `useBalancer` prop prevents orphans
- **Consistent spacing** - Predefined line heights and tracking
- **Accessible** - Semantic HTML tags with proper hierarchy

## Rich Text Pattern

### When to Use Typography vs Rich Text Utilities

**File**: `src/lib/richTextUtils.tsx`

**Decision Tree:**

1. **Plain string fields** → Use Typography components directly
2. **Storyblok rich text content (`SbRichtext` type)** → Use `renderText()` functions
3. **Title fields from Storyblok (`SbRichtext` type)** → Use `renderHeadingXl/Lg/Md()`

### Typography Components (for plain strings)

Use Typography components when the field is a **plain string**:

```typescript
import { HeadingLg, Text } from '@/components/typography/Typography';

export function SimpleBlock({ blok }: { blok: SimpleBlockSbContent }) {
  return (
    <Container>
      {/* Plain string field */}
      <HeadingLg as='h2'>{blok.title}</HeadingLg>
      <Text>{blok.description}</Text>
    </Container>
  );
}
```

### Rich Text Utilities (for Storyblok rich text)

Use `renderText()` functions when the field is **Storyblok rich text** (`SbRichtext` type):

```typescript
import { renderText } from '@/lib/richTextUtils';

export function RichTextBlock({ blok }: { blok: RichTextBlockSbContent }) {
  return (
    <Container>
      {/* SbRichtext field - full rich text with formatting */}
      {renderText(blok.content)}
    </Container>
  );
}
```

### Title Fields (Storyblok rich text as headings)

**IMPORTANT**: When a block component has a **title property** that is `SbRichtext` type, use the heading render functions:

```typescript
import {
  renderHeadingXl,
  renderHeadingLg,
  renderHeadingMd,
} from '@/lib/richTextUtils';

export function ContentSection({ blok }: { blok: ContentSectionSbContent }) {
  return (
    <Container>
      {/* Title as XL heading (hero sections) */}
      {renderHeadingXl(blok.title, 'h1')}

      {/* Title as Large heading (main sections) */}
      {renderHeadingLg(blok.sectionTitle, 'h2')}

      {/* Title as Medium heading (subsections) */}
      {renderHeadingMd(blok.cardTitle, 'h3')}

      {/* Body content as regular rich text */}
      {renderText(blok.bodyContent)}
    </Container>
  );
}
```

**Which render function to use for titles:**
- `renderHeadingXl()` - Hero titles, page headers (H1)
- `renderHeadingLg()` - Main section titles (H2)
- `renderHeadingMd()` - Subsection titles (H3)
- **If unsure**, ask for guidance

### Available Rich Text Render Functions

```typescript
// Default rendering (paragraphs, headings, lists, images)
renderText(blok.content)

// Large paragraph text
renderTextLg(blok.intro)

// Title as XL heading
renderHeadingXl(blok.title, 'h1')

// Title as Large heading
renderHeadingLg(blok.title, 'h2')

// Title as Medium heading
renderHeadingMd(blok.title, 'h3')

// Custom rendering with options
renderTextWithOptions(blok.intro, {
  className: 'text-gray-600',
  variant: 'textLg',
  useBalancer: true,
})
```

### Custom Rich Text Styling

Override specific node types when needed:

```typescript
import { renderText } from '@/lib/richTextUtils';
import { NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';
import { TextLg } from '@/components/typography/Typography';

{
  renderText(blok.intro, {
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => (
        <TextLg className='text-gray-600'>{children}</TextLg>
      ),
    },
  });
}
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
  withDefault = 'default value',
}: Props) {
  // ...
}
```

## Best Practices

### 1. Use Container for Constrained Content

```typescript
// Good - constrained content with Container
import { Container } from '@/components/container/Container';

export function TextSection({ blok }: { blok: TextSectionSbContent }) {
  return (
    <Container {...storyblokEditable(blok)}>
      {renderText(blok.content)}
    </Container>
  );
}

// Bad - content extends to viewport edges
export function TextSection({ blok }: { blok: TextSectionSbContent }) {
  return (
    <section {...storyblokEditable(blok)}>
      {renderText(blok.content)}
    </section>
  );
}
```

### 2. Use Typography Components for Text Consistency

```typescript
// Good - uses Typography components
import { HeadingLg, Text } from '@/components/typography/Typography';

export function ContentBlock({ blok }: { blok: ContentBlockSbContent }) {
  return (
    <Container>
      <HeadingLg as='h2'>{blok.title}</HeadingLg>
      <Text>{blok.description}</Text>
    </Container>
  );
}

// Bad - custom text styles
export function ContentBlock({ blok }: { blok: ContentBlockSbContent }) {
  return (
    <Container>
      <h2 className='text-4xl font-bold'>{blok.title}</h2>
      <p className='text-base'>{blok.description}</p>
    </Container>
  );
}
```

**For Storyblok rich text title fields:**

```typescript
// Good - uses renderHeadingLg for SbRichtext title
import { renderHeadingLg, renderText } from '@/lib/richTextUtils';

export function Section({ blok }: { blok: SectionSbContent }) {
  return (
    <Container>
      {renderHeadingLg(blok.title, 'h2')}
      {renderText(blok.content)}
    </Container>
  );
}

// Bad - uses renderText for titles
export function Section({ blok }: { blok: SectionSbContent }) {
  return (
    <Container>
      {renderText(blok.title)} {/* Wrong - titles need heading functions */}
      {renderText(blok.content)}
    </Container>
  );
}
```

### 3. Always Use Type Safety

```typescript
// Good
import { type FeatureSbContent } from '@/lib/storyblok';
export function Feature({ blok }: { blok: FeatureSbContent }) {}

// Bad
export function Feature({ blok }: { blok: any }) {}
```

### 4. Use storyblokEditable

```typescript
// Good - enables Visual Editor
<div {...storyblokEditable(blok)}>

// Bad - no Visual Editor support
<div>
```

### 5. Handle Optional Fields

```typescript
// Good - handles undefined
{blok.items?.map((item) => ...)}

// Bad - will crash if items is undefined
{blok.items.map((item) => ...)}
```

### 6. Use Semantic HTML

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

### 7. Extract Complex Logic

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

### 8. Use Utilities

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
export function Page() {}

// Good - Page components use default export
export default function Page() {}

// Good - Block components use named export
export function Feature() {}
```
