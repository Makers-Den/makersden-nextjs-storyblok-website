import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

import { FaqSection } from '@/block-components/faq-section/FaqSection';
import { Feature } from '@/block-components/feature/Feature';
import { Grid } from '@/block-components/grid/Grid';
import { HeroSection } from '@/block-components/hero-section/HeroSection';
import { RichTextContent } from '@/block-components/rich-text-content/RichTextContent';
import { Teaser } from '@/block-components/teaser/Teaser';
import { env } from '@/env';
import Page from '@/page-components/Page';

// using dynamic from 'next/dynamic'
const dynamicComponents = {};

export const getStoryblokApi = storyblokInit({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  apiOptions: {
    fetch: fetch,
    cache: { type: 'memory', clear: 'auto' },
  },
  use: [apiPlugin],
  components: {
    Feature: Feature,
    Page: Page,
    Grid: Grid,
    Teaser: Teaser,
    FaqSection: FaqSection,
    HeroSection: HeroSection,
    RichTextContent: RichTextContent,
    ...dynamicComponents,
  },
});
