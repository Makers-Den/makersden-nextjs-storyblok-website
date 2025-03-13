import { defineRouting } from 'next-intl/routing';

import { defaultLocale, locales } from './config';

export const routing = defineRouting({
  // Use this locale when we can't match
  // another with our user's preferred locales
  // and when no locale is explicitly set.
  defaultLocale,

  // List all supported locales
  locales,

  // Automatic locale detection is enabled by
  // default. We're disabling it to keep things
  // simple for now.
  localeDetection: false,

  // Means /about wont be redirected to /en/about
  localePrefix: 'as-needed',
});
