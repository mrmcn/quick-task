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

/**
 * This `task.ts` module implements `ITaskRepository`, providing methods
 * for interacting with the `Task` table in the database using Prisma.
 *
 * It encapsulates task data access logic, separating it from business logic
 * and UI components, ensuring a clean and maintainable approach to
 * managing task data.
 */

/**
 * Retrieves a list of user tasks along with the total count of tasks
 * matching the filtering criteria.
 * It uses a Prisma Transaction to simultaneously execute queries for fetching
 * tasks and counting them, ensuring atomicity and efficiency.
 *
 * @param params The `GetUserTasksParams` object, containing filtering (`where`),
 * sorting (`orderBy`), and pagination parameters (`skip`, `take`).
 * @returns A Promise that resolves with an object containing
 * an array of tasks (`tasks`) and their total count (`count`).
 */
const getUserTasksWithCount = async (
  params: GetUserTasksParams,
): GetUserTasksWithCount => {
  const { where, orderBy, skip, take } = params
  // Query to fetch tasks
  const tasksQuery = prisma.task.findMany({
    where,
    select: TASK_DATA_SELECT, // Select specific fields
    orderBy,
    skip,
    take,
  })
  // Query to count the total number of tasks
  const countQuery = prisma.task.count({
    where,
  })
  // Execute both queries in a single transaction
  const [tasks, count] = await prisma.$transaction([tasksQuery, countQuery])

  return { tasks, count }
}

/**
 * Groups tasks by their status for a specific user and counts
 * the number of tasks in each group. Used for displaying
 * monitoring states or statistics (e.g., "Completed (5)", "In Progress (3)").
 *
 * @param id The ID of the user for whom to retrieve statistics.
 * @returns  A Promise that resolves with an array of objects,
 * containing the status and the count of tasks for that status.
 */
const getGroupByStatus = async (id: User['id']): GetMonitoringStates => {
  const groupInProgress = await prisma.task.groupBy({
    by: ['status'], // Group by the 'status' field
    where: { author: { id } }, // Filter by task author
    _count: { status: true }, // Count the number of tasks for each status
  })

  return groupInProgress
}

/**
 * Creates a new task for the specified user.
 *
 * @param id The ID of the user who is the author of the task.
 * @param taskData An object containing the task's title and details.
 * @returns  A Promise that resolves with no value upon successful creation.
 */
const createTask = async (
  id: User['id'],
  taskData: Pick<Prisma.TaskCreateInput, 'title' | 'details'>,
): VoidPromise => {
  // Connect the task to its author
  const data = { ...taskData, author: { connect: { id } } }
  await prisma.task.create({ data })
}

/**
 * Updates an existing task.
 *
 * @param where An object defining the unique criteria to find the task to update.
 * For example, `{ id: 'someTaskId' }`.
 * @param data An object containing the data to update the task, conforming to Prisma.TaskUpdateInput.
 * @returns  A Promise that resolves with no value upon successful update.
 */
const updateTask = async (
  where: Prisma.TaskWhereUniqueInput,
  data: Prisma.TaskUpdateInput,
): VoidPromise => {
  await prisma.task.update({
    where,
    data,
  })
}

/**
 * Deletes a task from the database.
 *
 * @param where An object defining the unique criteria to find the task to delete.
 * For example, `{ id: 'someTaskId' }`.
 * @returns  A Promise that resolves with no value upon successful deletion.
 */
const deleteTask = async (where: Prisma.TaskWhereUniqueInput): VoidPromise => {
  await prisma.task.delete({
    where,
  })
}

/**
 * The `taskRepository` object, which exports the implementation of the `ITaskRepository` interface.
 * It contains all CRUD operations and additional queries related to tasks,
 * ready for use in services or other application layers.
 */
export const taskRepository: ITaskRepository = {
  getUserTasksWithCount,
  getGroupByStatus,
  createTask,
  updateTask,
  deleteTask,
  // ... other methods can be added here
}
