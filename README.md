# Makers' Den Storyblok Website

A production-ready Next.js website template with Storyblok CMS integration, built by [Makers' Den](https://makersden.io) - a Berlin-based ReactJS development agency specializing in [fast websites with headless CMS](https://makersden.io/services/fast-websites-headlesscms).

## Overview

This is a modern, type-safe website template built with:

- **Next.js 16** (App Router) with React Server Components
- **Storyblok** (Headless CMS) with Visual Editor support
- **TypeScript** (strict mode) with auto-generated types from Storyblok
- **Tailwind CSS v4** with custom design tokens
- **next-intl** for internationalization (i18n)
- **pnpm** for package management

## Quick Start

### Prerequisites

- Node.js >= v20.11.1
- pnpm (install with `npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Makers-Den/makersden-storyblok-website.git
cd makersden-storyblok-website

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Storyblok credentials
```

### Development

```bash
# Start the development server
pnpm dev

# The site will be available at http://localhost:3000
```

### Storyblok Visual Editor (Optional)

For local development with Storyblok's Visual Editor:

```bash
# Install global tools (one-time setup)
pnpm install -g dotenv-cli storyblok

# Run dev server with HTTPS proxy
pnpm dev && pnpm proxy
# Access via https://localhost:3010
```

### Generate TypeScript Types

After creating or modifying components in Storyblok:

```bash
# Generate TypeScript types from Storyblok schemas
pnpm generate-sb-types
```

## Documentation

For comprehensive documentation, see:

- **[AGENTS.md](./AGENTS.md)** - Development guidelines and coding standards for contributors
- **[docs/](./docs/)** - Detailed technical documentation:
  - [Architecture](./docs/architecture.md) - System architecture and routing
  - [Storyblok Integration](./docs/storyblok-integration.md) - CMS integration patterns
  - [Component Patterns](./docs/component-patterns.md) - Component structure and conventions
  - [Styling](./docs/styling.md) - Tailwind CSS patterns
  - [Internationalization](./docs/internationalization.md) - i18n implementation
  - [Type System](./docs/type-system.md) - TypeScript patterns

## Key Features

- ✅ **Type Safety**: Auto-generated TypeScript types from Storyblok schemas
- ✅ **Visual Editing**: Full Storyblok Visual Editor support with live preview
- ✅ **Internationalization**: Built-in multi-language support (en, de)
- ✅ **Performance**: Optimized for Core Web Vitals with ISR and image optimization
- ✅ **Developer Experience**: Strict TypeScript, ESLint, Prettier, and Husky pre-commit hooks
- ✅ **Server Components**: React Server Components by default for optimal performance

## About Makers' Den

[Makers' Den](https://makersden.io) is a Berlin-based ReactJS development agency that specializes in building high-performance websites and applications. We help companies achieve top 1% Core Web Vitals scores with modern tech stacks.

**Our Services:**

- [Fast Websites & Headless CMS](https://makersden.io/services/fast-websites-headlesscms) - Next.js + Storyblok/Sanity
- ReactJS Web Frontends
- Composable Commerce
- React Native Mobile Development
- NodeJS Backend Development

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Support

For questions about this template or to discuss your project, [contact Makers' Den](https://makersden.io).

---

Built with ❤️ by [Makers' Den](https://makersden.io)
