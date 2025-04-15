'use client'

import { FetchData, UserTasksResult } from '@/lib/services/queries/task'
import { usePagination } from '@/lib/utils/hooks/use-pagination'
import Pagination from '@mui/material/Pagination'

export default function PaginationRow({ tasksDataPromise }: CountPagesProps) {
  const { currentPage, handlePageChange, error, count } =
    usePagination(tasksDataPromise)

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

export interface CountPagesProps {
  tasksDataPromise: FetchData<UserTasksResult>
}
