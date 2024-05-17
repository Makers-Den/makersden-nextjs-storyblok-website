import { storyblokEditable } from '@storyblok/react/rsc';

import { type TeaserSbContent } from '@/lib/storyblok';

export function Teaser({ blok }: { blok: TeaserSbContent }) {
  return (
    <h2 className='mb-10 text-2xl' {...storyblokEditable(blok)}>
      {blok.headline}
    </h2>
  );
}
