import { type ComponentPropsWithoutRef } from 'react';

import clsxm from '@/lib/clsxm';
import { type NavSectionLinkItemSbContent } from '@/lib/storyblok';

import { StoryblokLink } from '@/components/storyblok-link/StoryblokLink';

import { defaultLocale, type Locale } from '@/i18n/config';

interface NavSectionLinkItemProps extends Omit<
  ComponentPropsWithoutRef<typeof StoryblokLink>,
  'children' | 'link'
> {
  blok: NavSectionLinkItemSbContent;
  locale?: Locale;
}

export function NavSectionLinkItem({
  blok,
  className,
  locale = defaultLocale,
  ...props
}: NavSectionLinkItemProps) {
  return (
    <StoryblokLink
      link={blok.link}
      locale={locale}
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
