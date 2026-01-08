'use client';

import { Fragment, useRef } from 'react';

import { generatePaginationItems } from '@/lib/pagination';

import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface PaginatedListProps<T> {
  items: T[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  renderItems: (items: T[]) => React.ReactNode;
  emptyMessage: string;
  className?: string;
}

export function PaginatedList<T>({
  items,
  itemsPerPage,
  currentPage,
  onPageChange,
  renderItems,
  emptyMessage,
  className,
}: PaginatedListProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(Math.ceil(items.length / itemsPerPage), 1);
  const itemsPage = items.slice(
    itemsPerPage * currentPage,
    (currentPage + 1) * itemsPerPage,
  );
  const paginationItems = generatePaginationItems(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    wrapperRef.current?.scrollIntoView();
  };

  return (
    <div ref={wrapperRef} className={className}>
      {itemsPage.length > 0 ? (
        renderItems(itemsPage)
      ) : (
        <div className='py-40 text-center'>{emptyMessage}</div>
      )}

      {totalPages > 1 && (
        <Pagination className='pt-8 lg:pt-12'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>

            {paginationItems.map((item, index) => (
              <Fragment key={index}>
                {item.type === 'page' && (
                  <PaginationItem>
                    <PaginationButton
                      isActive={currentPage === item.page}
                      onClick={() => handlePageChange(item.page)}
                    >
                      {item.page + 1}
                    </PaginationButton>
                  </PaginationItem>
                )}
                {item.type === 'divider' && <PaginationEllipsis />}
              </Fragment>
            ))}

            <PaginationItem>
              <PaginationNext
                disabled={currentPage === totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
