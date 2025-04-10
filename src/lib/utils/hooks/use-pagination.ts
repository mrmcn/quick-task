import { ListSearchParameter } from '@/lib/constants/text-const'
import { useCallback } from 'react'
import { HandleErrorProps, paginationError } from '../error-handling'
import { useUpdateUrlWithParams } from './common/use-update-url-with-params'

export function usePagination(countPages: number | HandleErrorProps) {
  const { updateUrl, valueCurrentQueryParameter } = useUpdateUrlWithParams(
    ListSearchParameter.page,
  )
  const currentPage = Number(valueCurrentQueryParameter) || 1

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
