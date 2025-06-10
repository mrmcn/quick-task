import prisma from '@/lib/prisma'
import {
  GetMonitoringStates,
  GetUserTasksParams,
  GetUserTasksWithCount,
  ITaskRepository,
  VoidPromise,
} from '@/lib/repositories/interfaces/tasks'
import { Prisma, User } from '@prisma/client'

const getUserTasksWithCount = async (
  params: GetUserTasksParams,
): GetUserTasksWithCount => {
  const { id, offset, tasksPerPage, orderBy, query, status, priority } = params
  const whereClause: Prisma.TaskWhereInput = {
    author: { id },
    status,
    priority,
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { details: { contains: query, mode: 'insensitive' } },
    ],
  }
  const tasksQuery = prisma.task.findMany({
    skip: offset,
    take: tasksPerPage,
    where: whereClause,
    select: TASK_DATA_SELECT,
    orderBy: orderBy,
  })
  const countQuery = prisma.task.count({
    where: whereClause,
  })
  const [tasks, count] = await prisma.$transaction([tasksQuery, countQuery])

  return { tasks, count }
}

const getMonitoringStates = async (id: User['id']): GetMonitoringStates => {
  const groupInProgress = await prisma.task.groupBy({
    by: ['status'],
    where: { author: { id } },
    _count: { status: true },
  })

  return groupInProgress
}

const createTask = async (
  id: User['id'],
  taskData: Omit<Prisma.TaskCreateInput, 'author'>,
): VoidPromise => {
  const data = { ...taskData, author: { connect: { id } } }
  await prisma.task.create({ data })
}

const updateTask = async (
  where: Prisma.TaskWhereUniqueInput,
  data: Prisma.TaskUpdateInput,
): VoidPromise => {
  await prisma.task.update({
    where,
    data,
  })
}

const deleteTask = async (where: Prisma.TaskWhereUniqueInput): VoidPromise => {
  await prisma.task.delete({
    where,
  })
}

export const taskRepository: ITaskRepository = {
  getUserTasksWithCount,
  getMonitoringStates,
  createTask,
  updateTask,
  deleteTask,
  // ... other methods can be added here
}

export const TASK_DATA_SELECT = {
  id: true,
  title: true,
  details: true,
  priority: true,
  status: true,
} as const satisfies Prisma.TaskSelect

export type TaskListDto = Prisma.TaskGetPayload<{
  select: typeof TASK_DATA_SELECT
}>
