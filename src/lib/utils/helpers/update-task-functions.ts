import { PAGES } from '@/lib/constants/routes'
import { taskRepository } from '@/lib/repositories/prisma/tasks'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z, ZodSchema } from 'zod'

/**
 * @function action
 * @description An asynchronous action function that updates a task in the data repository.
 * It is designed for use with `withFormHandling` Server Actions.
 *
 * @template T - The type of the Zod schema from which validated data is inferred.
 * @param {z.infer<T>} validatedData - An object containing the validated data to update the task.
 * It is expected to contain the task's `id` and the fields to be updated.
 * @returns {Promise<void>} - A Promise that resolves upon successful task update.
 * @throws {Error} - May throw an error if the task update fails
 * (e.g., database issue, task not found).
 */
const action = async <T extends ZodSchema>(validatedData: z.infer<T>) => {
  // Destructure the task's `id` and the rest of the data to be updated.
  const { id, ...dataToUpdate } = validatedData
  // Call the repository to update the task.
  await taskRepository.updateTask({ id }, dataToUpdate)
}

/**
 * @function updateAndRedirect
 * @description An asynchronous function responsible for revalidating the cache and redirecting
 * after a successful Server Action execution.
 * It retrieves a search parameters string from FormData and redirects to the
 * dashboard page, preserving those parameters, or simply revalidates the dashboard if no parameters are present.
 *
 * @param  formData - The FormData object, which may contain a 'searchParams' field
 * to preserve URL state after redirection.
 * @returns  - This function does not return a value,
 * as `redirect` terminates the request execution.
 */
const updateAndRedirect = async (formData: FormData) => {
  // Retrieve the search parameters string from FormData.
  const searchParamsString = formData.get('searchParams')

  // If a search parameters string exists, revalidate the dashboard and redirect
  // to the dashboard with the preserved search parameters.
  if (searchParamsString) {
    revalidatePath(PAGES.DASHBOARD)
    redirect(`${PAGES.DASHBOARD}${searchParamsString}`)
  } else {
    // If no search parameters are present, simply revalidate the dashboard.
    revalidatePath(PAGES.DASHBOARD)
  }
}

/**
 * @const updateTaskFunctions
 * @description An object grouping the shared `action` and `updateAndRedirect` functions
 * for use in Server Actions related to task updates.
 * This promotes code reuse and consistent behavior across different task updates.
 */
export const updateTaskFunctions = {
  action, // Function to execute the task update logic
  updateAndRedirect, // Function for revalidation and redirection after update
}
