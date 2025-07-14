import { Prisma } from '@prisma/client'

/**
 * Constant for selecting user fields primarily used for displaying general user information.
 * It includes only `name` and `email` for a minimal dataset required for lists or profiles
 * without sensitive data.
 * `as const satisfies Prisma.UserSelect` ensures the object is read-only and strictly conforms
 * to the `Prisma.UserSelect` type, providing full type safety and autocompletion.
 */
export const USER_DATA_SELECT = {
  name: true,
  email: true,
} as const satisfies Prisma.UserSelect

/**
 * Constant for selecting user fields necessary for authentication purposes.
 * It includes `id`, `email`, and `password`. The password is required for hash comparison during login.
 * `as const satisfies Prisma.UserSelect` ensures type safety for this selection.
 */
export const AUTH_DATA_SELECT = {
  id: true,
  email: true,
  password: true,
} as const satisfies Prisma.UserSelect

/**
 * Constant for selecting task fields used for displaying lists of tasks.
 * It includes `id`, `title`, `details`, `priority`, and `status`.
 * This selection is optimized to retrieve essential task information without unnecessary data.
 * `as const satisfies Prisma.TaskSelect` ensures type safety for this selection.
 */
export const TASK_DATA_SELECT = {
  id: true,
  title: true,
  details: true,
  priority: true,
  status: true,
} as const satisfies Prisma.TaskSelect

/**
 * DTO (Data Transfer Object) type for a task list item.
 * Defines the type structure of task objects returned from the database
 * when using `TASK_DATA_SELECT`.
 * This ensures that only the selected fields are present in the task object.
 */
export type TaskListDto = Prisma.TaskGetPayload<{
  select: typeof TASK_DATA_SELECT
}>

/**
 * DTO (Data Transfer Object) type for a user list item.
 * Defines the type structure of user objects returned from the database
 * when using `USER_DATA_SELECT`.
 * This ensures that only the selected fields are present in the user object.
 */
export type UserListDto = Prisma.UserGetPayload<{
  select: typeof USER_DATA_SELECT
}>
