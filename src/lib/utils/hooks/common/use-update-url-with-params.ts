import {
  ListSearchParameter,
  ListSearchParameterValue,
} from '@/lib/constants/text-const'
import { useCallback } from 'react'
import { useNextNavigation } from '../use-next-navigation'

export function useUpdateUrlWithParams(
  filteringParam: ListSearchParameterValue,
) {
  const { pathname, router, searchParams } = useNextNavigation()
  const valueCurrentQueryParameter = searchParams.get(filteringParam)

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
