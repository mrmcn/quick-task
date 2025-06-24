import { ListSearchParameter } from '@/lib/constants/text-const'
import { paginationError } from '@/lib/utils/helpers/pagination-error'
import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { TasksDataPromise } from '@/ui/types'
import { use, useCallback } from 'react'

export function usePagination(props: TasksDataPromise) {
  const { updateUrl, valueCurrentQueryParameter } = useUpdateUrlWithParams(
    ListSearchParameter.page,
  )
  const currentPage = Number(valueCurrentQueryParameter) || 1
  const { data } = use(props.tasksDataPromise)
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
