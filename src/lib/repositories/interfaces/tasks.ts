import { TaskListDto } from '@/lib/db/selects'
import { Prisma, User } from '@prisma/client'

export interface GetUserTasksParams {
  initialWhere: Prisma.TaskWhereInput
  skip: number
  orderBy: Prisma.TaskOrderByWithRelationInput
  take: number
  query: string
}

// This interface defines the methods for interacting with tasks in the repository
export interface ITaskRepository {
  getUserTasksWithCount: (params: GetUserTasksParams) => GetUserTasksWithCount
  getGroupByStatus: (id: User['id']) => GetMonitoringStates
  createTask: (
    id: User['id'],
    taskData: Pick<Prisma.TaskCreateInput, 'title' | 'details'>,
  ) => VoidPromise
  updateTask: (
    where: Prisma.TaskWhereUniqueInput,
    data: Prisma.TaskUpdateInput,
  ) => VoidPromise
  deleteTask: (where: Prisma.TaskWhereUniqueInput) => VoidPromise
  // ... other methods can be added here
}

export type GetUserTasksWithCount = Promise<{
  tasks: TaskListDto[]
  count: number
}>

export type GetMonitoringStates = Promise<GroupInProgressProps>

export type VoidPromise = Promise<void>

export type GroupInProgressProps = (Prisma.PickEnumerable<
  Prisma.TaskGroupByOutputType,
  'status'[]
> & {
  _count: {
    status: number
  }
})[]
