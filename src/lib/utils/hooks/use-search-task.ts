import { ListSearchParameter } from '@/lib/constants/text-const'
import { debounce } from '@/lib/utils/helpers/debounce'
import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { ChangeEvent, useCallback } from 'react'

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
  // Define the field name for the search query, using a constant.
  const queryFieldName = ListSearchParameter.query
  // Get the `updateUrl` function and the current value of the query parameter from the URL,
  // using the `useUpdateUrlWithParams` hook.
  const { valueCurrentQueryParameter, updateUrl } =
    useUpdateUrlWithParams(queryFieldName)

  /**
   * @function debounceSearch
   * @description A memoized debounced function that updates the 'query' parameter
   * in the URL based on the search input text.
   * It is called only after a pause in user typing.
   *
   * @param  searchParameter - The text to be used for the search query.
   */
  const debounceSearch = debounce((searchParameter: string) => {
    /**
     * @function searchParamsWithNewQuery
     * @description A function to modify the `URLSearchParams` object.
     * It adds or deletes the 'query' parameter based on the presence of `searchParameter`.
     * @param  params - The URL parameters object to modify.
     */
    const searchParamsWithNewQuery = (params: URLSearchParams) => {
      if (searchParameter) {
        // If there's search text, set it as the 'query' parameter.
        params.set(queryFieldName, searchParameter)
      } else {
        // If the search text is empty, delete the 'query' parameter from the URL.
        params.delete(queryFieldName)
      }
    }
    // Update the URL. The page parameter is reset to 1 on a new search.
    updateUrl(1, searchParamsWithNewQuery)
  })

  /**
   * @callback handleSearch
   * @description A memoized event handler function for the `onChange` event of the search input field.
   * It passes the current input field value to the `debounceSearch` function.
   *
   * @param  e - The change event object,
   * containing the current value of the input field.
   */
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      debounceSearch(e.target.value) // Trigger the debounced search
    },
    [debounceSearch], // Dependency: ensures `handleSearch` is re-created only if `debounceSearch` changes.
  )

  return { handleSearch, query: valueCurrentQueryParameter }
}
