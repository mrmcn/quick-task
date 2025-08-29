import { auth } from '@/auth'
import TASK_DATA from '@/lib/constants/data/sample-task'
import { taskRepository } from '@/lib/repositories/prisma/tasks/taskRepository'
import {
  FetchData,
  FetchTask,
  MonitoringStatesProps,
  UserTasksResult,
} from '@/lib/services/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/types'
import { getSessionData } from '@/lib/utils/helpers/get-session-data/session'
import { prepareTaskFetchParams } from '@/lib/utils/helpers/prepare-task-fetch-params'
import { getTaskStatusCountsFromPrismaSchema } from '@/lib/utils/helpers/task-status-counts'
import { SearchParamsObject } from '@/lib/utils/types'

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
  const session = await auth()

  if (!session) {
    return { data: { tasks: TASK_DATA, totalPages: 1 } } // for sample
  }

  const data = await prepareTaskFetchParams(session.user.id, searchParamsObject)

  try {
    const { tasks, count } = await taskRepository.getUserTasksWithCount(data)
    const totalPages = Math.ceil(count / data.take)

    return { data: { tasks, totalPages } }
  } catch (error) {
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
  const { id } = await getSessionData()
  try {
    const groupedTasksByStatus = await taskRepository.getGroupByStatus(id)
    const data = getTaskStatusCountsFromPrismaSchema(groupedTasksByStatus)

    return { data }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

/**
 * An object that exports functions for fetching task data.
 * Provides centralized access to data fetching functions for use in Server Components
 * or other server-side contexts.
 */
export const fetchTask: FetchTask = {
  statusCounts,
  userTasksData,
}
