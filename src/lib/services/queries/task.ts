import { TaskListDto, taskRepository } from '@/lib/repositories/prisma/tasks'
import {
  HandleError,
  handleError,
  HandleErrorProps,
} from '@/lib/utils/error-handling'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import { getSessionData } from '@/lib/utils/get-session-data'
import prepareTaskFetchParams from '@/lib/utils/services-helper/prepare-task-fetch-params'
import { getTaskStatusCountsFromPrismaSchema } from '@/lib/utils/services-helper/task-status-counts'
import { Status } from '@prisma/client'

export async function fetchUserTasksData(
  searchParamsObject?: SearchParamsObject,
): FetchData<UserTasksResult> {
  const { sampleData, error, data } = await prepareTaskFetchParams(
    searchParamsObject,
  )
  if (sampleData) return { data: sampleData }
  if (error) return { error: handleError(error as HandleErrorProps) }

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

export async function fetchMonitoringStates(): FetchData<MonitoringStatesProps> {
  const { userId } = await getSessionData()
  try {
    const groupInProgress = await taskRepository.getMonitoringStates(userId)
    const data = getTaskStatusCountsFromPrismaSchema(groupInProgress)

    return { data }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

export type FetchData<T> = Promise<
  { data: T; error?: undefined } | { error: HandleError; data?: undefined }
>

export interface UserTasksResult {
  tasks: TaskListDto[]
  totalPages: number
}

export interface MonitoringStatesProps {
  [Status.completed]: number
  [Status.in_progress]: number
}
