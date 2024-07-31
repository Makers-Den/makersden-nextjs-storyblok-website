import Link, { type LinkProps } from 'next/link';
import { type HTMLProps } from 'react';

import { type SbMultilink, sbLinkToHref } from '@/lib/storyblok';

type Props = Omit<LinkProps, 'href' | 'children' | 'target' | 'rel'> &
  HTMLProps<HTMLAnchorElement> & {
    link?: SbMultilink;
  };

export function StoryblokLink({ children, link, ...props }: Props) {
  return (
    <Link
      href={sbLinkToHref(link)}
      {...props}
      {...(link?.target && { target: link.target })}
      {...(link?.rel && { rel: link.rel })}
      {...(link?.title && { title: link.title })}
    >
      {children}
    </Link>
  );
}
