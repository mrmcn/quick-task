import {
  ListSearchParameter,
  ListSortingParameter,
} from '@/lib/constants/text-const'
import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { SelectChangeEvent } from '@mui/material'
import { useCallback } from 'react'

/**
 * @function useSortParams
 * @description A custom React hook that manages sorting parameters in the URL.
 * It provides a function to handle sort changes and the current sorting parameter
 * value from the URL, ensuring the URL is updated upon selection.
 *
 * @returns- An object containing:
 * - `handleSortChange`: An event handler function for the `onChange` event of a Material-UI Select component,
 *   which updates the sorting parameter in the URL.
 * - `value`: The current value of the sorting parameter from the URL, or a default value
 *   (`ListSortingParameter.titleAsc`) if the parameter is not present.
 */
export function useSortParams() {
  // Define the field name for the sorting parameter in the URL.
  const sortFieldName = ListSearchParameter.sorting
  // Use the `useUpdateUrlWithParams` hook to manage URL parameters:
  // `updateUrl` - function to update the URL.
  // `valueCurrentQueryParameter` - the current value of the sorting parameter from the URL.
  const { updateUrl, valueCurrentQueryParameter } =
    useUpdateUrlWithParams(sortFieldName)

  /**
   * @callback handleSortChange
   * @description A memoized event handler function for changes in a Select component.
   * It updates the sorting parameter in the URL based on the newly selected value.
   *
   * @param e - The change event object from the Select component,
   *   `e.target.value` contains the new selected sort value.
   */
  const handleSortChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const newSortParams = e.target.value
      // If the new sort parameters are missing (e.g., an empty string),
      // then no action is taken.
      if (!newSortParams) return

      /**
       * @function searchParamsWithNewSort
       * @description A function to modify the `URLSearchParams` object.
       * It sets the new sorting parameter.
       * @param params - The URL parameters object to modify.
       */
      const searchParamsWithNewSort = (params: URLSearchParams) =>
        params.set(sortFieldName, newSortParams)

      // Update the URL. When sorting changes, the page parameter is reset to 1.
      updateUrl(1, searchParamsWithNewSort)
    },
    [updateUrl, sortFieldName], // Dependencies: `updateUrl` and `sortFieldName`.
  )

  // Determine the current sort value:
  // if the sort parameter is absent from the URL, use the default value.
  const value = valueCurrentQueryParameter || ListSortingParameter.titleAsc

  return {
    handleSortChange, // Function to handle sort changes.
    value, // Current sort value for the Select component.
  }
}
