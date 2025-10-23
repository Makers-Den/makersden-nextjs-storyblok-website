# Agent Guidelines for Makers' Den Storyblok Website

## Overview

This document establishes the core tenets and guidelines that all coding agents must follow when working on this codebase. These rules ensure consistency, maintainability, and adherence to established patterns.

## Documentation Reference

Before starting any work, consult the comprehensive documentation in the `docs/` directory:

- **[docs/README.md](./docs/README.md)** - Start here for overview and quick reference
- **[docs/architecture.md](./docs/architecture.md)** - Understand the routing and data flow
- **[docs/storyblok-integration.md](./docs/storyblok-integration.md)** - Learn CMS integration patterns
- **[docs/component-patterns.md](./docs/component-patterns.md)** - Component structure and conventions
- **[docs/utilities.md](./docs/utilities.md)** - Available helper functions
- **[docs/styling.md](./docs/styling.md)** - Tailwind CSS patterns
- **[docs/internationalization.md](./docs/internationalization.md)** - i18n implementation
- **[docs/type-system.md](./docs/type-system.md)** - TypeScript patterns

## Core Tenets

### 1. Type Safety First

**MUST:**

- Use generated TypeScript types from Storyblok (`src/lib/storyblok/blockLibraryTypes.ts`)
- Type all component props explicitly
- Never use `any` unless absolutely necessary
- Use type guards from `src/lib/typeGuards.ts`

**MUST NOT:**

- Use loose typing (`any`, `unknown` without guards)
- Skip type annotations on functions
- Ignore TypeScript errors

**Example:**

```typescript
// ✅ CORRECT
import { type FeatureSbContent } from '@/lib/storyblok';
export function Feature({ blok }: { blok: FeatureSbContent }) {}

// ❌ WRONG
export function Feature({ blok }: { blok: any }) {}
```

### 2. Component Structure

**MUST:**

- Place page components in `src/page-components/`
- Place block components in `src/block-components/[component-name]/`
- Place UI components in `src/components/[component-name]/`
- Use named exports for block components
- Use default exports for page components
- Use `SectionWrapper` for block components with `backgroundColor`, `spacingTop`, or `spacingBottom` props

**MUST NOT:**

- Mix component types in wrong directories
- Create components without proper directory structure
- Skip `storyblokEditable()` wrapper on block components
- Implement custom spacing/background logic when component has section styling props

**Example:**

```typescript
// ✅ CORRECT - Block Component
// File: src/block-components/feature/Feature.tsx
import { storyblokEditable } from '@storyblok/react/rsc';

export function Feature({ blok }: { blok: FeatureSbContent }) {
  return <div {...storyblokEditable(blok)}>{blok.name}</div>;
}

// ✅ CORRECT - Block Component with Section Styling
// File: src/block-components/faq-section/FaqSection.tsx
import { storyblokEditable } from '@storyblok/react/rsc';
import { SectionWrapper } from '@/components/section-wrapper/SectionWrapper';
import { Container } from '@/components/container/Container';

export function FaqSection({ blok }: { blok: FaqSectionSbContent }) {
  return (
    <SectionWrapper
      color={blok.backgroundColor}
      spacingTop={blok.spacingTop}
      spacingBottom={blok.spacingBottom}
      {...storyblokEditable(blok)}
    >
      <Container>
        {/* Component content */}
      </Container>
    </SectionWrapper>
  );
}

// ✅ CORRECT - Page Component
// File: src/page-components/Page.tsx
export default function Page({ blok, translations }: PageComponentProps<PageSbContent>) {
  return <main {...storyblokEditable(blok)}>...</main>;
}
```

### 3. Storyblok Integration

**MUST:**

- Register new components in `src/storyblok.ts`
- Run `pnpm generate-sb-types` after schema changes
- Use repository functions (`findStory`, `findStories`) for data fetching
- Use `StoryblokServerComponent` for nested blocks
- Add `{...storyblokEditable(blok)}` to make components editable

**MUST NOT:**

- Make direct Storyblok API calls bypassing repository layer
- Modify generated types manually
- Skip component registration
- Forget to regenerate types after Storyblok changes

**Example:**

```typescript
// ✅ CORRECT
import { findStory } from '@/lib/storyblok/storyblokRepository';
const { story } = await findStory({ slug: 'about-us', locale: 'en' });

// ❌ WRONG
const response = await fetch('https://api.storyblok.com/...');
```

### 4. Styling with Tailwind

**MUST:**

- Use Tailwind utility classes
- Use design tokens (`bg-primary`, `text-foreground`)
- Use `clsxm` for conditional classes
- Follow mobile-first responsive design
- Use Typography components for text

**MUST NOT:**

- Use inline styles unless absolutely necessary
- Hardcode colors (use design tokens)
- Skip responsive breakpoints
- Create custom CSS files (use Tailwind)

**Example:**

```typescript
// ✅ CORRECT
import clsxm from '@/lib/clsxm';
<div className={clsxm(
  'bg-primary text-primary-foreground',
  'px-4 py-2 rounded-lg',
  isActive && 'ring-2 ring-ring',
  className
)}>

// ❌ WRONG
<div style={{ backgroundColor: '#1a1a1a', padding: '8px 16px' }}>
```

### 5. Server Components Default

**MUST:**

- Use React Server Components by default
- Only add `'use client'` when necessary (interactivity, browser APIs, hooks)
- Keep client components small and focused
- Fetch data in Server Components

**MUST NOT:**

- Add `'use client'` unnecessarily
- Fetch data in Client Components without good reason
- Mix server and client logic inappropriately

**Example:**

```typescript
// ✅ CORRECT - Server Component (default)
export async function Feature({ blok }: { blok: FeatureSbContent }) {
  const data = await fetchSomeData(); // Can fetch directly
  return <div>{blok.name}</div>;
}

// ✅ CORRECT - Client Component (when needed)
'use client';
export function InteractiveFeature() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 6. Internationalization

**MUST:**

- Use `next-intl` for all translations
- Import `Link` from `@/i18n/navigation`, not `next/link`
- Add translations to `locales/[locale].json`
- Use semantic translation keys
- Support all configured locales (en, de)

**MUST NOT:**

- Hardcode user-facing strings
- Use `next/link` directly
- Skip locale parameter when fetching Storyblok content
- Forget to update both locale files

**Example:**

```typescript
// ✅ CORRECT
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export function Nav() {
  const t = useTranslations('navigation');
  return <Link href="/about">{t('about')}</Link>;
}

// ❌ WRONG
import Link from 'next/link';
export function Nav() {
  return <Link href="/about">About</Link>;
}
```

### 7. Rich Text Handling

**MUST:**

- Use `renderText()` or variants from `src/lib/richTextUtils.tsx`
- Check if rich text has content with `isRichtextNotEmpty()`
- Use appropriate rendering function for context
- Allow custom node resolvers when needed

**MUST NOT:**

- Render rich text fields directly
- Skip empty checks
- Create custom rich text renderers without good reason

**Example:**

```typescript
// ✅ CORRECT
import { renderText, isRichtextNotEmpty } from '@/lib/richTextUtils';

{isRichtextNotEmpty(blok.content) && (
  <div>{renderText(blok.content)}</div>
)}

// ❌ WRONG
<div>{blok.content}</div>
```

### 8. Link Handling

**MUST:**

- Use `StoryblokLink` component for Storyblok links
- Use `sbLinkToHref()` when you need just the URL
- Use type guards to check link types

**MUST NOT:**

- Assume link structure without type checking
- Skip validation of link objects

**Example:**

```typescript
// ✅ CORRECT
import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';
<StoryblokLink link={blok.link}>{blok.linkText}</StoryblokLink>

// OR
import { sbLinkToHref, isLinkStory } from '@/lib/storyblok';
if (isLinkStory(blok.link)) {
  const href = sbLinkToHref(blok.link);
}
```

### 9. Error Handling

**MUST:**

- Handle optional fields with optional chaining (`blok.items?.map()`)
- Provide fallbacks for empty states
- Handle loading and error states
- Use try-catch for async operations

**MUST NOT:**

- Assume fields exist without checking
- Leave unhandled promise rejections
- Skip error boundaries for client components

**Example:**

```typescript
// ✅ CORRECT
{blok.items?.length ? (
  blok.items.map(item => <Item key={item._uid} {...item} />)
) : (
  <p>No items available</p>
)}

// ❌ WRONG
{blok.items.map(item => <Item {...item} />)}
```

### 10. Code Organization

**MUST:**

- Use path aliases (`@/` for src, `~/` for public)
- Import from index files when available
- Keep components focused and single-responsibility
- Extract complex logic into utilities
- Co-locate related files

**MUST NOT:**

- Use relative imports across distant directories
- Create large monolithic components
- Duplicate logic across components
- Mix concerns in single files

**Example:**

```typescript
// ✅ CORRECT
import { findStory, type PageSbContent } from '@/lib/storyblok';
import { HeadingLg } from '@/components/typography/Typography';

// ❌ WRONG
import { findStory } from '../../../lib/storyblok/storyblokRepository';
import { PageSbContent } from '../../../lib/storyblok/blockLibraryTypes';
```

## Development Workflow

### Before Starting Work

1. **Read relevant documentation** in `docs/` directory
2. **Understand the pattern** you're implementing
3. **Check existing examples** in the codebase
4. **Verify environment** is set up correctly

### When Adding a New Component

1. **Create in Storyblok CMS** first
2. **Run type generation**: `pnpm generate-sb-types`
3. **Create React component** in appropriate directory
4. **Register in** `src/storyblok.ts`
5. **Test in Storyblok** Visual Editor
6. **Verify types** work correctly

### When Modifying Existing Code

1. **Understand current implementation** fully
2. **Check for breaking changes** in types
3. **Update tests** if they exist
4. **Verify preview mode** still works
5. **Test all locales** if i18n is affected

## Code Quality Standards

### TypeScript

- Enable strict mode (already configured)
- No TypeScript errors allowed in production
- Use `pnpm typecheck` before committing

### Linting

- Follow ESLint rules configured in `eslint.config.mjs`
- Use `pnpm lint` to check
- Use `pnpm lint:fix` to auto-fix
- No warnings in strict mode (`pnpm lint:strict`)

### Formatting

- Use Prettier for formatting (configured)
- Run `pnpm format` before committing
- Use `pnpm format:check` to verify

### Testing

- Write tests for utilities
- Test complex components
- Run `pnpm test` before committing

## Common Pitfalls to Avoid

### 1. Forgetting Key Prop

```typescript
// ❌ WRONG
{items.map(item => <div>{item.name}</div>)}

// ✅ CORRECT
{items.map(item => <div key={item._uid}>{item.name}</div>)}
```

### 2. Not Handling Empty States

```typescript
// ❌ WRONG
<div>{blok.items.map(...)}</div>

// ✅ CORRECT
<div>
  {blok.items?.length ? (
    blok.items.map(...)
  ) : (
    <p>No items to display</p>
  )}
</div>
```

### 3. Using Client Component Unnecessarily

```typescript
// ❌ WRONG - No need for client component
'use client';
export function StaticContent({ text }: { text: string }) {
  return <p>{text}</p>;
}

// ✅ CORRECT - Server component
export function StaticContent({ text }: { text: string }) {
  return <p>{text}</p>;
}
```

### 4. Hardcoding Values

```typescript
// ❌ WRONG
<button className="bg-blue-600">Click</button>
<a href="/about">About</a>

// ✅ CORRECT
<button className="bg-primary">Click</button>
<Link href="/about">{t('navigation.about')}</Link>
```

### 5. Skipping storyblokEditable

```typescript
// ❌ WRONG - Visual Editor won't work
export function Feature({ blok }: { blok: FeatureSbContent }) {
  return <div>{blok.name}</div>;
}

// ✅ CORRECT
export function Feature({ blok }: { blok: FeatureSbContent }) {
  return <div {...storyblokEditable(blok)}>{blok.name}</div>;
}
```

## Performance Guidelines

### Data Fetching

- Fetch data in Server Components
- Use parallel fetching when possible
- Leverage ISR (configured to 5 minutes)
- Cache appropriately

### Images

- Always use `StoryblokImage` for Storyblok assets
- Provide appropriate `sizes` prop
- Use `priority` for above-fold images
- Lazy load by default

### Bundle Size

- Avoid large client-side dependencies
- Use dynamic imports for heavy components
- Check bundle with `pnpm analyze-bundle`

## Security Guidelines

- Never expose secrets in client components
- Use `env.ts` for environment variables
- Validate user input
- Sanitize rich text content (done by renderer)
- Use CSP headers (configured in Next.js)

## Accessibility Guidelines

- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Use proper heading hierarchy
- Test with screen readers

## Git Commit Guidelines

- Use conventional commits format
- Run linting and type checking before commit
- Husky pre-commit hooks are configured
- Keep commits focused and atomic

## Questions or Uncertainties?

When uncertain about a pattern or implementation:

1. **Check the docs** in `docs/` directory first
2. **Search for similar patterns** in the codebase
3. **Ask for clarification** rather than guessing
4. **Propose alternatives** if you see a better way

## Summary Checklist

Before submitting any code, verify:

- [ ] TypeScript types are correct and no errors
- [ ] Component is in correct directory
- [ ] Component is registered (if block component)
- [ ] Types regenerated if Storyblok changed
- [ ] Using design tokens, not hardcoded values
- [ ] Server Component unless client needed
- [ ] `SectionWrapper` used if component has backgroundColor/spacing props
- [ ] Translations added for user-facing text
- [ ] Rich text rendered with utilities
- [ ] Links use proper components/utilities
- [ ] Optional fields handled safely
- [ ] Key props on mapped elements
- [ ] Empty states handled
- [ ] `storyblokEditable()` added to block components
- [ ] Imports use path aliases
- [ ] Code is formatted and linted
- [ ] Tests written/updated if needed

---

**Remember**: These guidelines exist to maintain consistency and quality. Following them ensures the codebase remains maintainable and scalable for the entire team.
