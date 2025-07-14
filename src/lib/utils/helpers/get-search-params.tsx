import {
  ListDefaultSearchParameter,
  ListSearchParameter,
} from '@/lib/constants/text-const'
import { SearchParamsObject } from '@/lib/utils/types'
import { Priority, Status } from '@prisma/client'

// Destructure constants for better readability.
// These variables represent the keys of search parameters expected in the URL.
const { status, page, query, sorting, priority } = ListSearchParameter
// Destructure constants for default values.
// These values are used if the corresponding search parameter is missing from the URL.
const {
  defaultStatus,
  defaultPage,
  defaultQuery,
  defaultSort,
  defaultPriority,
} = ListDefaultSearchParameter

/**
 * @description Processes and normalizes a search parameters object received from the URL.
 * This function extracts specific parameters (query, current page, sort, status, priority)
 * and provides default values for them if they are missing or invalid.
 * This ensures the application always has correct and complete parameters for filtering/sorting.
 *
 * @param  - An object representing search parameters,
 * obtained from `URLSearchParams`. Can be `undefined`.
 * @returns  - An object containing the normalized search parameters:
 * - `query`: The search query string.
 * - `currentPage`: The current page number (numeric).
 * - `sort`: The sorting parameter.
 * - `status`: The status of items (Prisma `Status` enum type).
 * - `priority`: The priority of items (Prisma `Priority` enum type).
 */
export const getSearchParams = (searchParamsObject?: SearchParamsObject) => {
  return {
    // Get the query value or use the default value.
    query: (searchParamsObject?.[query] as string) || defaultQuery,
    // Get the current page number, converting it to a number.
    // If the value is missing or invalid, use the default value.
    currentPage: Number(searchParamsObject?.[page] || defaultPage),
    // Get the sort parameter or use the default value.
    sort: (searchParamsObject?.[sorting] as string) || defaultSort,
    // Get the status or use the default value.
    // `as Status` is used for type assertion, as a specific Prisma enum is expected.
    status: (searchParamsObject?.[status] as Status) || defaultStatus,
    // Get the priority or use the default value.
    // `as Priority` is used for type assertion, as a specific Prisma enum is expected.
    priority: (searchParamsObject?.[priority] as Priority) || defaultPriority,
  }
}
