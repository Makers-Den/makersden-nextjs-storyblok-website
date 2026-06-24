import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-0.5 text-sm font-semibold transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border-brand-green/40 bg-brand-green text-brand-navy',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={clsxm(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
