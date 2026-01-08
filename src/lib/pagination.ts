export type PaginationItem =
  | { type: 'page'; page: number }
  | { type: 'divider' };

export function generatePaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  const result: PaginationItem[] = [];

  if (totalPages <= 5) {
    return new Array(totalPages)
      .fill(null)
      .map((_, index) => ({ type: 'page', page: index }));
  }

  result.push({ type: 'page', page: 0 });

  if (currentPage > 2) {
    result.push({ type: 'divider' });
  }

  if (currentPage > totalPages - 3) {
    result.push({ type: 'page', page: totalPages - 4 });
    if (currentPage > totalPages - 2) {
      result.push({ type: 'page', page: totalPages - 3 });
    }
  }

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages - 2, currentPage + 1);
    i++
  ) {
    result.push({ type: 'page', page: i });
  }

  if (currentPage < 2) {
    if (currentPage < 1) {
      result.push({ type: 'page', page: 2 });
    }

    result.push({ type: 'page', page: 3 });
  }

  if (currentPage < totalPages - 3) {
    result.push({ type: 'divider' });
  }

  if (totalPages > 1) {
    result.push({ type: 'page', page: totalPages - 1 });
  }

  return result;
}
