import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import {
  HandleError,
  handleError,
  HandleErrorProps,
} from '@/lib/utils/error-handling'
import {
  getSearchParams,
  SearchParamsObject,
} from '@/lib/utils/get-search-params'
import { getOrderBy } from '@/lib/utils/services-helper/get-order-by'
import { getTaskStatusCountsFromPrismaSchema } from '@/lib/utils/services-helper/task-status-counts'
import { Status, Task } from '@prisma/client'

const tasksPage = 3

export async function fetchUserTasksData(
  searchParamsObject?: SearchParamsObject,
  tasksPerPage: number = tasksPage,
): FetchData<UserTasksResult> {
  const session = await auth()

  if (!session) {
    const sampleData = getTasksDATA()
    return { data: { tasks: sampleData, totalPages: 1 } } // for sampleTasksList
  }
  const authorId = session?.user.id // or userTasksList

  const { query, currentPage, sort, status, priority } =
    getSearchParams(searchParamsObject)
  const offset = (currentPage - 1) * tasksPerPage
  const orderBy = getOrderBy(sort)

  try {
    const [tasks, count] = await prisma.$transaction([
      prisma.task.findMany({
        skip: offset,
        take: tasksPerPage,
        where: {
          authorId: authorId,
          status: status,
          priority: priority,
          OR: [
            { title: { contains: query } },
            { details: { contains: query } },
          ],
        },
        select: {
          id: true,
          title: true,
          details: true,
          priority: true,
          status: true,
        },
        orderBy: orderBy,
      }),
      prisma.task.count({
        where: {
          authorId: authorId,
          status: status,
          priority: priority,
          OR: [
            { title: { contains: query } },
            { details: { contains: query } },
          ],
        },
      }),
    ])

    const totalPages = Math.ceil(count / tasksPerPage)

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

const getTasksDATA = (): TaskData[] => [
  {
    id: '1',
    title: 'Sample 1',
    details: 'Details task',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Sample 2',
    details: 'Details task 2',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Sample 3',
    details: 'Details task 3',
    priority: 'high',
    status: 'in_progress',
  },
] // for 'app/page'
