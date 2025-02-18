import { auth } from '@/auth'
import { MonitoringScreenProps } from '@/ui/common/monitoring-states/monitor'
import prisma from './prisma'

// await new Promise((resolve) => setTimeout(resolve, 3000));

export async function fetchTasksData() {
  const session = await auth()
  const authorId = session?.user.id
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
  const authorId = session?.user.id
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
    const monitoringStates: MonitoringScreenProps = [
      { name: 'Completed tasks', value: completed },
      { name: 'Pending tasks', value: pending },
      { name: 'Progress, %', value: progress },
    ]

    return monitoringStates
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}

export async function fetchUserName() {
  const session = await auth()
  const userId = session?.user.id
  try {
    const userName = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        name: true,
      },
    })

    return userName
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}
