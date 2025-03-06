'use client';

import { storyblokInit } from '@storyblok/react/rsc';
import { type ReactNode } from 'react';

export default function StoryblokProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Re-initialize on the client. Official docs suggest to re-use the getStoryblokApi function,
  // but we can't since the "richTextUtils" file contains the 'server-only' directive.
  //
  // Docs: https://www.storyblok.com/mp/announcing-react-sdk-v4-with-full-support-for-react-server-components#step-2-wrap-your-application-with-storyblokprovider
  storyblokInit();

  return children;
}
