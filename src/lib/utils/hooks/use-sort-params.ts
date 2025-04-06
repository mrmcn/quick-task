import { SelectChangeEvent } from '@mui/material'
import { useCallback } from 'react'
import { useUpdateUrlWithParams } from './common/use-update-url-with-params'

export function useSortParams() {
  const { updateUrl, valueCurrentQueryParameter } =
    useUpdateUrlWithParams('sort')

  const handleSortChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const newSortParams = e.target.value
      if (!newSortParams) return

      const searchParamsWithNewSort = (params: URLSearchParams) =>
        params.set('sort', newSortParams)
      updateUrl(1, searchParamsWithNewSort)
    },
    [updateUrl],
  )

  return { handleSortChange, selectValue: valueCurrentQueryParameter }
}
