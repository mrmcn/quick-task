import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { handleError, HandleErrorProps } from '@/lib/utils/error-handling'
import {
  getSearchParams,
  SearchParamsProps,
} from '@/lib/utils/get-search-params'
import { calculateMonitoringStates } from '@/lib/utils/services/calculator-monitoring-states'
import { getOrderBy } from '@/lib/utils/services/get-order-by'
import { Task } from '@prisma/client'

const tasksPage = 3

export async function fetchUserTasksData(
  searchParams?: SearchParamsProps,
  tasksPerPage: number = tasksPage,
): FetchData<UserTasks> {
  const session = await auth()

  if (!session) return { data: getTasksDATA() } // for sampleTasksList
  const authorId = session?.user.id // or userTasksList

  const { query, currentPage, sort, filter } = getSearchParams(searchParams)
  const offset = (currentPage - 1) * tasksPerPage
  const orderBy = getOrderBy(sort)

  try {
    const data = await prisma.task.findMany({
      skip: offset,
      take: tasksPerPage,
      where: {
        authorId: authorId,
        status: filter,
        OR: [{ title: { contains: query } }, { details: { contains: query } }],
      },
      select: {
        id: true,
        title: true,
        details: true,
        priority: true,
        status: true,
      },
      orderBy: orderBy,
    })

    return { data }
  } catch (error) {
    return { error: handleError(error) }
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
    return { error: handleError(error) }
  }
}

export async function fetchMonitoringStates(): FetchData<MonitoringStatesProps> {
  const session = await auth()

  if (!session) return { data: getMonitoringDATA() } // for sample monitor
  const authorId = session?.user.id // or user monitor
  try {
    const groupInProgress = await prisma.task.groupBy({
      by: ['status'],
      where: {
        authorId: authorId,
      },
      _count: { status: true },
    })
    const data = calculateMonitoringStates(groupInProgress)

    return { data }
  } catch (error) {
    return { error: handleError(error) }
  }
}

export async function fetchCountNumberPagesTasks(
  query: string,
  tasksPerPage: number = tasksPage,
) {
  const session = await auth()

  if (!session) return { data: 3 } // for sampleTasksList
  const authorId = session?.user.id // or userTasksList
  try {
    const count = await prisma.task.count({
      where: {
        authorId: authorId,
        OR: [{ title: { contains: query } }, { details: { contains: query } }],
      },
    })
    const numberOfPages = Math.ceil(count / tasksPerPage)

    return { data: numberOfPages }
  } catch (error) {
    return { error: handleError(error) }
  }
}

export type FetchData<T> = Promise<
  { data: T; error?: undefined } | { error: HandleErrorProps; data?: undefined }
>

export type TaskData = Omit<Task, 'date' | 'authorId'>

export type UserTasks = TaskData[]

export type TaskId = Omit<TaskData, 'status'>

export interface MonitoringStatesProps {
  completed: number | undefined
  pending: number | undefined
  progress: number | undefined
}

export type FetchTaskIdDataProps = string

const getTasksDATA = (): UserTasks => [
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

const getMonitoringDATA = () => ({ completed: 1, pending: 2, progress: 33 }) // for 'app/page'
