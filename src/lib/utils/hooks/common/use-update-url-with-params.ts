import { SearchParameterList } from '@/lib/constants/text-const'
import { ListSearchParameterValue } from '@/lib/constants/type'
import { useNextNavigation } from '@/lib/utils/hooks/use-next-navigation'
import {
  UpdateParamsProps,
  ValueCurrentQueryParameter,
} from '@/lib/utils/types'
import { useCallback } from 'react'

/**
 * @function useUpdateUrlWithParams
 * @description A custom React hook for managing URL parameters. It provides
 * an `updateUrl` function that allows updating URL parameters while preserving
 * the current pathname and other existing parameters. The hook also returns
 * the current value of a specific filtering parameter from the URL.
 *
 * @template P - The type of the filtering parameter passed into the hook (must be one of `ListSearchParameterValue`).
 * @param  filteringParam - The specific search parameter (e.g., `ListSearchParameter.status`)
 * whose value needs to be retrieved from the URL.
 * @returns  - An object containing:
 * - `updateUrl`: A function to update the URL. It accepts a page number and an optional function
 * for additional parameter modification.
 * - `valueCurrentQueryParameter`: The current value of the `filteringParam` from the URL,
 * or `null` if the parameter is not present.
 */
export function useUpdateUrlWithParams<P extends ListSearchParameterValue>(
  filteringParam: P,
) {
  const { pathname, router, searchParams } = useNextNavigation()

  const valueCurrentQueryParameter: ValueCurrentQueryParameter =
    searchParams.get(filteringParam)

  /**
   * @callback updateUrl
   * @description A memoized function to update the URL. It creates a new `URLSearchParams` object
   * based on current parameters, sets the page number, applies any additional
   * parameter changes via `updateCurrentParameter`, and then navigates.
   *
   * @param  page - The page number to navigate to.
   * @param - An optional function that receives
   * `URLSearchParams` and allows adding/changing/deleting other parameters.
   */
  const updateUrl = useCallback(
    (page: number, updateCurrentParameter?: UpdateParamsProps) => {
      const params = new URLSearchParams(searchParams)
      params.set(SearchParameterList.page, page.toString())

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
