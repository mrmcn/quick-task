import prisma from './prisma'

export async function fetchTasksData() {
  try {
    const tasks = await prisma.task.findMany({
      where: { authorId: '35cc0da1-fc3b-47bc-867a-f4e887485a39' },
      select: { id: true, summary: true, details: true, priority: true },
    })

    return tasks
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch display data.')
  }
}

export async function fetchTaskData(id: string) {
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

export async function fetchDisplayData() {
  try {
    const groupInProgress = await prisma.task.groupBy({
      by: ['status'],
      where: {
        authorId: '35cc0da1-fc3b-47bc-867a-f4e887485a39',
        // c15fe3f9-18c0-4c34-bb2c-c7019baec841
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
