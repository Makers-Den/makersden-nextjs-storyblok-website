import StoryblokClient from 'storyblok-js-client';

import { env } from '@/env';

export const storyblokClient = new StoryblokClient({
  accessToken: env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  fetch: fetch,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});
