import { useUpdateUrlWithParams } from '@/lib/utils/hooks/common/use-update-url-with-params'
import { FilterParamsProps } from '@/ui/dashboard/page/types'
import { useCallback } from 'react'

/**
 * @function useFilterParams
 * @description A custom React hook for managing filtering logic based on URL parameters.
 * It integrates with `useUpdateUrlWithParams` to update the URL when a filter changes,
 * and also determines if a specific filter is currently active.
 *
 * @param  - An object containing:
 * - `filteringParam`: The key of the filter parameter in the URL (e.g., 'status', 'priority').
 * - `filterValue`: The value corresponding to this filter (e.g., 'COMPLETED', 'HIGH').
 * @returns- An object containing:
 * - `handleChange`: A callback function that toggles the filter's state (adds/removes it from the URL).
 * - `isActive`: A boolean value indicating whether this filter is currently active (if `currentFilterValue` matches `filterValue`).
 */
export function useFilterParams({
  filteringParam,
  filterValue,
}: FilterParamsProps) {
  // Use the `useUpdateUrlWithParams` hook to access URL update functionality
  // and retrieve the current value of `filteringParam` from the URL.
  const { updateUrl, valueCurrentQueryParameter: currentFilterValue } =
    useUpdateUrlWithParams(filteringParam)

  // Determine if the current filter value is active (if it matches `filterValue`).
  const isActive = currentFilterValue === filterValue

  /**
   * @callback handleChangeFilter
   * @description A memoized function responsible for changing the filter's state.
   * If the filter is already active (`isActive` is `true`), it's removed from the URL.
   * Otherwise, the filter is added to the URL.
   * The page is always reset to 1 after a filter change.
   */
  const handleChangeFilter = useCallback(() => {
    // A function that modifies the URLSearchParams object:
    // deletes the parameter if it's active, or sets it if it's inactive.
    const searchParamsWithNewFilter = (params: URLSearchParams) => {
      if (isActive) {
        // If the filter is active, delete it from the URL parameters.
        params.delete(filteringParam)
      } else {
        // If the filter is inactive, set its value in the URL parameters.
        params.set(filteringParam, filterValue)
      }
    }
    // Update the URL, setting the page to 1 and applying the filter changes.
    updateUrl(1, searchParamsWithNewFilter)
  }, [updateUrl, isActive, filterValue, filteringParam]) // useCallback dependencies

  // Return the `handleChange` function and the `isActive` state.
  return { handleChange: handleChangeFilter, isActive }
}
