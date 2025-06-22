import { taskRepository } from '@/lib/repositories/prisma/tasks'
import {
  FetchData,
  FetchTask,
  MonitoringStatesProps,
  UserTasksResult,
} from '@/lib/services/queries/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/type'
import { SearchParamsObject } from '@/lib/utils/helpers/get-search-params'
import { getSessionData } from '@/lib/utils/helpers/get-session-data'
import prepareTaskFetchParams from '@/lib/utils/helpers/prepare-task-fetch-params'
import { getTaskStatusCountsFromPrismaSchema } from '@/lib/utils/helpers/task-status-counts'

async function userTasksData(
  searchParamsObject?: SearchParamsObject,
): FetchData<UserTasksResult> {
  const { sampleData, error, data } = await prepareTaskFetchParams(
    searchParamsObject,
  )
  if (sampleData) return { data: sampleData }
  if (!data) return { error: handleError(error as HandleErrorProps) }

  try {
    const { tasks, count } = await taskRepository.getUserTasksWithCount({
      id: data.userId,
      offset: data.offset,
      orderBy: data.orderBy,
      query: data.query,
      status: data.status,
      priority: data.priority,
      tasksPerPage: data.tasksPerPage,
    })

    const totalPages = Math.ceil(count / data.tasksPerPage)

    return { data: { tasks, totalPages } }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

async function statusCounts(): FetchData<MonitoringStatesProps> {
  const { userId } = await getSessionData()
  try {
    const groupedTasksByStatus = await taskRepository.getGroupByStatus(userId)
    const data = getTaskStatusCountsFromPrismaSchema(groupedTasksByStatus)

    return { data }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

export const fetchTask: FetchTask = {
  statusCounts,
  userTasksData,
}
