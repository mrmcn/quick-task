export function paginationError(
  countPages: number | undefined,
  pageParam: number,
) {
  if (countPages && countPages < 1) {
    console.log('PaginationRow data < 1', countPages)
    return null
  }

  if (!Number.isInteger(pageParam) || pageParam < 1) {
    console.log('PaginationRow pageParam error', pageParam)
    return null
  }
}
