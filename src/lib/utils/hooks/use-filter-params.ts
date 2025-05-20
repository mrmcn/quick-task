import { ListSearchParameterValue } from '@/lib/constants/text-const'
import { Priority, Status } from '@prisma/client'
import { useCallback } from 'react'
import { useUpdateUrlWithParams } from './common/use-update-url-with-params'

export function useFilterParams(
  filterValue: Status | Priority,
  filteringParam: ListSearchParameterValue,
) {
  const { updateUrl, valueCurrentQueryParameter: currentFilterValue } =
    useUpdateUrlWithParams(filteringParam)
  const isActive = currentFilterValue === filterValue

  const handleChangeFilter = useCallback(() => {
    const searchParamsWithNewFilter = (params: URLSearchParams) => {
      if (currentFilterValue === filterValue)
        return params.delete(filteringParam)
      params.set(filteringParam, filterValue)
    }
    updateUrl(1, searchParamsWithNewFilter)
  }, [updateUrl, currentFilterValue, filterValue, filteringParam])

  return { handleChange: handleChangeFilter, isActive }
}
