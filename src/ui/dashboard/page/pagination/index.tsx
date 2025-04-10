'use client'

import { usePagination } from '@/lib/utils/hooks/use-pagination'
import Pagination from '@mui/material/Pagination'

export default function PaginationRow({ countPages }: CountPagesProps) {
  const { currentPage, handlePageChange, error, count } =
    usePagination(countPages)

  if (error === null) return null
  return (
    <Pagination
      count={count}
      page={currentPage}
      onChange={handlePageChange}
      sx={{ mt: 2 }}
    />
  )
}

export interface CountPagesProps {
  countPages: number | undefined
}
