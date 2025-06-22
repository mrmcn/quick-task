import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { FilteringParam } from '@/ui/dashboard/page/chips-block/types'
import { Priority, Status } from '@prisma/client'
import { useCallback } from 'react'

export function useFilterParams(
  filterValue: Status | Priority,
  filteringParam: FilteringParam,
) {
  const { updateUrl, valueCurrentQueryParameter: currentFilterValue } =
    useUpdateUrlWithParams(filteringParam)
  const isActive = currentFilterValue === filterValue

  const handleChangeFilter = useCallback(() => {
    const searchParamsWithNewFilter = (params: URLSearchParams) => {
      if (isActive) params.delete(filteringParam)
      params.set(filteringParam, filterValue)
    }
    updateUrl(1, searchParamsWithNewFilter)
  }, [updateUrl, isActive, filterValue, filteringParam])

  return { handleChange: handleChangeFilter, isActive }
}
