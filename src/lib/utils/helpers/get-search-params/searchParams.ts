import {
  DefaultSearchParameterList,
  SearchParameterList,
  SortingParameterList,
} from '@/lib/constants/text-const'
import { ListSortingParameterValue } from '@/lib/constants/type'
import {
  RawSearchParams,
  SearchParamsObject,
  ValidateParamValueMap,
} from '@/lib/utils/types'
import { Priority, Status } from '@prisma/client'

const { status, page, query, sort, priority } = SearchParameterList
const {
  defaultStatus,
  defaultPage,
  defaultQuery,
  defaultSort,
  defaultPriority,
} = DefaultSearchParameterList

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
 * - `page`: The current page number (numeric).
 * - `sort`: The sorting parameter.
 * - `status`: The status of items (Prisma `Status` enum type).
 * - `priority`: The priority of items (Prisma `Priority` enum type).
 */
export const getValidateSearchParams = (
  searchParamsObject?: SearchParamsObject,
): ValidateParamValueMap => {
  const rawSearchParams: RawSearchParams = {
    [query]: searchParamsObject?.[query],
    [page]: searchParamsObject?.[page],
    [sort]: searchParamsObject?.[sort],
    [status]: searchParamsObject?.[status],
    [priority]: searchParamsObject?.[priority],
  }

  const parsedPage = Number(rawSearchParams.page)
  const isValidPage = Number.isInteger(parsedPage)

  const validSorts = Object.values(SortingParameterList)
  const rawSort = rawSearchParams.sort
  const isValidSort = validSorts.includes(rawSort as ListSortingParameterValue)

  const validStatuses = Object.values(Status)
  const rawStatus = rawSearchParams.status
  const isValidStatus = validStatuses.includes(rawStatus as Status)

  const validPriorities = Object.values(Priority)
  const rawPriority = rawSearchParams.priority
  const isPriority = validPriorities.includes(rawPriority as Priority)

  return {
    // Get the query value or use the default value.
    query: rawSearchParams.query || defaultQuery,
    // Get the current page number, converting it to a number.
    // If the value is missing or invalid, use the default value.
    page: isValidPage ? parsedPage : Number(defaultPage),
    // Get the sort parameter or use the default value.
    sort: isValidSort ? (rawSort as ListSortingParameterValue) : defaultSort,
    // Get the status or use the default value.
    // `as Status` is used for type assertion, as a specific Prisma enum is expected.
    status: isValidStatus ? (rawStatus as Status) : defaultStatus,
    // Get the priority or use the default value.
    // `as Priority` is used for type assertion, as a specific Prisma enum is expected.
    priority: isPriority ? (rawPriority as Priority) : defaultPriority,
  }
}
