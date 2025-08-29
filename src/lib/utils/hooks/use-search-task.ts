import { SearchParameterList } from '@/lib/constants/text-const'
import { debounce } from '@/lib/utils/helpers/debounce'
import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { ChangeEvent, useCallback } from 'react'

const queryFieldName = SearchParameterList.query

/**
 * @function useSearchTask
 * @description A custom React hook that encapsulates the task search logic
 * using debouncing and URL parameter updates.
 * This prevents excessive requests when typing in the search field.
 *
 * @returns- An object containing:
 * - `handleSearch`: An event handler function for the `onChange` event of a search input field,
 * which applies a debounce before updating the URL with the new query.
 * - `query`: The current value of the `query` search parameter from the URL.
 */
export function useSearchTask() {
  const { valueCurrentQueryParameter, updateUrl } =
    useUpdateUrlWithParams(queryFieldName)

  const debounceSearch = debounce((searchParameter: string) => {
    const searchParamsWithNewQuery = (params: URLSearchParams) => {
      if (searchParameter) {
        params.set(queryFieldName, searchParameter)
      } else {
        params.delete(queryFieldName)
      }
    }
    updateUrl(1, searchParamsWithNewQuery)
  })

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      debounceSearch(e.target.value)
    },
    [debounceSearch],
  )

  return { handleSearch, query: valueCurrentQueryParameter }
}
