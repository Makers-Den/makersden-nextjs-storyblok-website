import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';

import { type GridSbContent } from '@/lib/storyblok';

export function Grid({ blok }: { blok: GridSbContent }) {
  return (
    <div className='grid grid-cols-3 bg-gray-50' {...storyblokEditable(blok)}>
      {blok.columns?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
