import { FetchData, UserTasksResult } from '@/lib/services/types'
import { PreparationPaginationParams } from '@/lib/utils/types'
import { use } from 'react'

/**
 * @function usePreparationPaginationParams
 * @description A custom React hook responsible for preparing and validating
 * pagination parameters (current page and total number of pages).
 * It fetches data from the URL and asynchronous task data, performs checks,
 * and returns either valid parameters or an error state.
 *
 * @param  valueCurrentQueryParameter - The value of the "page" parameter from the URL query.
 * @param  userTasksPromise - A promise that resolves to user task results,
 * including the total number of pages (`totalPages`).
 * @returns  - An object indicating successful parameter preparation
 * (`{ resolve: { currentPage, countPages } }`) or an error (`{ resolve: 'error' }`).
 */
export function usePreparationPaginationParams(
  valueCurrentQueryParameter: number,
  userTasksPromise: FetchData<UserTasksResult>,
): PreparationPaginationParams {
  // Convert the "page" parameter value from the URL to a number; defaults to 1 if not specified.
  const currentPage = valueCurrentQueryParameter || 1
  // Unwrap the `userTasksPromise` to get the data.
  const { data } = use(userTasksPromise)
  // Get the total number of pages from the fetched data.
  const countPages = data?.totalPages

  // Validation check for `countPages`:
  // - Does `countPages` exist (not null/undefined)?
  // - Is `countPages` less than 1 (cannot be less than one page)?
  // - Is `countPages` a number?
  // If any of these conditions are true, it's considered a pagination data error.
  if (!countPages || countPages < 1 || typeof countPages !== 'number') {
    console.log(
      'Pagination data error: totalPages is invalid or less than 1',
      countPages,
    ) // Log the error for debugging.
    return { resolve: 'error' } // Return an error state.
  }

  // Validation check for `currentPage`:
  // - Is `currentPage` an integer?
  // - Is `currentPage` less than 1 (page number must be positive)?
  // If any of these conditions are true, it's considered an invalid page number error.
  if (!Number.isInteger(currentPage) || currentPage < 1) {
    console.log(
      'Pagination page parameter error: currentPage is invalid or less than 1',
      currentPage,
    ) // Log the error for debugging.
    return { resolve: 'error' } // Return an error state.
  }

  // If all checks pass, return a success result with the validated parameters.
  return { resolve: { currentPage, countPages } }
}
