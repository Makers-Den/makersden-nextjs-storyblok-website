import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { SvgIcon } from '../icons/SvgIcon';
import { variantToClasses } from '../typography/Typography';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={clsxm('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={clsxm('flex flex-row items-center gap-3', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={clsxm('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationButtonProps = {
  isActive?: boolean;
} & React.ComponentProps<'button'>;

const PaginationButton = ({ isActive, ...props }: PaginationButtonProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={clsxm(
      variantToClasses.textLg,
      'text-primary/40 cursor-pointer rounded-sm px-4 py-3 font-medium transition-all disabled:cursor-default disabled:opacity-70',
      { 'text-primary': isActive },
    )}
    {...props}
  />
);
PaginationButton.displayName = 'PaginationButton';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label='Go to previous page'
    className={clsxm(
      'text-primary cursor-pointer align-middle',
      'disabled:text-primary/40 disabled:cursor-default',
      className,
    )}
    {...props}
  >
    <SvgIcon className='h-auto w-4' name='ChevronLeft' />
  </PaginationButton>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationButton>) => (
  <PaginationButton
    aria-label='Go to next page'
    className={clsxm(
      'text-primary cursor-pointer align-middle',
      'disabled:text-primary/40 disabled:cursor-default',
      className,
    )}
    {...props}
  >
    <SvgIcon className='h-auto w-4' name='ChevronRight' />
  </PaginationButton>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={clsxm('px-4 py-3 text-lg font-medium', className)}
    {...props}
  >
    ...
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
};
