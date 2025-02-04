import { z } from 'zod'
import prisma from './prisma'

export async function fetchTasksData() {
  try {
    const tasks = await prisma.task.findMany({
      where: { authorId: '35cc0da1-fc3b-47bc-867a-f4e887485a39' },
      select: { id: true, summary: true, details: true },
    })

    return tasks
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

const FormSchema = z.object({
  id: z.string(),
  summary: z.string(),
  details: z.string(),
  date: z.date(),
  priority: z.enum(['high', 'low']),
  status: z.enum(['completed', 'in_progress']),
  authorId: z.string(),
})

const CreateTask = FormSchema.omit({
  id: true,
  date: true,
  status: true,
})

export async function CreateNewTask(formData: FormData) {
  const { summary, details, priority, authorId } = CreateTask.parse({
    summary: formData.get('summary'),
    details: formData.get('details'),
    priority: formData.get('priority'),
    authorId: formData.get('authorId'),
  })

  await prisma.task.create({
    data: {
      summary,
      details,
      priority,
      authorId,
    },
  })
}
