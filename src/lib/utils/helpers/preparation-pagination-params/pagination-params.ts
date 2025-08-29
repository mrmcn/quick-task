import { ResponseObject, UserTasksResult } from '@/lib/services/types'
import {
  PreparationPaginationParams,
  ValueCurrentQueryParameter,
} from '@/lib/utils/types'

/**
 * @function preparationPaginationParams
 * @description A function responsible for preparing and validating
 * pagination parameters (current page and total number of pages).
 * It fetches data from the URL and task data, performs checks,
 * and returns either valid parameters or an error state.
 *
 * @param  valueCurrentQueryParameter - The value of the "page" parameter from the URL query.
 * @param  userTasksResult - A object contains data  user task results, including the total
 * number of pages (`totalPages`) and error.
 * @returns  - An object indicating successful parameter preparation
 * (`{ resolve: { currentPage, countPages } }`) or an error (`{ resolve: 'error' }`).
 */
export function preparationPaginationParams(
  valueCurrentQueryParameter: ValueCurrentQueryParameter,
  userTasksResult: ResponseObject<UserTasksResult>,
): PreparationPaginationParams {
  if (userTasksResult.error) {
    console.log('User tasks result is undefined or null', userTasksResult)
    return { resolve: 'error' }
  }
  const countPages = userTasksResult.data.totalPages
  const currentPage = valueCurrentQueryParameter
    ? Number(valueCurrentQueryParameter)
    : 1

  if (!countPages || countPages < 1 || typeof countPages !== 'number')
    return { resolve: 'error' }

  if (
    currentPage < 1 ||
    !Number.isInteger(currentPage) ||
    currentPage >= countPages
  )
    return { resolve: 'error' }

  return { resolve: { currentPage, countPages } }
}
