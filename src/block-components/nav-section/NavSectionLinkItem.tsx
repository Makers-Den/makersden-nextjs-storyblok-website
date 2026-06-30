import { type ComponentPropsWithoutRef } from 'react';

import clsxm from '@/lib/clsxm';
import { type NavSectionLinkItemSbContent } from '@/lib/storyblok';

import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';

interface NavSectionLinkItemProps extends Omit<
  ComponentPropsWithoutRef<typeof StoryblokLink>,
  'children' | 'link'
> {
  blok: NavSectionLinkItemSbContent;
}

export function NavSectionLinkItem({
  blok,
  className,
  ...props
}: NavSectionLinkItemProps) {
  return (
    <StoryblokLink
      link={blok.link}
      className={clsxm(
        'hover:bg-brand-green/10 block rounded-md p-4 transition-colors',
        className,
      )}
      {...props}
    >
      <div className='font-semibold text-current'>{blok.title}</div>
      {blok.description && (
        <div className='text-sm text-current/65'>{blok.description}</div>
      )}
    </StoryblokLink>
  );
}
