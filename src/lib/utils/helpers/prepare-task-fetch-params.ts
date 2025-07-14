import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { GetUserTasksParams } from '@/lib/repositories/interfaces/tasks'
import { fetchUser } from '@/lib/services/queries/user'
import { getSearchParams } from '@/lib/utils/helpers/get-search-params'
import { SearchParamsObject } from '@/lib/utils/types' // Assuming SearchParamsObject is defined here
import { $Enums, Prisma } from '@prisma/client'
import { Session } from 'next-auth'

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
  session: Session,
  searchParamsObject?: SearchParamsObject,
): Promise<GetUserTasksParams> {
  // Parse search parameters from the URL using the `getSearchParams` helper function.
  const { query, currentPage, sort, status, priority } =
    getSearchParams(searchParamsObject)

  // Fetch user settings, specifically `tasksPerPage` (number of tasks to display per page).
  // This is crucial for pagination.
  const { data, error } = await fetchUser.uniqueData({ tasksPerPage: true })
  // If user data cannot be fetched, throw an error.
  if (!data) throw { error }

  // Calculate the number of records to skip (for pagination).
  // Formula: (current page - 1) * tasks_per_page.
  const skip = (currentPage - 1) * data.tasksPerPage

  // Convert the sort string into an object understandable by Prisma for `orderBy`.
  const orderBy = getOrderBy(sort)

  const where = await buildTaskWhereInput(query, session, status, priority)

  // Return an object with all prepared parameters for the Prisma query.
  return {
    where,
    skip, // Number of records to skip (for pagination)
    orderBy, // Sorting parameters
    take: data.tasksPerPage, // Number of records to take (items per page)
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
  session: Session,
  status?: $Enums.Status,
  priority?: $Enums.Priority,
): Promise<Prisma.TaskWhereInput> {
  // Get the ID of the authenticated user.
  const userId = session.user.id
  const where: Prisma.TaskWhereInput = {
    author: { id: userId },
    status: status,
    priority: priority,
  }
  // Add search conditions for title and details if query is not empty
  if (query !== '') {
    where.OR = [
      ...(where.OR || []), // Preserve existing OR conditions
      {
        [TextFieldsNameAttributeList.title]: INSENSITIVE_CONTAINS(query),
      }, // Search by title
      {
        [TextFieldsNameAttributeList.details]: INSENSITIVE_CONTAINS(query),
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
function getOrderBy(sortParams: string): Prisma.TaskOrderByWithRelationInput {
  // Split the string into the field and order.
  const [field, order] = sortParams.split(' ')

  // Return an object that Prisma can use for sorting.
  // Uses computed property `[field]`
  return {
    [field]: order, // { 'fieldName': 'asc' | 'desc' }
  }
}
