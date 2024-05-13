import { storyblokEditable } from '@storyblok/react/rsc';

import { FeatureSbContent } from '@/lib/storyblok';

function Feature({ blok }: { blok: FeatureSbContent }) {
  return (
    <div className='column feature' {...storyblokEditable(blok)}>
      {blok.name}
    </div>
  );
}

export default Feature;
