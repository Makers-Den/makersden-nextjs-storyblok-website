import { storyblokEditable } from '@storyblok/react/rsc';

import { TeaserSbContent } from '@/lib/storyblok';

function Teaser({ blok }: { blok: TeaserSbContent }) {
  return (
    <h2 className='mb-10 text-2xl' {...storyblokEditable(blok)}>
      {blok.headline}
    </h2>
  );
}

export default Teaser;
