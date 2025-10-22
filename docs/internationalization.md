# Internationalization (i18n)

## Overview

The project uses `next-intl` for internationalization, supporting multiple locales with automatic routing and content localization.

## Configuration

### Supported Locales

**File**: `src/i18n/config.ts`

```typescript
export const defaultLocale = 'en';
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];
```

**Current locales**:

- `en` - English (default)
- `de` - German

### Routing Configuration

**File**: `src/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'en',
  locales: ['en', 'de'],
  localeDetection: false,
  localePrefix: 'as-needed',
});
```

**Key settings**:

- `localePrefix: 'as-needed'` - Default locale has no prefix
  - `/about` → English
  - `/de/ueber-uns` → German
- `localeDetection: false` - Explicit locale selection only

## Routing Structure

### URL Patterns

```
/                    → Home (English)
/about               → About (English)
/de                  → Home (German)
/de/ueber-uns        → About (German)
```

### Route Parameters

**File**: `src/app/[locale]/[[...slug]]/page.tsx`

```typescript
// params.locale is optional
// When undefined, uses default locale
async function LocaleStoryblokPage(props: PageProps) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return <StoryblokPage {...props} />;
}
```

## Middleware

**File**: `src/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*)*)'],
};
```

**Middleware handles**:

- Locale detection from URL
- Redirects to localized paths
- Sets locale cookie
- Excludes API routes and static files

## Request Configuration

**File**: `src/i18n/request.ts`

Provides server-side locale access:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
```

## Translation Files

**Location**: `locales/`

```
locales/
  en.json
  de.json
```

**Example**: `locales/en.json`

```json
{
  "navigation": {
    "home": "Home",
    "about": "About",
    "services": "Services"
  },
  "common": {
    "readMore": "Read More",
    "contactUs": "Contact Us"
  }
}
```

## Using Translations

### Server Components

```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('navigation');

  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/about">{t('about')}</a>
    </nav>
  );
}
```

### Client Components

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function ClientComponent() {
  const t = useTranslations('common');

  return <button>{t('contactUs')}</button>;
}
```

### Nested Translation Keys

```typescript
const t = useTranslations('navigation');

// Access nested keys
t('menu.services.web');
// → "Web Development"

// Or use parent namespace
const menu = useTranslations('navigation.menu');
menu('services.web');
```

### Interpolation

**Translation file**:

```json
{
  "welcome": "Welcome, {name}!",
  "itemCount": "You have {count} items"
}
```

**Usage**:

```typescript
const t = useTranslations('common');

t('welcome', { name: 'John' });
// → "Welcome, John!"

t('itemCount', { count: 5 });
// → "You have 5 items"
```

### Pluralization

**Translation file**:

```json
{
  "items": {
    "zero": "No items",
    "one": "One item",
    "other": "{count} items"
  }
}
```

**Usage**:

```typescript
t('items', { count: 0 }); // → "No items"
t('items', { count: 1 }); // → "One item"
t('items', { count: 5 }); // → "5 items"
```

## Locale Switching

### LocaleSwitcher Component

**File**: `src/components/local-switcher/LocaleSwitcher.tsx`

```typescript
import { LocaleSwitcher } from '@/components/local-switcher/LocaleSwitcher';

// In header
<LocaleSwitcher locale={locale} />
```

**Implementation pattern**:

```typescript
import { Link } from '@/i18n/navigation';

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  return (
    <div>
      {locales.map((loc) => (
        <Link
          key={loc}
          href="/"
          locale={loc}
          className={locale === loc ? 'active' : ''}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
```

## Navigation with i18n

### Navigation Utilities

**File**: `src/i18n/navigation.ts`

Provides locale-aware navigation components:

```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

### Link Component

```typescript
import { Link } from '@/i18n/navigation';

// Automatically adds locale prefix
<Link href="/about">About</Link>
// → /about (en)
// → /de/ueber-uns (de)

// Switch locale
<Link href="/about" locale="de">Über uns</Link>
```

### Programmatic Navigation

```typescript
import { useRouter } from '@/i18n/navigation';

export function MyComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/about');
    // Navigates to localized path
  };

  return <button onClick={handleClick}>Go to About</button>;
}
```

### Redirect

```typescript
import { redirect } from '@/i18n/navigation';

export async function action() {
  // Server-side redirect with locale
  redirect('/thank-you');
}
```

### Get Current Pathname

```typescript
import { usePathname } from '@/i18n/navigation';

export function MyComponent() {
  const pathname = usePathname();
  // Returns pathname without locale prefix
  // /de/about → /about

  return <div>Current page: {pathname}</div>;
}
```

## Storyblok Integration

### Localized Content

Storyblok stores content per locale. The `locale` parameter determines which version is fetched:

```typescript
// Fetch English content
await findStory({
  slug: 'about-us',
  locale: 'en',
});

// Fetch German content
await findStory({
  slug: 'ueber-uns',
  locale: 'de',
});
```

### Folder Structure in Storyblok

**Option 1: Separate folders per locale**

```
Storyblok/
  en/
    home
    about-us
  de/
    home
    ueber-uns
```

**Option 2: Field-level translation**

- Single story with translated fields
- Storyblok's built-in translation feature

### Translation Story

**File**: `src/app/getPageProps.ts:65`

Global translations are fetched from Storyblok:

```typescript
const translations = await findStory<StoryblokStory<TranslationsSbContent>>({
  slug: 'globals/translations',
  locale,
  isPreview,
});
```

**Type**: `TranslationsSbContent`

Contains translation strings used across components.

## Metadata Localization

### Page Metadata

**File**: `src/app/getPageProps.ts:140`

Metadata is automatically localized:

```typescript
export const getMetadata = async ({ params }) => {
  const { locale } = await params;

  const pageProps = await getPageProps({
    slug,
    locale,
  });

  // title and description come from localized story
  return {
    title: story.content.title,
    description: story.content.description,
    // ...
  };
};
```

## Date and Number Formatting

### Format Dates

```typescript
import { useFormatter } from 'next-intl';

export function MyComponent() {
  const format = useFormatter();

  const date = new Date('2024-01-15');

  return (
    <time>
      {format.dateTime(date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
      {/* en: January 15, 2024 */}
      {/* de: 15. Januar 2024 */}
    </time>
  );
}
```

### Format Numbers

```typescript
const format = useFormatter();

format.number(1234.56, { style: 'currency', currency: 'EUR' });
// en: €1,234.56
// de: 1.234,56 €
```

### Relative Time

```typescript
const format = useFormatter();

const date = new Date('2024-01-15');
format.relativeTime(date);
// en: "2 days ago"
// de: "vor 2 Tagen"
```

## SEO Considerations

### Hreflang Tags

Add alternate links for SEO:

```typescript
export const generateMetadata = async ({ params }) => {
  const { slug, locale } = await params;

  return {
    alternates: {
      canonical: `/${locale}${slug}`,
      languages: {
        en: `/en${slug}`,
        de: `/de${slug}`,
        'x-default': `/en${slug}`,
      },
    },
  };
};
```

### Sitemap

**File**: `src/app/sitemap.ts`

Generate sitemap with all locales:

```typescript
export default async function sitemap() {
  const { allSlugsWithLocale } = await findAllPageSlugs(['en', 'de']);

  return allSlugsWithLocale.map((slug) => ({
    url: `${CANONICAL_BASE_URL_NO_SLASH}/${slug}`,
    lastModified: new Date(),
  }));
}
```

## Adding a New Locale

### 1. Update Configuration

**File**: `src/i18n/config.ts`

```typescript
export const locales = ['en', 'de', 'fr'] as const;
```

### 2. Create Translation File

Create `locales/fr.json`:

```json
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  }
}
```

### 3. Update Storyblok

Create localized content in Storyblok for the new locale.

### 4. Update Locale Switcher

The LocaleSwitcher will automatically pick up the new locale from config.

## Best Practices

### 1. Use Translation Namespaces

```typescript
// Good - organized
const nav = useTranslations('navigation');
const common = useTranslations('common');

// Bad - cluttered root
const t = useTranslations();
```

### 2. Keep Keys Semantic

```json
// Good
{
  "actions": {
    "submit": "Submit",
    "cancel": "Cancel"
  }
}

// Bad
{
  "button1": "Submit",
  "button2": "Cancel"
}
```

### 3. Use Type-Safe Translations

```typescript
// Define translation keys type
type TranslationKeys = 'navigation.home' | 'navigation.about';

const t = useTranslations();
const value: string = t('navigation.home' as TranslationKeys);
```

### 4. Handle Missing Translations

```typescript
// Provide fallback
t('key', { defaultValue: 'Fallback text' });

// Or check existence
t.has('key') ? t('key') : 'Default';
```

### 5. Extract Shared Strings

```typescript
// Good - in translation file
t('common.loading');

// Bad - hardcoded
('Loading...');
```

## Testing

### Test Different Locales

```typescript
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  welcome: 'Welcome'
};

render(
  <NextIntlClientProvider locale="en" messages={messages}>
    <MyComponent />
  </NextIntlClientProvider>
);
```

## Common Issues

### Missing Translations

**Error**: "Translation key not found"

**Solutions**:

1. Check translation file exists
2. Verify key path is correct
3. Ensure namespace matches
4. Check JSON syntax

### Locale Not Applied

**Solutions**:

1. Verify middleware is running
2. Check matcher pattern
3. Ensure `setRequestLocale()` is called
4. Clear Next.js cache

### Links Not Localized

**Solution**: Use `Link` from `@/i18n/navigation`, not `next/link`

```typescript
// Good
import { Link } from '@/i18n/navigation';

// Bad
import Link from 'next/link';
```

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Storyblok Internationalization](https://www.storyblok.com/docs/guide/in-depth/internationalization)
