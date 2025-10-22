import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';

import clsxm from '@/lib/clsxm';
import { type GridSbContent } from '@/lib/storyblok';

import { Container } from '@/components/container/Container';

export function Grid({ blok }: { blok: GridSbContent }) {
  // Map gap values to Tailwind gap classes
  const gapClass = blok.gap ? `gap-${blok.gap}` : 'gap-6';

  return (
    <Container
      className={clsxm('grid grid-cols-3 bg-gray-50', gapClass)}
      {...storyblokEditable(blok)}
    >
      {blok.columns?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </Container>
  );
}
