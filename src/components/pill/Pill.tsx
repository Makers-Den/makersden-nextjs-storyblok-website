import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

const pillVariants = cva(
  'inline-flex items-center justify-center text-white font-medium transition-colors capitalize',
  {
    variants: {
      variant: {
        default: 'bg-grey hover:bg-black',
        active: 'bg-black',
        muted: 'bg-muted hover:bg-muted/80',
      },
      size: {
        sm: 'rounded-sm px-2 py-0.5 text-sm leading-5',
        md: 'rounded-xl px-6 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

type PillButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof pillVariants> & {
    asChild?: boolean;
    as?: 'button';
  };

type PillSpanProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof pillVariants> & {
    as: 'span';
  };

export type PillProps = PillButtonProps | PillSpanProps;

const Pill = React.forwardRef<HTMLButtonElement | HTMLSpanElement, PillProps>(
  (props, ref) => {
    const { className, variant, size, as, ...rest } = props;

    if (as === 'span') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={clsxm(pillVariants({ variant, size }), className)}
          {...rest}
        />
      );
    }

    const { asChild, ...restButtonProps } = rest as PillButtonProps;
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={clsxm(pillVariants({ variant, size }), className)}
        {...restButtonProps}
      />
    );
  },
);
Pill.displayName = 'Pill';

export { Pill, pillVariants };
