'use client'

import { usePagination } from '@/lib/hooks'
import { HandleErrorProps } from '@/lib/utils/error-handling'
import Pagination from '@mui/material/Pagination'

export default function PaginationRow({ countPages }: Props) {
  const { currentPage, handlePageChange, error } = usePagination(countPages)

  if (error === null) return null

  return (
    <Pagination
      count={countPages.data}
      page={currentPage}
      onChange={handlePageChange}
      sx={{ mt: 2 }}
    />
  )
}

interface Props {
  countPages: CountPagesProps
}

export type CountPagesProps =
  | {
      data: number
      error?: undefined
    }
  | {
      error: HandleErrorProps
      data?: undefined
    }
