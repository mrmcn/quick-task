'use client'

import { ErrorList } from '@/lib/constants/text-const'
import { UserTasksPromise } from '@/lib/services/types'
import { usePagination } from '@/lib/utils/hooks/use-pagination/pagination'
import { sxDashboardPage } from '@/ui/dashboard/page/styles'
import Alert from '@mui/material/Alert'
import Pagination from '@mui/material/Pagination'
import { use } from 'react'

/**
 * @function PaginationRow
 * @description A client component that displays a pagination row for navigating through a task list.
 * It uses the custom `usePagination` hook to handle page logic and URL interaction.
 *
 * @param userTasksPromise - A Promise that resolves with user task data, including the total number of pages.
 * @returns A Material-UI `Pagination` component or `Alert` if an error occurred.
 */
export default function PaginationRow({ userTasksPromise }: UserTasksPromise) {
  const userTasksResult = use(userTasksPromise)
  const { resolve, handlePageChange } = usePagination(userTasksResult)

  if (resolve === 'error')
    return (
      <Alert
        variant='outlined'
        severity='error'
      >
        {ErrorList.paginationError}
      </Alert>
    )

  return (
    <Pagination
      count={resolve.countPages}
      page={resolve.currentPage}
      onChange={handlePageChange}
      sx={sxDashboardPage.pagination}
    />
  )
}
