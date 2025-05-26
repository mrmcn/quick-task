import prisma from '@/lib/prisma'
import {
  GetUserTasksParams,
  GetUserTasksWithCount,
  ITaskRepository,
} from '@/lib/repositories/interfaces/tasks'
import { Prisma } from '@prisma/client'

const getUserTasksWithCount = async (
  params: GetUserTasksParams,
): GetUserTasksWithCount => {
  const { userId, offset, tasksPerPage, orderBy, query, status, priority } =
    params

  const whereClause: Prisma.TaskWhereInput = {
    authorId: userId,
    status: status,
    priority: priority,
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { details: { contains: query, mode: 'insensitive' } },
    ],
  }

  const [tasks, count] = await prisma.$transaction([
    prisma.task.findMany({
      skip: offset,
      take: tasksPerPage,
      where: whereClause,
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
      where: whereClause,
    }),
  ])

  return { tasks, count }
}

export const taskRepository: ITaskRepository = {
  getUserTasksWithCount,
  // ... other methods can be added here
}
