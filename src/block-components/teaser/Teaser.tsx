import { storyblokEditable } from '@storyblok/react/rsc';

import { type TeaserSbContent } from '@/lib/storyblok';

export function Teaser({ blok }: { blok: TeaserSbContent }) {
  if (!blok.headline) {
    return null;
  }

  return (
    <div
      className='rounded-md px-6 py-8 text-left'
      {...storyblokEditable(blok)}
    >
      <p className='font-display text-foreground text-[clamp(2rem,4vw,3.5rem)] leading-none font-extrabold tracking-normal'>
        {blok.headline}
      </p>
    </div>
  );
}
