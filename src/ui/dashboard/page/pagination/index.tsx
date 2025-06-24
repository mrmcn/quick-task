'use client'

import { usePagination } from '@/lib/utils/hooks/use-pagination'
import { TasksDataPromise } from '@/ui/types'
import Pagination from '@mui/material/Pagination'

export default function PaginationRow({ tasksDataPromise }: TasksDataPromise) {
  const { currentPage, handlePageChange, error, count } = usePagination({
    tasksDataPromise,
  })

  if (error === null) return null
  return (
    <Pagination
      count={count}
      page={currentPage}
      onChange={handlePageChange}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
      }}
    />
  )
}
