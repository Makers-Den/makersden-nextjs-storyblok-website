import { type Locale, locales } from 'i18n.config';
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Load the translation file for the active locale
// on each request and make it available to our
// pages, components, etc.
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locales.includes(locale as Locale)) {
    return notFound();
  }

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});
