import { TaskListDto } from '@/lib/repositories/prisma/tasks'
import { $Enums, Prisma, User } from '@prisma/client'

export interface GetUserTasksParams {
  id: User['id']
  offset: number
  tasksPerPage: User['tasksPerPage']
  orderBy: Prisma.TaskOrderByWithRelationInput
  query: string
  status?: $Enums.Status
  priority?: $Enums.Priority
}

// This interface defines the methods for interacting with tasks in the repository
export interface ITaskRepository {
  getUserTasksWithCount: (params: GetUserTasksParams) => GetUserTasksWithCount
  getMonitoringStates: (id: User['id']) => GetMonitoringStates
  createTask: (
    id: User['id'],
    taskData: Omit<Prisma.TaskCreateInput, 'author'>,
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
