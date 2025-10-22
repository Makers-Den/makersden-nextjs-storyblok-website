# Makers' Den Storyblok Website - Codebase Documentation

## Overview

This is a Next.js 16 (App Router) website template integrated with Storyblok CMS. It provides a type-safe, internationalized, and highly maintainable foundation for building content-driven websites.

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **CMS**: Storyblok (Headless CMS)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Internationalization**: next-intl
- **Package Manager**: pnpm
- **Node Version**: >=v20.11.1

## Documentation Structure

1. [Architecture](./architecture.md) - High-level architecture and routing patterns
2. [Storyblok Integration](./storyblok-integration.md) - CMS integration patterns and type generation
3. [Component Patterns](./component-patterns.md) - Component structure and conventions
4. [Utilities](./utilities.md) - Helper functions and utilities
5. [Styling](./styling.md) - Tailwind configuration and styling patterns
6. [Internationalization](./internationalization.md) - i18n setup and usage
7. [Type System](./type-system.md) - TypeScript patterns and generated types

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Generate TypeScript types from Storyblok
pnpm generate-sb-types

# Build for production
pnpm build
```

## Key Concepts

### 1. Content-Driven Architecture

All pages are dynamically generated from Storyblok content using a catch-all route at `src/app/[locale]/[[...slug]]/page.tsx`.

### 2. Type Safety

TypeScript types are automatically generated from Storyblok component schemas, ensuring type safety across the entire application.

### 3. Component Mapping

Storyblok components are mapped to React components in `src/storyblok.ts`, creating a seamless connection between CMS and code.

### 4. Internationalization

Built-in support for multiple locales (en, de) with automatic routing and content localization.

## Project Structure

```
.
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # Internationalized routes
│   │   │   └── [[...slug]]/          # Catch-all dynamic route
│   │   ├── api/                      # API routes (preview, OG images)
│   │   └── layout.tsx                # Root layout
│   ├── block-components/             # Storyblok block components
│   ├── components/                   # Reusable React components
│   ├── i18n/                         # Internationalization config
│   ├── lib/                          # Utilities and helpers
│   │   ├── storyblok/                # Storyblok-specific utilities
│   │   ├── hooks/                    # Custom React hooks
│   │   └── utils/                    # General utilities
│   ├── page-components/              # Top-level page components
│   ├── styles/                       # Global styles
│   └── types.ts                      # Global TypeScript types
├── public/                           # Static assets
├── locales/                          # Translation files
├── storyblok-components/             # Storyblok component schemas (JSON)
└── scripts/                          # Build and generation scripts
```

## Environment Variables

Required environment variables (see `.env.local.example`):

- `NEXT_PUBLIC_STORYBLOK_TOKEN` - Storyblok API access token
- `STORYBLOK_SPACE_ID` - Storyblok space ID
- `NEXT_PUBLIC_SITE_URL` - Production site URL

## Common Patterns

### Adding a New Storyblok Component

1. Create the component in Storyblok CMS
2. Run `pnpm generate-sb-types` to generate TypeScript types
3. Create a React component in `src/block-components/`
4. Register the component in `src/storyblok.ts`

### Working with Rich Text

Use the `renderText()` utility from `src/lib/richTextUtils.tsx` to render Storyblok rich text content with custom styling.

### Creating Links

Use the `StoryblokLink` component and `sbLinkToHref()` utility to handle Storyblok link fields correctly.

## Development Workflow

1. **Local Development**: Run `pnpm dev` for hot-reloading development
2. **HTTPS Proxy**: Use `pnpm proxy` for Storyblok Visual Editor (requires local SSL certs)
3. **Type Generation**: Run `pnpm generate-sb-types` after updating Storyblok schemas
4. **Linting**: `pnpm lint` or `pnpm lint:fix`
5. **Type Checking**: `pnpm typecheck`

## Deployment

The project is configured for Vercel deployment:

- Automatic deployments on push to main branch
- Preview deployments for pull requests
- ISR (Incremental Static Regeneration) with 5-minute revalidation

## Next Steps

For detailed information about specific aspects of the codebase, refer to the documentation files listed above.
