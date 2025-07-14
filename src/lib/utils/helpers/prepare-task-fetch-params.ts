import { auth } from '@/auth'
import TASK_DATA from '@/lib/constants/data/sample-task'
import { fetchUser } from '@/lib/services/queries/user'
import {
  getSearchParams,
  SearchParamsObject,
} from '@/lib/utils/helpers/get-search-params'
import { Prisma } from '@prisma/client'

/**
 * @function prepareTaskFetchParams
 * @description An asynchronous function to prepare the parameters required for fetching a list of tasks.
 * It handles scenarios for both authenticated and unauthenticated users.
 * For authenticated users, the function collects the user ID, tasks per page,
 * as well as sorting, filtering, and pagination parameters.
 * For unauthenticated users, it returns sample data.
 *
 * @param  - An object of search parameters, obtained from the URL.
 * Can be `undefined` if no parameters are present.
 * @returns  - A Promise that resolves to an object containing:
 * - `sampleData`: If the user is unauthenticated, it contains sample task data and total pages.
 * - `data`: An object with Prisma query parameters (`userId`, `skip`, `orderBy`, `query`, `status`, `priority`, `take`),
 * if the user is authenticated.
 * @throws  - Throws an object `{ error }` if user data (e.g., `tasksPerPage`) could not be fetched.
 */
export default async function prepareTaskFetchParams(
  searchParamsObject?: SearchParamsObject,
) {
  // Retrieve the current authentication session.
  const session = await auth()

  // If no session exists (user is not authenticated), return sample data.
  // This allows the application to function with basic content for logged-out users.
  if (!session) {
    return { sampleData: { tasks: TASK_DATA, totalPages: 1 } } // for sample
  }

  // Get the ID of the authenticated user.
  const userId = session.user.id

  // Fetch user settings, specifically `tasksPerPage` (number of tasks to display per page).
  // This is crucial for pagination.
  const { data, error } = await fetchUser.uniqueData({ tasksPerPage: true })
  // If user data cannot be fetched, throw an error.
  if (!data) throw { error }

  // Parse search parameters from the URL using the `getSearchParams` helper function.
  const { query, currentPage, sort, status, priority } =
    getSearchParams(searchParamsObject)

  // Calculate the number of records to skip (for pagination).
  // Formula: (current page - 1) * tasks_per_page.
  const skip = (currentPage - 1) * data.tasksPerPage

  // Convert the sort string into an object understandable by Prisma for `orderBy`.
  const orderBy = getOrderBy(sort)

  // Return an object with all prepared parameters for the Prisma query.
  return {
    data: {
      userId, // ID of the user for whom tasks are being fetched
      skip, // Number of records to skip (for pagination)
      orderBy, // Sorting parameters
      query, // Search query string
      status, // Filter by status
      priority, // Filter by priority
      take: data.tasksPerPage, // Number of records to take (items per page)
    },
  }
}

/**
 * @function getOrderBy
 * @description Helper function to convert a sort parameter string
 * (e.g., "createdAt desc") into an object understandable by Prisma for `orderBy`.
 *
 * @param  sortParams - A string containing the field to sort by and the order (e.g., "fieldName asc" or "fieldName desc").
 * @returns  - A Prisma sort object,
 * where the key is the field name and the value is the order ("asc" or "desc").
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
