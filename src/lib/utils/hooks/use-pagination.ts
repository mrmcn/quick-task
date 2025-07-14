import { ListSearchParameter } from '@/lib/constants/text-const'
import { FetchData, UserTasksResult } from '@/lib/services/types'
import { usePreparationPaginationParams } from '@/lib/utils/helpers/check-pagination-params'
import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { useCallback } from 'react'

/**
 * @function usePagination
 * @description A custom React hook that manages the pagination logic for a task list.
 * It combines the functionality of updating URL parameters with the preparation and validation
 * of pagination parameters (current page and total page count).
 *
 * @param  userTasksPromise - A promise that resolves to user task results,
 * necessary for determining the total number of pages.
 * @returns  - An object containing:
 * - `resolve`: The result of pagination parameter preparation (success or error), obtained from `usePreparationPaginationParams`.
 * - `handlePageChange`: A callback function to handle pagination page changes, which updates the URL.
 */
export function usePagination(userTasksPromise: FetchData<UserTasksResult>) {
  // Use `useUpdateUrlWithParams` to get the URL update function
  // and the current value of the 'page' parameter from the URL.
  const { updateUrl, valueCurrentQueryParameter } = useUpdateUrlWithParams(
    ListSearchParameter.page,
  )

  // Use `usePreparationPaginationParams` to prepare and validate
  // the pagination parameters based on the URL value and asynchronous data.
  const { resolve } = usePreparationPaginationParams(
    valueCurrentQueryParameter,
    userTasksPromise,
  )

  /**
   * @callback handlePageChange
   * @description A memoized event handler function for changing the current pagination page.
   * It calls `updateUrl` to update the 'page' parameter in the URL.
   *
   * @param  e - The change event object (often not used directly, but part of the signature).
   * @param  pageNumber - The new page number to navigate to.
   */
  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, pageNumber: number) => {
      // Update the 'page' URL parameter to the new page number.
      updateUrl(pageNumber)
    },
    [updateUrl], // Dependency: ensures `handlePageChange` is re-created only if `updateUrl` changes.
  )

  // Return the prepared and validated pagination parameters
  // and the function to handle page changes.
  return { resolve, handlePageChange }
}
