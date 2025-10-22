# Claude Code Instructions

## Project Overview

This is the **Makers' Den Next.js Storyblok Website Template** - a production-ready, type-safe, internationalized web application built with Next.js 16 (App Router) and Storyblok CMS.

**Key Technologies:**

- Next.js 16 (App Router, React Server Components)
- Storyblok CMS (Headless)
- TypeScript (Strict Mode)
- Tailwind CSS v4
- next-intl (Internationalization)
- pnpm (Package Manager)

## Getting Started

### For All Tasks

Before working on any task:

1. **Read [AGENTS.md](./AGENTS.md)** - Core tenets and guidelines ALL agents must follow
2. **Review relevant docs** in `docs/` directory:
   - Start with [docs/README.md](./docs/README.md) for overview
   - Then consult specific documentation as needed

### Quick Reference

| Task Type                   | Read These Docs                                                                                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Adding/modifying components | [component-patterns.md](./docs/component-patterns.md), [storyblok-integration.md](./docs/storyblok-integration.md)                                       |
| Working with Storyblok      | [storyblok-integration.md](./docs/storyblok-integration.md), [type-system.md](./docs/type-system.md)                                                     |
| Styling changes             | [styling.md](./docs/styling.md)                                                                                                                          |
| Typography/text styling     | [component-patterns.md#typography-components](./docs/component-patterns.md#typography-components), [styling.md#typography](./docs/styling.md#typography) |
| Adding translations         | [internationalization.md](./docs/internationalization.md)                                                                                                |
| Routing/architecture        | [architecture.md](./docs/architecture.md)                                                                                                                |
| Using utilities             | [utilities.md](./docs/utilities.md)                                                                                                                      |
| Type issues                 | [type-system.md](./docs/type-system.md)                                                                                                                  |

## Critical Rules from AGENTS.md

### Must Always Follow

1. **Type Safety**: Use generated types, never `any`
2. **Component Structure**: Right component in right directory
3. **Storyblok Integration**: Register components, regenerate types
4. **Server Components**: Default to Server Components, only use Client when needed
5. **Styling**: Use Tailwind with design tokens, use `clsxm` for conditionals
6. **i18n**: Use next-intl, import Link from `@/i18n/navigation`
7. **Rich Text**: Use `renderText()` utilities
8. **Links**: Use `StoryblokLink` component
9. **Error Handling**: Handle optional fields safely
10. **Code Quality**: Follow linting, formatting, and TypeScript strict mode

### Typography Best Practices

**CRITICAL**: Always use Typography component variants for consistent text styling.

```typescript
import { HeadingLg, HeadingMd, Text, TextLg } from '@/components/typography/Typography';
import { renderHeadingLg, renderHeadingMd, renderText } from '@/lib/richTextUtils';

// For plain string fields - use Typography components
<HeadingLg as='h2'>{blok.title}</HeadingLg>
<Text>{blok.description}</Text>

// For Storyblok rich text content - use renderText()
{renderText(blok.bodyContent)}

// For Storyblok rich text TITLE fields - use heading render functions
{renderHeadingXl(blok.heroTitle, 'h1')}  // Hero titles
{renderHeadingLg(blok.sectionTitle, 'h2')}  // Section titles
{renderHeadingMd(blok.cardTitle, 'h3')}  // Card/subsection titles
```

**Decision Tree:**

1. **Plain string** → Use Typography components (`<HeadingLg>`, `<Text>`, etc.)
2. **SbRichtext body content** → Use `renderText()`
3. **SbRichtext title field** → Use `renderHeadingXl/Lg/Md()`
4. **If unsure which variant** → Ask for guidance

**Never:**

- Use raw Tailwind classes (`text-2xl`, `font-bold`) for content text
- Use `renderText()` for title fields (use `renderHeadingXl/Lg/Md()` instead)

### Before Submitting Code

Run through the checklist in [AGENTS.md](./AGENTS.md#summary-checklist).

## Common Components

### Button & ButtonLink

```typescript
import { Button, ButtonLink } from '@/components/button';

// Standard button
<Button variant="default">Click me</Button>
<Button variant="outline" size="sm">Small</Button>
<Button variant="destructive">Delete</Button>

// Link styled as button (for navigation)
<ButtonLink href="/about">About Us</ButtonLink>
<ButtonLink href="/contact" variant="outline">Contact</ButtonLink>
```

**Available variants**: `default`, `outline`, `destructive`, `secondary`, `ghost`, `link`
**Available sizes**: `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`

See [component-patterns.md#button-component](./docs/component-patterns.md#button-component) for full documentation.

## Common Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm proxy                  # Start HTTPS proxy for Visual Editor

# Storyblok
pnpm generate-sb-types      # Generate types from Storyblok schemas

# Quality
pnpm lint                   # Lint code
pnpm lint:fix              # Fix linting issues
pnpm typecheck             # Check TypeScript
pnpm format                # Format code
pnpm test                  # Run tests

# Build
pnpm build                 # Production build
pnpm start                 # Start production server
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   └── [[...slug]]/   # Catch-all route for all pages
│   └── api/               # API routes
├── block-components/       # Storyblok block components
├── page-components/        # Top-level page components
├── components/            # Reusable UI components
├── lib/                   # Utilities and helpers
│   ├── storyblok/        # Storyblok integration
│   ├── hooks/            # Custom React hooks
│   └── utils/            # General utilities
├── i18n/                 # Internationalization config
└── styles/               # Global styles (Tailwind)
```

## Workflow Patterns

### Adding a New Storyblok Component

1. Create component in Storyblok CMS
2. Run `pnpm generate-sb-types`
3. Create React component in `src/block-components/[name]/[Name].tsx`
4. Register in `src/storyblok.ts`
5. Test in Visual Editor

**Example:**

```typescript
// src/block-components/my-feature/MyFeature.tsx
import { storyblokEditable } from '@storyblok/react/rsc';
import { type MyFeatureSbContent } from '@/lib/storyblok';
import { Container } from '@/components/container/Container';
import { HeadingMd, Text } from '@/components/typography/Typography';

export function MyFeature({ blok }: { blok: MyFeatureSbContent }) {
  return (
    <Container className="py-12" {...storyblokEditable(blok)}>
      {/* Use Typography components for consistent styling */}
      <HeadingMd as='h2'>{blok.title}</HeadingMd>
      <Text>{blok.description}</Text>
    </Container>
  );
}
```

**IMPORTANT**: Always use `Container` for block components with constrained content to ensure consistent spacing and prevent content from extending to viewport edges. For full-bleed backgrounds (hero sections, etc.), nest `Container` inside for the text content.

Then in `src/storyblok.ts`:

```typescript
components: {
  // ... existing
  MyFeature: MyFeature,
}
```

### Adding a Translation

1. Add to `locales/en.json`:

```json
{
  "mySection": {
    "title": "My Title",
    "description": "My description"
  }
}
```

2. Add to `locales/de.json`:

```json
{
  "mySection": {
    "title": "Mein Titel",
    "description": "Meine Beschreibung"
  }
}
```

3. Use in component:

```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('mySection');
  return <h1>{t('title')}</h1>;
}
```

### Creating a New Utility

1. Determine category (string, link, type, etc.)
2. Create in appropriate location:
   - General: `src/lib/myUtil.ts`
   - Storyblok: `src/lib/storyblok/myUtil.ts`
   - Hook: `src/lib/hooks/useMyHook.ts`
3. Export from index if applicable
4. Document in [utilities.md](./docs/utilities.md)
5. Add tests if complex

### Styling a Component

```typescript
import clsxm from '@/lib/clsxm';
import { Container } from '@/components/container/Container';
import { HeadingLg, Text } from '@/components/typography/Typography';

export function MyComponent({ blok, className, isActive }: Props) {
  return (
    <Container
      className={clsxm(
        // Base styles - mobile first
        'bg-background text-foreground',
        'py-8 rounded-lg',

        // Responsive
        'md:py-12',
        'lg:py-16',

        // Conditional
        isActive && 'ring-2 ring-primary',

        // Allow override
        className
      )}
      {...storyblokEditable(blok)}
    >
      <HeadingLg as="h2">Title</HeadingLg>
      <Text>Body text</Text>
    </Container>
  );
}
```

## Debugging

### TypeScript Errors After Storyblok Changes

```bash
pnpm generate-sb-types
# Restart TS server in your editor
rm -rf .next
pnpm dev
```

### Preview Mode Not Working

1. Check `NEXT_PUBLIC_STORYBLOK_TOKEN` is set
2. Verify cookies enabled
3. Use HTTPS: `pnpm proxy`
4. Check preview secret matches

### Build Errors

```bash
pnpm typecheck              # Check TypeScript
pnpm lint:strict           # Check linting
pnpm build                 # Test build
```

## Environment Variables

Required (see `.env.local.example`):

```bash
STORYBLOK_SPACE_ID=your_space_id
NEXT_PUBLIC_STORYBLOK_TOKEN=your_token
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Architecture Patterns

### Data Fetching

Always use repository functions:

```typescript
import { findStory, findStories } from '@/lib/storyblok/storyblokRepository';

// Single story
const { story } = await findStory<StoryblokStory<PageSbContent>>({
  slug: 'about-us',
  locale: 'en',
});

// Multiple stories
const { stories, total } = await findStories({
  contentType: 'Post',
  perPage: 10,
  sortBy: 'first_published_at:desc',
});
```

### Nested Blocks

```typescript
import { StoryblokServerComponent } from '@storyblok/react/rsc';

export function Grid({ blok }: { blok: GridSbContent }) {
  return (
    <div className="grid grid-cols-3" {...storyblokEditable(blok)}>
      {blok.columns?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
```

### Rich Text Rendering

```typescript
import { renderText, isRichtextNotEmpty } from '@/lib/richTextUtils';

{isRichtextNotEmpty(blok.content) && (
  <div className="prose">
    {renderText(blok.content)}
  </div>
)}
```

### Locale-Aware Links

```typescript
import { Link } from '@/i18n/navigation';

// Automatically adds correct locale prefix
<Link href="/about">About Us</Link>
```

## Performance Considerations

- **ISR**: Pages revalidate every 5 minutes
- **Server Components**: Default for zero client JS
- **Image Optimization**: Use `StoryblokImage` component
- **Dynamic Imports**: For heavy client components

## Security

- Environment variables in `src/env.ts` (validated with Zod)
- Never expose secrets in client components
- Rich text is sanitized by renderer
- CSP configured in Next.js config

## Testing Strategy

- Unit tests for utilities
- Component tests for complex components
- Type checking as test layer
- Manual testing in Storyblok Visual Editor

## Need Help?

1. **Check [AGENTS.md](./AGENTS.md)** for guidelines
2. **Consult docs** in `docs/` directory
3. **Search codebase** for similar patterns
4. **Ask for clarification** if uncertain

## Important Notes

- This is a **template repository** - clone for new projects
- **Never commit** `.env.local` (use `.env.local.example`)
- **Always regenerate types** after Storyblok changes
- **Test in Visual Editor** after component changes
- **Verify both locales** when adding translations
- **Check mobile responsiveness** for all components

## Deployment

- Automatic via Vercel on push to `main`
- Preview deployments for PRs
- Production URL configured in environment variables

---

## Quick Start Checklist

For a new task:

- [ ] Read [AGENTS.md](./AGENTS.md)
- [ ] Review relevant docs in `docs/`
- [ ] Check for similar patterns in codebase
- [ ] Set up environment variables
- [ ] Run `pnpm install` if needed
- [ ] Run `pnpm dev` to start
- [ ] Make changes following guidelines
- [ ] Run `pnpm typecheck && pnpm lint`
- [ ] Test in browser/Visual Editor
- [ ] Verify both locales if applicable
- [ ] Run through final checklist in AGENTS.md

---

**Remember**: Quality over speed. Take time to understand patterns and follow conventions. The documentation exists to help you succeed!
