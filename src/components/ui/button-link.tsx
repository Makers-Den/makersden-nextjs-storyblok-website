import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';

import { Link } from '@/i18n/navigation';

type LocaleLinkProps = React.ComponentPropsWithoutRef<typeof Link>;
type ButtonLinkProps = ButtonProps &
  Omit<LocaleLinkProps, keyof ButtonProps | 'children'> & {
    href: LocaleLinkProps['href'];
    prefetch?: LocaleLinkProps['prefetch'];
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
