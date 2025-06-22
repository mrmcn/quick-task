import {
  ListSearchParameter,
  ListSortingParameter,
} from '@/lib/constants/text-const'
import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { SelectChangeEvent } from '@mui/material'
import { useCallback } from 'react'

export function useSortParams() {
  const sortParameter = ListSearchParameter.sorting
  const { updateUrl, valueCurrentQueryParameter } =
    useUpdateUrlWithParams(sortParameter)

  const handleSortChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const newSortParams = e.target.value
      if (!newSortParams) return

      const searchParamsWithNewSort = (params: URLSearchParams) =>
        params.set(sortParameter, newSortParams)
      updateUrl(1, searchParamsWithNewSort)
    },
    [updateUrl, sortParameter],
  )

  const value = valueCurrentQueryParameter || ListSortingParameter.titleAsc

  return {
    handleSortChange,
    value,
  }
}
