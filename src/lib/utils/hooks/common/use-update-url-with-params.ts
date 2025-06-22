import {
  ListSearchParameter,
  ListSearchParameterValue,
  ListSortingParameterValue,
} from '@/lib/constants/text-const'
import { useNextNavigation } from '@/lib/utils/hooks/use-next-navigation'
import { Priority, Status } from '@prisma/client'
import { useCallback } from 'react'

type ParamValueMap = {
  [ListSearchParameter.page]: string
  [ListSearchParameter.priority]: Priority
  [ListSearchParameter.query]: string
  [ListSearchParameter.sorting]: ListSortingParameterValue
  [ListSearchParameter.status]: Status
}

export function useUpdateUrlWithParams<P extends ListSearchParameterValue>(
  filteringParam: P,
) {
  const { pathname, router, searchParams } = useNextNavigation()
  const valueCurrentQueryParameter: ParamValueMap[P] | null = searchParams.get(
    filteringParam,
  ) as ParamValueMap[P] | null

  const updateUrl = useCallback(
    (page: number, updateCurrentParameter?: UpdateParamsProps) => {
      const params = new URLSearchParams(searchParams)
      params.set(ListSearchParameter.page, page.toString())
      if (updateCurrentParameter) updateCurrentParameter(params)
      router.push(`${pathname}?${params}`)
    },
    [searchParams, pathname, router],
  )

  return {
    updateUrl,
    valueCurrentQueryParameter,
  }
}

type UpdateParamsProps = (params: URLSearchParams) => void
