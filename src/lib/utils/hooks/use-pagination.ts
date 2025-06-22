import { ListSearchParameter } from '@/lib/constants/text-const'
import { FetchData, UserTasksResult } from '@/lib/services/queries/types'
import { paginationError } from '@/lib/utils/helpers/pagination-error'
import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { use, useCallback } from 'react'

export function usePagination(tasksDataPromise: FetchData<UserTasksResult>) {
  const { updateUrl, valueCurrentQueryParameter } = useUpdateUrlWithParams(
    ListSearchParameter.page,
  )
  const currentPage = Number(valueCurrentQueryParameter) || 1
  const { data } = use(tasksDataPromise)
  const countPages = data?.totalPages

  const error = paginationError(countPages, currentPage)
  const count = typeof countPages === 'number' ? countPages : undefined

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, pageNumber: number) => {
      updateUrl(pageNumber)
    },
    [updateUrl],
  )

  return { currentPage, handlePageChange, error, count }
}
