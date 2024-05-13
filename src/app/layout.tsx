/* eslint-disable @next/next/next-script-for-ga */
import {
  apiPlugin,
  StoryblokBridgeLoader,
  storyblokInit,
} from '@storyblok/react/rsc';
import { draftMode } from 'next/headers';
import { ReactNode, Suspense } from 'react';

import '@/styles/globals.css';

import { GTMScripts } from '@/components/gtm-scripts/GTMScripts';

import Feature from '@/block-components/Feature/Feature';
import Grid from '@/block-components/Grid/Grid';
import Teaser from '@/block-components/Teaser/Teaser';
import { env } from '@/env';
import Page from '@/page-components/Page';

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    Feature: Feature,
    Grid: Grid,
    Page: Page,
    Teaser: Teaser,
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

const RootLayout = ({ children }: { children: ReactNode }) => {
  const isPreview = draftMode().isEnabled;

  return (
    <html lang='en'>
      <head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/MD-Formula.woff2'
          as='font'
          type='font/woff'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/IBMPlexMono-Regular-Latin1.woff2'
          as='font'
          type='font/ttf'
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
      <body>{children}</body>
      <StoryblokBridgeLoader options={{}} />
    </html>
  );
};

export default RootLayout;
