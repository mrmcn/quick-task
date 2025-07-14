'use client'

import { UserTasksPromise } from '@/lib/services/types'
import { usePagination } from '@/lib/utils/hooks/use-pagination'
import Pagination from '@mui/material/Pagination'

export default function PaginationRow({ userTasksPromise }: UserTasksPromise) {
  const { resolve, handlePageChange } = usePagination(userTasksPromise)

  if (resolve === 'error') return null

  return (
    <Pagination
      count={resolve.countPages}
      page={resolve.currentPage}
      onChange={handlePageChange}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
      }}
    />
  )
}
