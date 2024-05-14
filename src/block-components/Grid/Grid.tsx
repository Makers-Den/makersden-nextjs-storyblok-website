import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';

import { type GridSbContent } from '@/lib/storyblok';

function Grid({ blok }: { blok: GridSbContent }) {
  return (
    <div className='grid grid-cols-3' {...storyblokEditable(blok)}>
      {blok.columns?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}

export default Grid;
