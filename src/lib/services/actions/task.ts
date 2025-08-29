'use server'

import { PAGES } from '@/lib/constants/routes'
import {
  SearchParameterList,
  SortingParameterList,
} from '@/lib/constants/text-const'
import { taskRepository } from '@/lib/repositories/prisma/tasks/taskRepository'
import { ActionHandler, ActionResult } from '@/lib/services/types'
import { DeleteTaskError } from '@/lib/utils/errors/delete-task-error'
import { getSessionData } from '@/lib/utils/helpers/get-session-data/session'
import { updateTaskFunctions } from '@/lib/utils/helpers/update-task-functions'
import withFormHandling from '@/lib/utils/helpers/with-form-handling/wrapper'
import { tasksSchemes } from '@/lib/utils/zod/schema/tasks'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * This file contains Server Actions that perform CRUD (Create, Read, Update, Delete)
 * operations on tasks.
 *
 * **Actions utilizing `withFormHandling` (e.g., `createTask`, `updateTaskStatus`, etc.)
 * are specifically designed for integration with React's `useActionState` hook (for form state management).**
 *
 * `withFormHandling` standardizes these actions by providing:
 * - Input validation using Zod schemas.
 * - Centralized error handling.
 * - Path revalidation for updating the Next.js cache.
 * - User redirection upon successful action completion.
 *
 * The `deleteTask` action is a separate Server Action that **DOES NOT use `withFormHandling`**.
 *
 * These actions ensure secure and type-safe interaction with the database
 * directly from client components.
 */

/**
 * Server Action for creating a new task.
 * It uses `withFormHandling` to validate input data against the `tasksSchemes.create` schema.
 *
 * `action`:
 * - Retrieves `userId` from the session.
 * - Creates a new task in the repository using the validated data.
 *
 * `updateAndRedirect`:
 * - Revalidates the dashboard path.
 * - Redirects the user to the dashboard with tasks sorted by date descending.
 */
export const createTask: ActionHandler<ActionResult> = withFormHandling({
  schema: tasksSchemes.create,
  action: async (validatedData) => {
    const { id } = await getSessionData()
    await taskRepository.createTask(id, validatedData)
  },
  updateAndRedirect: async () => {
    revalidatePath(PAGES.DASHBOARD)
    redirect(
      `${PAGES.DASHBOARD}?${SearchParameterList.sort}=${SortingParameterList.dateDesc}`,
    )
  },
})

/**
 * Server Action for updating a task's status.
 * It uses `withFormHandling` with the corresponding validation schema and shared update functions.
 */
export const updateTaskStatus: ActionHandler<ActionResult> = withFormHandling({
  schema: tasksSchemes.updateStatus,
  ...updateTaskFunctions,
})

/**
 * Server Action for updating a task's priority.
 * It uses `withFormHandling` with the corresponding validation schema and shared update functions.
 */
export const updateTaskPriority: ActionHandler<ActionResult> = withFormHandling(
  {
    schema: tasksSchemes.updatePriority,
    ...updateTaskFunctions,
  },
)

/**
 * Server Action for updating a task's title.
 * It uses `withFormHandling` with the corresponding validation schema and shared update functions.
 */
export const updateTaskTitle: ActionHandler<ActionResult> = withFormHandling({
  schema: tasksSchemes.updateTitle,
  ...updateTaskFunctions,
})

/**
 * Server Action for updating a task's details (description).
 * It uses `withFormHandling` with the corresponding validation schema and shared update functions.
 */
export const updateTaskDetails: ActionHandler<ActionResult> = withFormHandling({
  schema: tasksSchemes.updateDetails,
  ...updateTaskFunctions,
})

/**
 * Server Action for deleting a task.
 *
 * This action handles:
 * - **Authentication**: It implicitly relies on `getSessionData()` to check user authentication.
 * **`await` is crucial here** to ensure `getSessionData()` completes its authentication check
 * and potential redirection to the sign-in page before any subsequent code in `deleteTask` is executed.
 * If `getSessionData()` successfully returns, it means the user is authenticated.
 * - **ID Type Check**: Ensures that the `id` received from `FormData` is a string; otherwise, it throws a `DeleteTaskError`.
 * - **Error Handling**: Uses a `try...catch` block to manage potential errors during the task deletion process.
 * - **Revalidation & Redirection**: After successful deletion, it revalidates the dashboard's cache
 * and redirects the user back to the dashboard, preserving any existing search parameters.
 *
 * @param formData The `FormData` object containing the task's `id` and `searchParams` for redirection.
 * @throws  If the task ID's type is invalid.
 * @throws  Any other error that occurs during the deletion operation.
 */
export const deleteTask = async (formData: FormData) => {
  await getSessionData()

  const id = formData.get('id')
  const searchParamsString = formData.get('searchParams')

  if (typeof id !== 'string') {
    console.error('Invalid task ID:', id)
    throw new DeleteTaskError('Invalid task ID')
  }

  try {
    await taskRepository.deleteTask({ id })
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }

  revalidatePath(PAGES.DASHBOARD)
  redirect(`${PAGES.DASHBOARD}${searchParamsString}`)
}
