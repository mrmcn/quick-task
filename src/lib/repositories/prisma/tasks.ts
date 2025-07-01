import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import prisma from '@/lib/db/prisma'
import { TASK_DATA_SELECT } from '@/lib/db/selects'
import {
  GetMonitoringStates,
  GetUserTasksParams,
  GetUserTasksWithCount,
  ITaskRepository,
  VoidPromise,
} from '@/lib/repositories/interfaces/tasks'
import { Prisma, User } from '@prisma/client'

const INSENSITIVE_CONTAINS = (query: string) =>
  ({
    contains: query,
    mode: 'insensitive',
  } as const)

const getUserTasksWithCount = async (
  params: GetUserTasksParams,
): GetUserTasksWithCount => {
  const { initialWhere, orderBy, query, skip, take } = params
  const where: Prisma.TaskWhereInput = { ...initialWhere }

  if (query !== '') {
    where.OR = [
      ...(where.OR || []),
      { [TextFieldsNameAttributeList.title]: INSENSITIVE_CONTAINS(query) },
      { [TextFieldsNameAttributeList.details]: INSENSITIVE_CONTAINS(query) },
    ]
  }

  const tasksQuery = prisma.task.findMany({
    where,
    select: TASK_DATA_SELECT,
    orderBy,
    skip,
    take,
  })
  const countQuery = prisma.task.count({
    where,
  })
  const [tasks, count] = await prisma.$transaction([tasksQuery, countQuery])

  return { tasks, count }
}

const getGroupByStatus = async (id: User['id']): GetMonitoringStates => {
  const groupInProgress = await prisma.task.groupBy({
    by: ['status'],
    where: { author: { id } },
    _count: { status: true },
  })

  return groupInProgress
}

const createTask = async (
  id: User['id'],
  taskData: Pick<Prisma.TaskCreateInput, 'title' | 'details'>,
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
  getGroupByStatus,
  createTask,
  updateTask,
  deleteTask,
  // ... other methods can be added here
}
