import { type NavSectionLinkItemSbContent } from '@/lib/storyblok';

import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';

interface NavSectionLinkItemProps {
  blok: NavSectionLinkItemSbContent;
}

export function NavSectionLinkItem({ blok }: NavSectionLinkItemProps) {
  return (
    <StoryblokLink
      link={blok.link}
      className='block rounded-md p-4 hover:bg-gray-50'
    >
      <div className='font-semibold text-black'>{blok.title}</div>
      {blok.description && (
        <div className='text-text-muted text-sm'>{blok.description}</div>
      )}
    </StoryblokLink>
  );
}
