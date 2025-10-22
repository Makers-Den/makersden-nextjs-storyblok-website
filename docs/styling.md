# Styling

## Overview

The project uses Tailwind CSS v4 with a custom design system based on CSS custom properties and the modern `@theme` directive.

## Tailwind CSS v4

### Configuration

Tailwind v4 uses CSS-based configuration instead of JavaScript config files.

**File**: `src/styles/globals.css`

All Tailwind configuration is done via CSS:

```css
@import 'tailwindcss';

@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Design tokens defined here */
}
```

### No tailwind.config.js

Unlike Tailwind v3, there is **no** `tailwind.config.ts` file in v4. All configuration is in CSS.

## Design System

### Color System

The project uses OKLCH color space for better perceptual uniformity:

```css
:root {
  --background: oklch(1 0 0); /* White */
  --foreground: oklch(0.145 0 0); /* Near black */
  --primary: oklch(0.205 0 0); /* Dark gray */
  --primary-foreground: oklch(0.985 0 0); /* Light */
  /* ... more colors */
}
```

**Benefits of OKLCH**:

- Perceptually uniform
- Better interpolation for gradients
- More predictable lightness adjustments

### Dark Mode

Dark mode variants are defined separately:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  /* ... dark variants */
}
```

**Usage**:

```tsx
<div className='bg-background text-foreground'>
  {/* Automatically switches in dark mode */}
</div>
```

### Design Tokens

All tokens are mapped in `@theme`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --font-sans: var(--font-sans);
}
```

## Utility Classes

### Layout

#### Container Component

**File**: `src/components/container/Container.tsx`

**IMPORTANT**: Always use the `Container` component for block components with constrained content. This ensures consistent max-width and centering across the site.

```typescript
import { Container } from '@/components/container/Container';

// Block component with constrained content
export function ContentSection({ blok }) {
  return (
    <Container className="py-16">
      <h2>{blok.title}</h2>
      <p>{blok.description}</p>
    </Container>
  );
}
```

**Container Features**:

- Applies Tailwind's `container` class (responsive max-width)
- Centers content with `mx-auto`
- Semantic `<section>` element
- Accepts custom `className` for additional styling
- Optional `id` prop for anchor links

**Container Max Widths** (from Tailwind defaults):

- No breakpoint: `100%`
- `sm` (640px): `640px`
- `md` (768px): `768px`
- `lg` (1024px): `1024px`
- `xl` (1280px): `1280px`
- `2xl` (1536px): `1536px`

**Pattern: Full-Bleed Background with Constrained Content**:

```typescript
export function HeroSection({ blok }) {
  return (
    <section
      className="bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${imageUrl})` }}
      {...storyblokEditable(blok)}
    >
      {/* Full-bleed background extends to edges */}
      <Container>
        {/* Content is constrained */}
        <h1 className="text-4xl">{blok.headline}</h1>
        <p>{blok.description}</p>
      </Container>
    </section>
  );
}
```

**When NOT to use Container**:

- Full-width hero images/videos
- Edge-to-edge galleries
- Background sections that should span full viewport
- Components that intentionally break out of container bounds

#### Flex Layouts
<div className='flex items-center justify-between'>
<div className='flex flex-col gap-4'>

// Grid layouts
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

// Full height
<div className='min-h-screen flex flex-col'>
```

### Spacing

Uses Tailwind's default spacing scale (4px base unit):

```tsx
<div className='p-4'>      {/* padding: 1rem (16px) */}
<div className='px-6 py-4'> {/* padding: 1.5rem 1rem */}
<div className='mt-8 mb-4'> {/* margin-top: 2rem, margin-bottom: 1rem */}
<div className='gap-2'>     {/* gap: 0.5rem (8px) */}
```

### Typography

**File**: `src/components/typography/Typography.tsx`

**CRITICAL**: Always use Typography component variants instead of raw Tailwind typography classes. This ensures consistency across the entire site.

#### Typography Components (Preferred)

```tsx
import {
  HeadingXl,
  HeadingLg,
  HeadingMd,
  HeadingSm,
  Text,
  TextLg,
  TextSm,
} from '@/components/typography/Typography';

// Headings - use these for all headings
<HeadingXl as='h1'>Hero Title</HeadingXl>     // Extra large (H1)
<HeadingLg as='h2'>Section Title</HeadingLg>  // Large (H2)
<HeadingMd as='h3'>Card Title</HeadingMd>     // Medium (H3)
<HeadingSm as='h4'>Small Title</HeadingSm>    // Small (H4)

// Body text - use these for all text content
<Text>Regular paragraph</Text>                 // Default
<TextLg>Large intro text</TextLg>             // Large paragraph
<TextSm>Small helper text</TextSm>            // Small text
```

**Features:**
- Responsive font sizes with fluid scaling
- Consistent line heights and letter spacing
- Design system integration
- Semantic HTML with polymorphic `as` prop

**Important Rules:**
1. **Never use raw Tailwind typography classes** (text-sm, text-xl, font-bold, etc.) for content text
2. **Always select the closest Typography variant** that matches your design needs
3. **If unsure which variant to use**, ask for guidance
4. **One HeadingXl (H1) per page** - use `HeadingXl as='h2'` if you need XL styling elsewhere

#### Tailwind Typography Classes (Avoid for Content)

Only use these for very specific edge cases or overrides:

```tsx
// ❌ Avoid - use Typography components instead
<p className='text-sm'>...</p>
<h2 className='text-2xl font-bold'>...</h2>

// ✅ Correct
<TextSm>...</TextSm>
<HeadingLg as='h2'>...</HeadingLg>

// ✅ OK for utility purposes (badges, buttons, etc.)
<span className='text-xs uppercase tracking-wide'>Badge</span>
```

#### Raw Tailwind Reference (for rare overrides only)

```tsx
// Text sizes
text-sm    {/* 0.875rem */}
text-base  {/* 1rem */}
text-lg    {/* 1.125rem */}
text-xl    {/* 1.25rem */}

// Font weights
font-normal    {/* 400 */}
font-semibold  {/* 600 */}
font-bold      {/* 700 */}

// Line height
leading-tight   {/* 1.25 */}
leading-normal  {/* 1.5 */}
```

### Colors

Using design tokens:

```tsx
// Background colors
<div className='bg-background'>
<div className='bg-primary'>
<div className='bg-secondary'>
<div className='bg-muted'>

// Text colors
<p className='text-foreground'>
<p className='text-primary'>
<p className='text-muted-foreground'>

// Border colors
<div className='border border-border'>
```

### Responsive Design

Mobile-first breakpoints:

```tsx
// Default (mobile): < 640px
// sm: 640px and up
// md: 768px and up
// lg: 1024px and up
// xl: 1280px and up
// 2xl: 1536px and up

<div className='
  text-sm          {/* mobile */}
  md:text-base     {/* tablet+ */}
  lg:text-lg       {/* desktop+ */}
'>

<div className='
  grid-cols-1      {/* mobile: 1 column */}
  md:grid-cols-2   {/* tablet: 2 columns */}
  lg:grid-cols-3   {/* desktop: 3 columns */}
'>
```

## Component Styling Patterns

### Base Layer Styles

Global styles applied to all elements:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### clsxm Utility

For conditional and merged classes:

```tsx
import clsxm from '@/lib/clsxm';

<div className={clsxm(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
  className // Allow prop override
)}>
```

### Component Variants with CVA

While not currently used, the project includes `class-variance-authority`:

```tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Usage
<button className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
```

## Shadcn/ui Integration

The project is configured for shadcn/ui components.

**File**: `components.json`

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/lib/hooks"
  }
}
```

### Adding Shadcn Components

```bash
# Add a component
npx shadcn@latest add button

# Add multiple
npx shadcn@latest add button card dialog
```

Components are added to `src/components/ui/`.

### Existing Shadcn Components

**File**: `src/components/ui/accordion.tsx`

Already includes Accordion component (used in FAQ section).

## Animation

### Tailwind Animate Plugin

**Plugin**: `tailwindcss-animate`

Provides animation utilities:

```tsx
// Fade in
<div className='animate-in fade-in duration-300'>

// Slide in from bottom
<div className='animate-in slide-in-from-bottom-4'>

// Spin
<div className='animate-spin'>

// Pulse
<div className='animate-pulse'>
```

### Custom Animations

Define in globals.css if needed:

```css
@keyframes custom-animation {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
```

## Form Styling

### Tailwind Forms Plugin

**Plugin**: `@tailwindcss/forms`

Provides better default form styles:

```tsx
// Styled automatically
<input type="text" className="rounded-md border-gray-300" />
<select className="rounded-md border-gray-300">
<textarea className="rounded-md border-gray-300">
```

## Typography Component

**File**: `src/components/typography/Typography.tsx`

Provides consistent text styling:

```tsx
import {
  HeadingXl,
  HeadingLg,
  HeadingMd,
  HeadingSm,
  TextLg,
  Text,
} from '@/components/typography/Typography';

// Usage
<HeadingXl as='h1'>Main Title</HeadingXl>
<HeadingLg as='h2'>Section Title</HeadingLg>
<TextLg>Large body text</TextLg>
<Text>Regular body text</Text>
```

**Features**:

- Polymorphic `as` prop (semantic HTML)
- Consistent sizing and spacing
- Optional text balancing
- Responsive typography

## Custom Styles

### Global Styles

**File**: `src/styles/globals.css`

```css
@import 'tailwindcss';
@plugin "tailwindcss-animate";

/* Custom variant */
@custom-variant dark (&:is(.dark *));

/* Theme tokens */
@theme inline {
  /* ... */
}

/* Root variables */
:root {
  /* ... */
}

/* Dark mode */
.dark {
  /* ... */
}

/* Base styles */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Best Practices

### 1. Use Design Tokens

```tsx
// Good - uses design token
<div className='bg-primary text-primary-foreground'>

// Bad - hardcoded color
<div className='bg-blue-600 text-white'>
```

### 2. Mobile-First Responsive

```tsx
// Good - mobile-first
<div className='text-sm md:text-base lg:text-lg'>

// Bad - desktop-first requires more code
<div className='text-lg md:text-base sm:text-sm'>
```

### 3. Use clsxm for Conditional Classes

```tsx
// Good
className={clsxm('base', isActive && 'active', className)}

// Bad
className={`base ${isActive ? 'active' : ''} ${className || ''}`}
```

### 4. Consistent Spacing Scale

```tsx
// Good - uses Tailwind scale
<div className='space-y-4'>
  <div className='p-4'>
  <div className='mt-8'>

// Bad - arbitrary values
<div style={{ marginTop: '37px' }}>
```

### 5. Leverage Typography Components

```tsx
// Good - consistent
<HeadingLg as='h2'>Title</HeadingLg>

// Less ideal - manual classes
<h2 className='text-3xl font-bold'>Title</h2>
```

### 6. Use Semantic Color Names

```tsx
// Good - semantic
<button className='bg-primary hover:bg-primary/90'>

// Bad - specific color
<button className='bg-blue-600 hover:bg-blue-700'>
```

## Common Patterns

### Card Pattern

```tsx
<div className='bg-card rounded-lg border p-6 shadow-sm'>
  <h3 className='text-lg font-semibold'>Card Title</h3>
  <p className='text-muted-foreground text-sm'>Card content</p>
</div>
```

### Button Pattern

```tsx
<button className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 transition-colors disabled:pointer-events-none disabled:opacity-50'>
  Button Text
</button>
```

### Input Pattern

```tsx
<input
  type='text'
  className='border-input bg-background placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
/>
```

### Section Pattern

```tsx
<section className='py-12 md:py-24'>
  <div className='container mx-auto px-4'>
    <HeadingLg as='h2' className='mb-8'>
      Section Title
    </HeadingLg>
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {/* Content */}
    </div>
  </div>
</section>
```

## Debugging Styles

### Tailwind CSS IntelliSense

VSCode extension provides:

- Autocomplete for classes
- Hover previews
- Linting
- Syntax highlighting

### Browser DevTools

Use DevTools to:

- Inspect computed styles
- See which Tailwind classes are applied
- Debug responsive breakpoints
- Test dark mode

### Tailwind Play

Test styles at https://play.tailwindcss.com

## Performance Considerations

### PurgeCSS

Tailwind automatically removes unused styles in production.

**Only generated classes are included**:

- Static: `className='text-lg'` ✓
- Template literals with full classes: `className='text-${size}'` ✗
- Dynamic with complete classes: `className={size === 'lg' ? 'text-lg' : 'text-sm'}` ✓

### JIT Mode

Tailwind v4 uses Just-In-Time compilation by default:

- Generates styles on-demand
- Smaller development builds
- Arbitrary values supported: `w-[37px]`

## Migration Notes

### From Tailwind v3 to v4

Key differences:

1. No `tailwind.config.js` - use CSS `@theme`
2. `@import` instead of `@tailwind`
3. Design tokens in CSS custom properties
4. New `@plugin` directive
5. Built-in dark mode via `@custom-variant`

### Upgrading Components

When adding Tailwind v3 components, update to v4:

```css
/* v3 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 */
@import 'tailwindcss';
```

## Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [OKLCH Color Picker](https://oklch.com/)
- [Shadcn/ui Components](https://ui.shadcn.com/)
