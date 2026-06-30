import Link, { type LinkProps } from 'next/link';
import { type HTMLProps } from 'react';

import { sbLinkToHref, type SbMultilink } from '@/lib/storyblok';

import { defaultLocale, type Locale } from '@/i18n/config';

type Props = Omit<LinkProps, 'href' | 'children' | 'target' | 'rel'> &
  HTMLProps<HTMLAnchorElement> & {
    link?: SbMultilink;
    locale?: Locale;
  };

export function StoryblokLink({
  children,
  link,
  locale = defaultLocale,
  ...props
}: Props) {
  return (
    <Link
      href={sbLinkToHref(link, locale)}
      {...props}
      {...(link?.target && { target: link.target })}
      {...(link?.rel && { rel: link.rel })}
      {...(link?.title && { title: link.title })}
    >
      {children}
    </Link>
  );
}
