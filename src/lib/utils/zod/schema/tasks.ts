import { z } from 'zod'

/**
 * The main Zod schema for a "task" object.
 * Defines the complete set of fields and their validation rules.
 */
const task = z.object({
  // Unique identifier for the task.
  id: z.string(),
  // The title of the task. This is a required field.
  title: z.string({ message: '"This field is required."' }),
  // Detailed description of the task. This is a required field.
  details: z.string({ message: '"This field is required."' }),
  // The creation date of the task.
  date: z.date(),
  // The priority of the task. Allowed values are 'high' or 'low'.
  priority: z.enum(['high', 'low']),
  // The completion status of the task. Allowed values are 'completed' or 'in_progress'.
  status: z.enum(['completed', 'in_progress']),
  // The ID of the user who authored the task.
  authorId: z.string(),
})

/**
 * Validation schema for updating a task's priority.
 * Includes only the task's `id` and its `priority`.
 */
const updatePriority = task.pick({
  id: true,
  priority: true,
})

/**
 * Validation schema for updating a task's status.
 * Includes only the task's `id` and its `status`.
 */
const updateStatus = task.pick({
  id: true,
  status: true,
})

/**
 * Validation schema for updating a task's title.
 * Includes only the task's `id` and its `title`.
 */
const updateTitle = task.pick({
  id: true,
  title: true,
})

/**
 * Validation schema for updating a task's details.
 * Includes only the task's `id` and its `details`.
 */
const updateDetails = task.pick({
  id: true,
  details: true,
})

/**
 * Validation schema for creating a new task.
 * Includes only `title` and `details`, as other fields (like `id`, `date`, `status`, `priority`, `authorId`)
 * are typically generated or set by default on the server.
 */
const create = task.pick({
  title: true,
  details: true,
})

/**
 * An object that exports all defined Zod schemas related to tasks.
 * Provides centralized access to validation schemas for various task operations.
 */
export const tasksSchemes: TasksSchemes = {
  create,
  updatePriority,
  updateStatus,
  updateTitle,
  updateDetails,
  form: task, // `task` is aliased as `form` here for clarity, indicating it's the complete form schema.
}

/**
 * Interface defining the structure of the `tasksSchemes` object.
 * Ensures type safety and provides autocompletion for available task schemas.
 */
interface TasksSchemes {
  updatePriority: typeof updatePriority
  updateStatus: typeof updateStatus
  updateTitle: typeof updateTitle
  updateDetails: typeof updateDetails
  create: typeof create
  form: typeof task // Corresponds to the alias above.
}
