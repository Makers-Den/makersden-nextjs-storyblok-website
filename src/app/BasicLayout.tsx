/* eslint-disable @next/next/next-script-for-ga */
import {
  apiPlugin,
  StoryblokBridgeLoader,
  storyblokInit,
} from '@storyblok/react/rsc';
import { Inter as FontSans } from 'next/font/google';
import { draftMode } from 'next/headers';
import { type ReactNode, Suspense } from 'react';

import '@/styles/globals.css';

import clsxm from '@/lib/clsxm';

import { GTMScripts } from '@/components/gtm-scripts/GTMScripts';

import { FaqSection } from '@/block-components/faq-section/FaqSection';
import { Feature } from '@/block-components/feature/Feature';
import { Grid } from '@/block-components/grid/Grid';
import { Teaser } from '@/block-components/teaser/Teaser';
import { env } from '@/env';
import Page from '@/page-components/Page';

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

// TODO: Move this somewhere more sensible and discoverable
storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    Feature: Feature,
    Grid: Grid,
    Page: Page,
    Teaser: Teaser,
    FaqSection: FaqSection,
  },
});

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

export function BasicLayout({
  children,
  locale,
}: {
  locale: string;
  children: ReactNode;
}) {
  const isPreview = draftMode().isEnabled;

  return (
    <html lang={locale}>
      <head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />

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
          fontSans.variable
        )}
      >
        {children}
      </body>
      <StoryblokBridgeLoader options={{}} />
    </html>
  );
}
