import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { taskRepository } from '@/lib/repositories/prisma/tasks'
import {
  HandleError,
  handleError,
  HandleErrorProps,
} from '@/lib/utils/error-handling'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import prepareTaskFetchParams from '@/lib/utils/services-helper/prepare-task-fetch-params'
import { getTaskStatusCountsFromPrismaSchema } from '@/lib/utils/services-helper/task-status-counts'
import { Status, Task } from '@prisma/client'

export async function fetchUserTasksData(
  searchParamsObject?: SearchParamsObject,
): FetchData<UserTasksResult> {
  const { sampleData, error, data } = await prepareTaskFetchParams(
    searchParamsObject,
  )
  if (sampleData) return { data: sampleData }
  if (error) throw error

  try {
    const { tasks, count } = await taskRepository.getUserTasksWithCount({
      userId: data.userId,
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

export async function fetchTaskIdData(
  id: FetchTaskIdDataProps,
): FetchData<TaskId> {
  try {
    const data = await prisma.task.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        title: true,
        details: true,
        priority: true,
      },
    })

    return { data }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

export async function fetchMonitoringStates(): FetchData<MonitoringStatesProps> {
  const session = await auth()
  const authorId = session?.user.id
  try {
    const groupInProgress = await prisma.task.groupBy({
      by: ['status'],
      where: {
        authorId: authorId,
      },
      _count: { status: true },
    })
    const data = getTaskStatusCountsFromPrismaSchema(groupInProgress)

    return { data }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

export type FetchData<T> = Promise<
  { data: T; error?: undefined } | { error: HandleError; data?: undefined }
>

export type TaskData = Omit<Task, 'date' | 'authorId'>

export type TaskId = Omit<TaskData, 'status'>

export interface UserTasksResult {
  tasks: TaskData[]
  totalPages: number
}

export interface MonitoringStatesProps {
  [Status.completed]: number
  [Status.in_progress]: number
}

export type FetchTaskIdDataProps = string
