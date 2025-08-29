import { NameAttributeList } from '@/lib/constants/text-const'
import { ListSortingParameterValue } from '@/lib/constants/type'
import { GetUserTasksParams } from '@/lib/repositories/interfaces/tasks'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'
import { getValidateSearchParams } from '@/lib/utils/helpers/get-search-params/searchParams'
import { SearchParamsObject } from '@/lib/utils/types'
import { $Enums, Prisma } from '@prisma/client'

/**
 * This file contains helper functions for preparing Prisma query parameters,
 * used to fetch a list of user tasks with support for filtering,
 * sorting, and pagination.
 */

/**
 * Creates a `Prisma.StringFilter` object for case-insensitive `contains` search.
 * Used to implement "fuzzy" text search.
 *
 * @param query The search query string.
 * @returns A Prisma filter object.
 */
export const INSENSITIVE_CONTAINS = (query: string) =>
  ({
    contains: query,
    mode: 'insensitive',
  } as const)

/**
 * @function prepareTaskFetchParams
 * @description An asynchronous function to prepare all necessary parameters for a database query
 * to fetch a list of tasks. It collects the user ID, tasks per page,
 * as well as sorting, filtering, and pagination parameters.
 *
 * @param session The authenticated user's session object.
 * @param searchParamsObject An object of search parameters, obtained from the URL. Can be `undefined`.
 * @returns A Promise that resolves to a `GetUserTasksParams` object
 * with prepared Prisma query parameters (`where`, `skip`, `orderBy`, `take`).
 * @throws Throws an object `{ error }` if user data (e.g., `tasksPerPage`) could not be fetched.
 *
 * Note: This function expects the user to already be authenticated. Handling unauthenticated
 * users (returning sample data) occurs at a higher level.
 */
export async function prepareTaskFetchParams(
  userId: string,
  searchParamsObject?: SearchParamsObject,
): Promise<GetUserTasksParams> {
  const { data, error } = await fetchUser.uniqueData({ tasksPerPage: true })

  if (error) throw error

  const {
    query,
    page: currentPage,
    sort,
    status,
    priority,
  } = getValidateSearchParams(searchParamsObject)

  const take = data.tasksPerPage
  // Calculate the number of records to skip (for pagination).
  const skip = (currentPage - 1) * take

  const orderBy = getOrderBy(sort)

  const where = await buildTaskWhereInput(query, userId, status, priority)

  return {
    where,
    skip,
    orderBy,
    take,
  }
}

/**
 * Builds a `Prisma.TaskWhereInput` object based on the provided filtering parameters
 * and search query.
 *
 * @param query The search query string.
 * @param session The authenticated user's session object, used to get `userId`.
 * @param status Optional task status for filtering.
 * @param priority Optional task priority for filtering.
 * @returns A Promise that resolves to a `Prisma.TaskWhereInput` object.
 */
async function buildTaskWhereInput(
  query: string,
  id: string,
  status?: $Enums.Status,
  priority?: $Enums.Priority,
): Promise<Prisma.TaskWhereInput> {
  const where: Prisma.TaskWhereInput = {
    author: { id },
    status: status,
    priority: priority,
  }
  // Add search conditions for title and details if query is not empty
  if (query !== '') {
    where.OR = [
      ...(where.OR || []), // Preserve existing OR conditions
      {
        [NameAttributeList.title]: INSENSITIVE_CONTAINS(query),
      }, // Search by title
      {
        [NameAttributeList.details]: INSENSITIVE_CONTAINS(query),
      }, // Search by details
    ]
  }
  return where
}

/**
 * @function getOrderBy
 * @description Converts a sort parameter string (e.g., "createdAt desc")
 * into an object understandable by Prisma for the `orderBy` clause.
 *
 * @param sortParams A string containing the field to sort by and the order (e.g., "fieldName asc" or "fieldName desc").
 * @returns A Prisma sort object, where the key is the field name and the value is the order ("asc" or "desc").
 */
function getOrderBy(
  sortParams: ListSortingParameterValue,
): Prisma.TaskOrderByWithRelationInput {
  const [field, order] = sortParams.split(' ')

  return {
    [field]: order, // { 'title': 'asc' | 'desc' or 'data': 'asc' | 'desc' }
  }
}
