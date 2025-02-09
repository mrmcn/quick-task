import prisma from './prisma'

export async function fetchTasksData(authorId: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: { authorId: authorId },
      select: { id: true, summary: true, details: true, priority: true },
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
      select: { summary: true, details: true, priority: true, status: true },
    })

    return task
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}

export async function fetchStatusMonitoringData(authorId: string) {
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

    const progress = Math.round((completed * 100) / (completed + pending))

    return { completed, pending, progress }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}
