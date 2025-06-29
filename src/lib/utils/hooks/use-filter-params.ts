import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { FilterParamsProps } from '@/ui/dashboard/page/chips-block/types'
import { useCallback } from 'react'

export function useFilterParams({
  filteringParam,
  filterValue,
}: FilterParamsProps) {
  const { updateUrl, valueCurrentQueryParameter: currentFilterValue } =
    useUpdateUrlWithParams(filteringParam)
  const isActive = currentFilterValue === filterValue

  const handleChangeFilter = useCallback(() => {
    const searchParamsWithNewFilter = (params: URLSearchParams) => {
      if (isActive) {
        params.delete(filteringParam)
      } else {
        params.set(filteringParam, filterValue)
      }
    }
    updateUrl(1, searchParamsWithNewFilter)
  }, [updateUrl, isActive, filterValue, filteringParam])

  return { handleChange: handleChangeFilter, isActive }
}
