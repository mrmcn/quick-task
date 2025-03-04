import { auth } from '@/auth'
import { TasksListProps } from '@/ui/dashboard/tasks-list/tasks-list'
import prisma from './prisma'

// await new Promise((resolve) => setTimeout(resolve, 3000));

export async function fetchTasksData() {
  const session = await auth()
  if (!session) return getTasksDATA() // sampleTasksList

  const authorId = session?.user.id // or userTasksList
  try {
    const tasks = await prisma.task.findMany({
      where: { authorId: authorId },
      select: {
        id: true,
        summary: true,
        details: true,
        priority: true,
        status: true,
      },
    })

    return tasks
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}

export async function fetchTaskIdData(id: string) {
  try {
    const task = prisma.task.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        summary: true,
        details: true,
        priority: true,
      },
    })

    return task
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}

export async function fetchMonitoringStates() {
  const session = await auth()
  if (!session) return getMonitoringDATA() // for sample monitor

  const authorId = session?.user.id // or user monitor
  try {
    const groupInProgress = await prisma.task.groupBy({
      by: ['status'],
      where: {
        authorId: authorId,
      },
      _count: { status: true },
    })

    let completed = 0
    let pending = 0

    for (const i of groupInProgress) {
      if (i.status != 'in_progress') {
        completed = i._count.status
      } else {
        pending = i._count.status
      }
    }

    const progress =
      completed + pending === 0
        ? 0
        : Math.round((completed * 100) / (completed + pending))

    return { completed, pending, progress }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}

export default async function fetchUserData() {
  const session = await auth()
  const userId = session?.user.id

  try {
    const userData = prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    })

    return userData
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}

const getTasksDATA = (): TasksListProps[] => [
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
]

const getMonitoringDATA = () => ({ completed: 1, pending: 2, progress: 33 }) // for 'app/page'
