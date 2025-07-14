import { taskRepository } from '@/lib/repositories/prisma/tasks'
import {
  FetchData,
  FetchTask,
  MonitoringStatesProps,
  UserTasksResult,
} from '@/lib/services/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/type'
import { SearchParamsObject } from '@/lib/utils/helpers/get-search-params'
import { getSessionData } from '@/lib/utils/helpers/get-session-data'
import prepareTaskFetchParams from '@/lib/utils/helpers/prepare-task-fetch-params'
import { getTaskStatusCountsFromPrismaSchema } from '@/lib/utils/helpers/task-status-counts'

/**
 * This file contains Server Actions (though the functions aren't directly exported as Server Actions,
 * they execute on the server and serve to fetch data for server components),
 * designed for retrieving task-related data.
 *
 * It centralizes the logic for fetching a user's task list with filtering and pagination support,
 * as well as retrieving aggregated data on task statuses.
 */

/**
 * Fetches task data for an authenticated user, with support for filtering, sorting, and pagination.
 * This function utilizes `prepareTaskFetchParams` for initial session and search parameter processing.
 *
 * @param  An object containing search parameters for filtering and paginating tasks.
 * * If the user is not authenticated, sample data will be returned.
 * @returns  An object containing the fetched data (task list and total pages)
 * or error information.
 */
async function userTasksData(
  searchParamsObject?: SearchParamsObject,
): FetchData<UserTasksResult> {
  // This step processes session data, search parameters, and returns prepared data for the query, or sample data
  // for unauthenticated users.
  const { sampleData, data } = await prepareTaskFetchParams(searchParamsObject)

  // 2. If prepareTaskFetchParams returns sample data, return it.
  if (sampleData) return { data: sampleData }

  // 3. Execute the query to the task repository.
  try {
    const { tasks, count } = await taskRepository.getUserTasksWithCount({
      initialWhere: { author: { id: data.userId } }, // Filter by author ID
      orderBy: data.orderBy, // Sorting parameters
      skip: data.skip, // Offset for pagination
      take: data.take, // Number of tasks per page
      query: data.query, // Search query string
    })

    // 4. Calculate the total number of pages based on the total task count and tasks per page.
    const totalPages = Math.ceil(count / data.take)

    // 5. Return the successful data.
    return { data: { tasks, totalPages } }
  } catch (error) {
    // 6. Handle errors during data fetching.
    return { error: handleError(error as HandleErrorProps) }
  }
}

/**
 * Retrieves aggregated data on the count of tasks by their statuses for the current user.
 *
 * @returns An object containing aggregated task status data
 * or error information.
 */
async function statusCounts(): FetchData<MonitoringStatesProps> {
  // 1. Retrieve the user ID from the session.
  // This function might redirect to the sign-in page if the session is missing.
  const { userId } = await getSessionData()
  try {
    // 2. Fetch grouped tasks by status from the repository.
    const groupedTasksByStatus = await taskRepository.getGroupByStatus(userId)

    // 3. Transform the retrieved Prisma data into the desired format.
    const data = getTaskStatusCountsFromPrismaSchema(groupedTasksByStatus)

    // 4. Return the successful aggregated data.
    return { data }
  } catch (error) {
    // 5. Handle errors during aggregated data retrieval.
    return { error: handleError(error as HandleErrorProps) }
  }
}

/**
 * An object that exports functions for fetching task data.
 * Provides centralized access to data fetching functions for use in Server Components
 * or other server-side contexts.
 */
export const fetchTask: FetchTask = {
  statusCounts, // Function for getting task counts by status.
  userTasksData, // Function for getting the user's task list with pagination and filtering.
}
