'use client'
import { SearchParameterList } from '@/lib/constants/text-const'
import { ResponseObject, UserTasksResult } from '@/lib/services/types'
import { preparationPaginationParams } from '@/lib/utils/helpers/preparation-pagination-params/pagination-params'
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
export function usePagination(
  userTasksResult: ResponseObject<UserTasksResult>,
) {
  const { updateUrl, valueCurrentQueryParameter } = useUpdateUrlWithParams(
    SearchParameterList.page,
  )
  const { resolve } = preparationPaginationParams(
    valueCurrentQueryParameter,
    userTasksResult,
  )

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, pageNumber: number) => {
      updateUrl(pageNumber)
    },
    [updateUrl],
  )

  return { resolve, handlePageChange }
}

// test('should return valid pagination parameters when inputs are correct', async () => {
//   jest.mocked(require('react').use).mockReturnValue(testUserTasksResult)

//   const { result } = renderHook(() =>
//     preparationPaginationParams(testParamPage, testUserTasksResultPromise),
//   )
//   await new Promise(process.nextTick)
//   expect(result.current).toEqual(testSuccessPaginationParams)
// })
