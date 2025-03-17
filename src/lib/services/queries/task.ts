import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { calculateMonitoringStates } from '@/lib/utils/calculator-monitoring-states'
import { handleError, HandleErrorProps } from '@/lib/utils/error-handling'
import { Task } from '@prisma/client'

export async function fetchTasksData(): FetchTaskData<TasksData> {
  const session = await auth()

  if (!session) return { data: getTasksDATA() } // for sampleTasksList
  const authorId = session?.user.id // or userTasksList
  try {
    const data = await prisma.task.findMany({
      where: { authorId: authorId },
      select: {
        id: true,
        summary: true,
        details: true,
        priority: true,
        status: true,
      },
    })

    return { data }
  } catch (error) {
    return { error: handleError(error) }
  }
}

export async function fetchTaskIdData(
  id: FetchTaskIdDataProps,
): FetchTaskData<TaskIdData> {
  try {
    const data = await prisma.task.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        summary: true,
        details: true,
        priority: true,
      },
    })

    return { data }
  } catch (error) {
    return { error: handleError(error) }
  }
}

export async function fetchMonitoringStates(): FetchTaskData<MonitoringStatesProps> {
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

export type FetchTaskData<T> = Promise<
  { data: T; error?: undefined } | { error: HandleErrorProps; data?: undefined }
>

export type TaskData = Omit<Task, 'date' | 'authorId'>

export type TasksData = TaskData[]

export type TaskIdData = Pick<Task, 'id' | 'summary' | 'details' | 'priority'>

export interface MonitoringStatesProps {
  completed: number | undefined
  pending: number | undefined
  progress: number | undefined
}

export type FetchTaskIdDataProps = string

const getTasksDATA = (): TasksData => [
  {
    id: '1',
    summary: 'Sample 1',
    details: 'Details task 1',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '2',
    summary: 'Sample 2',
    details: 'Details task 2',
    priority: 'high',
    status: 'completed',
  },
  {
    id: '3',
    summary: 'Sample 3',
    details: 'Details task 3',
    priority: 'high',
    status: 'in_progress',
  },
] // for 'app/page'

const getMonitoringDATA = () => ({ completed: 1, pending: 2, progress: 33 }) // for 'app/page'
