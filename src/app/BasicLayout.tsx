import { Inter as FontSans } from 'next/font/google';
import { draftMode } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { type ReactNode, Suspense } from 'react';

import '@/styles/globals.css';

import clsxm from '@/lib/clsxm';

import { GTMScripts } from '@/components/gtm-scripts/GTMScripts';
import StoryblokProvider from '@/components/storyblok/StoryblokProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/favicon/android-chrome-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/favicon/android-chrome-512x512.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
];

export async function BasicLayout({
  children,
  locale,
}: {
  locale: string;
  children: ReactNode;
}) {
  const isPreview = (await draftMode()).isEnabled;

  return (
    <html lang={locale}>
      <head>
        {favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
        {/* We do not want to load GTM and analytics etc when doing content management in Storyblok */}
        {!isPreview && (
          <Suspense>
            <GTMScripts />
          </Suspense>
        )}
      </head>

      <body
        className={clsxm(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider>
          <StoryblokProvider>{children}</StoryblokProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
