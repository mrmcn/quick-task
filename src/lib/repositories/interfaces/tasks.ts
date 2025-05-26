import { TaskData } from '@/lib/services/queries/task'
import { $Enums, Prisma, User } from '@prisma/client'

export interface GetUserTasksParams {
  userId: User['id']
  offset: number
  tasksPerPage: number
  orderBy: Prisma.TaskOrderByWithRelationInput
  query: string
  status?: $Enums.Status
  priority?: $Enums.Priority
}

// This interface defines the methods for interacting with tasks in the repository
export interface ITaskRepository {
  getUserTasksWithCount: (params: GetUserTasksParams) => GetUserTasksWithCount
  // ... other methods can be added here
}

export type GetUserTasksWithCount = Promise<{
  tasks: TaskData[]
  count: number
}>
