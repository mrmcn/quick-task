'use client'

import { UserTasksPromise } from '@/lib/services/types'
import { usePagination } from '@/lib/utils/hooks/use-pagination'
import { sxDashboardPage } from '@/ui/dashboard/page/styles'
import Pagination from '@mui/material/Pagination'

/**
 * @function PaginationRow
 * @description A client component that displays a pagination row for navigating through a task list.
 * It uses the custom `usePagination` hook to handle page logic and URL interaction.
 * If pagination data indicates an error, the component renders nothing.
 *
 * @param userTasksPromise - A Promise that resolves with user task data, including the total number of pages.
 * @returns A Material-UI `Pagination` component or `null` if an error occurred.
 */
export default function PaginationRow({ userTasksPromise }: UserTasksPromise) {
  // Use the custom usePagination hook to get the prepared pagination data
  // and the page change handler function.
  const { resolve, handlePageChange } = usePagination(userTasksPromise)

  // If pagination data processing returned an error, the component renders nothing.
  if (resolve === 'error') return null

  return (
    <Pagination
      count={resolve.countPages}
      page={resolve.currentPage}
      onChange={handlePageChange}
      sx={sxDashboardPage.pagination}
    />
  )
}
