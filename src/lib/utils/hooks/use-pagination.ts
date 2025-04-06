import { CountPagesProps } from '@/ui/dashboard/page/pagination'
import { useCallback } from 'react'
import { paginationError } from '../error-handling'
import { useUpdateUrlWithParams } from './common/use-update-url-with-params'

export function usePagination(countPages: CountPagesProps) {
  const { updateUrl, valueCurrentQueryParameter } =
    useUpdateUrlWithParams('page')
  const currentPage = Number(valueCurrentQueryParameter) || 1

  const error = paginationError(countPages, currentPage)

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, pageNumber: number) => {
      updateUrl(pageNumber)
    },
    [updateUrl],
  )

  return { currentPage, handlePageChange, error }
}
