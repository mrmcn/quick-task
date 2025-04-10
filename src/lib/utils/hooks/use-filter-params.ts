import { ListSearchParameter } from '@/lib/constants/text-const'
import { MonitoringStatesProps } from '@/lib/services/queries/task'
import { Status } from '@prisma/client'
import { useCallback } from 'react'
import { useUpdateUrlWithParams } from './common/use-update-url-with-params'

export function useFilterParams(type: keyof MonitoringStatesProps) {
  const filterParameter = ListSearchParameter.filter
  const { updateUrl, valueCurrentQueryParameter: filter } =
    useUpdateUrlWithParams(filterParameter)
  const { cardStatus, isActive } = filterLogic(type, filter)

  const handleChangeFilter = useCallback(() => {
    const searchParamsWithNewFilter = (params: URLSearchParams) => {
      if (filter === cardStatus) return params.delete(filterParameter)
      params.set(filterParameter, cardStatus)
    }
    updateUrl(1, searchParamsWithNewFilter)
  }, [updateUrl, filter, cardStatus, filterParameter])

  return { handleChange: handleChangeFilter, isActive }
}

function filterLogic(type: keyof MonitoringStatesProps, filter: string | null) {
  const cardStatus =
    type === 'completed' ? Status.completed : Status.in_progress
  const isActive = filter !== cardStatus

  return { cardStatus, isActive }
}
