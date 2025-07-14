import { TaskListDto } from '@/lib/db/selects'
import { Prisma, User } from '@prisma/client'

/**
 * This file contains the interface and type definitions for the task repository (`ITaskRepository`).
 */

/**
 * The `GetUserTasksParams` interface defines the structure of parameters
 * required for retrieving a list of user tasks with pagination,
 * filtering, and sorting.
 */
export interface GetUserTasksParams {
  /**
   * Initial Prisma task filtering conditions (`WHERE` clause)
   * that can be extended within the repository logic.
   */
  initialWhere: Prisma.TaskWhereInput
  /**
   * The number of records to skip (for pagination).
   */
  skip: number
  /**
   * Prisma task sorting conditions (`ORDER BY` clause).
   */
  orderBy: Prisma.TaskOrderByWithRelationInput
  /**
   * The maximum number of records to take (for pagination).
   */
  take: number
  /**
   * The search query string used for filtering tasks
   * by title or details (if applicable).
   */
  query: string
}

/**
 * The `ITaskRepository` interface defines the contract for the task repository.
 * It outlines all primary operations that can be performed on tasks
 * within the system, ensuring a clear separation of concerns.
 */
export interface ITaskRepository {
  /**
   * Method for retrieving a list of user tasks along with the total count
   * of tasks that match the criteria.
   * @param params Parameters for filtering, sorting, and pagination.
   * @returns A Promise that returns an array of tasks and their total count.
   */
  getUserTasksWithCount: (params: GetUserTasksParams) => GetUserTasksWithCount
  /**
   * Method for grouping tasks by status and counting the number of tasks
   * in each group for a specific user.
   * @param id The user's ID.
   * @returns A Promise that returns task statistics by status.
   */
  getGroupByStatus: (id: User['id']) => GetMonitoringStates
  /**
   * Method for creating a new task for a user.
   * @param id The ID of the user who is the task's author.
   * @param taskData An object containing the title and details of the new task.
   * @returns A Promise that resolves with no value on success.
   */
  createTask: (
    id: User['id'],
    taskData: Pick<Prisma.TaskCreateInput, 'title' | 'details'>,
  ) => VoidPromise
  /**
   * Method for updating an existing task.
   * @param where Unique criteria to find the task.
   * @param data Data to update the task.
   * @returns A Promise that resolves with no value on success.
   */
  updateTask: (
    where: Prisma.TaskWhereUniqueInput,
    data: Prisma.TaskUpdateInput,
  ) => VoidPromise
  /**
   * Method for deleting a task.
   * @param where Unique criteria to find the task.
   * @returns A Promise that resolves with no value on success.
   */
  deleteTask: (where: Prisma.TaskWhereUniqueInput) => VoidPromise
  // ... other methods can be added here, adhering to the ITaskRepository contract
}

/**
 * Type representing a Promise that returns an object containing an array of tasks
 * (formatted as `TaskListDto`) and their total count.
 * Used for the `getUserTasksWithCount` method.
 */
export type GetUserTasksWithCount = Promise<{
  tasks: TaskListDto[]
  count: number
}>

/**
 * Type representing a Promise that returns task statistics,
 * grouped by status.
 * Used for the `getGroupByStatus` method.
 */
export type GetMonitoringStates = Promise<GroupInProgressProps>

/**
 * A generic type for a Promise that returns no value upon successful resolution.
 * Used for operations that are not expected to return data (e.g., create, update, delete).
 */
export type VoidPromise = Promise<void>

/**
 * Type representing the data structure for task grouping results by status.
 * It includes the task status and the count of tasks for that status.
 */
export type GroupInProgressProps = (Prisma.PickEnumerable<
  Prisma.TaskGroupByOutputType,
  'status'[]
> & {
  _count: {
    status: number
  }
})[]
