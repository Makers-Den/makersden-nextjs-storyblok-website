import Link, { type LinkProps } from 'next/link';
import * as React from 'react';

import { Button, type ButtonProps } from '@/components/button';

type ButtonLinkProps = ButtonProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof LinkProps | 'children'> & {
    href: LinkProps['href'];
    prefetch?: LinkProps['prefetch'];
  };

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, prefetch, children, ...buttonProps }, ref) => {
    return (
      <Button asChild {...buttonProps}>
        <Link ref={ref} href={href} prefetch={prefetch}>
          {children}
        </Link>
      </Button>
    );
  },
);

ButtonLink.displayName = 'ButtonLink';
