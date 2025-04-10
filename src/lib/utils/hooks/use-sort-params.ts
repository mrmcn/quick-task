import {
  ListSearchParameter,
  ListSortingParameterProps,
} from '@/lib/constants/text-const'
import { SelectChangeEvent } from '@mui/material'
import { useCallback } from 'react'
import { useUpdateUrlWithParams } from './common/use-update-url-with-params'

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

  return {
    handleSortChange,
    selectValue: valueCurrentQueryParameter as ListSortingParameterProps,
  }
}
