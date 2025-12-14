import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

import { CtaLink } from '@/block-components/cta-link';
import { CtaSection } from '@/block-components/cta-section/CtaSection';
import { FaqSection } from '@/block-components/faq-section/FaqSection';
import { FeaturedArticle } from '@/block-components/featured-article/FeaturedArticle';
import { GridSection } from '@/block-components/grid-section/GridSection';
import { HeroNarrowSection } from '@/block-components/hero-narrow-section/HeroNarrowSection';
import { HeroSection } from '@/block-components/hero-section/HeroSection';
import { HeroSplitSection } from '@/block-components/hero-split-section/HeroSplitSection';
import { IconAndTextCard } from '@/block-components/icon-and-text-card/IconAndTextCard';
import { Image } from '@/block-components/image/Image';
import { ImageAndTextCard } from '@/block-components/image-and-text-card/ImageAndTextCard';
import { ImageCardLink } from '@/block-components/image-card-link/ImageCardLink';
import { LogosSection } from '@/block-components/logos-section/LogosSection';
import { PaginatedSection } from '@/block-components/paginated-section/PaginatedSection';
import { SplitSection } from '@/block-components/split-section/SplitSection';
import { TitleAndText } from '@/block-components/title-and-text/TitleAndText';
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
    CtaLink: CtaLink,
    CtaSection: CtaSection,
    FaqSection: FaqSection,
    FeaturedArticle: FeaturedArticle,
    GridSection: GridSection,
    HeroNarrowSection: HeroNarrowSection,
    HeroSection: HeroSection,
    HeroSplitSection: HeroSplitSection,
    IconAndTextCard: IconAndTextCard,
    Image: Image,
    ImageAndTextCard: ImageAndTextCard,
    ImageCardLink: ImageCardLink,
    LogosSection: LogosSection,
    Page: Page,
    PaginatedSection: PaginatedSection,
    SplitSection: SplitSection,
    TitleAndText: TitleAndText,
    ...dynamicComponents,
  },
});
