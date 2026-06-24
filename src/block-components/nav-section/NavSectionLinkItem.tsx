import { type NavSectionLinkItemSbContent } from '@/lib/storyblok';

import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';

interface NavSectionLinkItemProps {
  blok: NavSectionLinkItemSbContent;
}

export function NavSectionLinkItem({ blok }: NavSectionLinkItemProps) {
  return (
    <StoryblokLink
      link={blok.link}
      className='hover:bg-brand-green/10 block rounded-md p-4 transition-colors'
    >
      <div className='font-semibold text-current'>{blok.title}</div>
      {blok.description && (
        <div className='text-sm text-current/65'>{blok.description}</div>
      )}
    </StoryblokLink>
  );
}
