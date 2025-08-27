'use server'

import { signOut } from '@/auth'
import { PAGES } from '@/lib/constants/routes'
import { userRepository } from '@/lib/repositories/prisma/user/user'
import { ActionHandler, ActionResult } from '@/lib/services/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/types'
import { getSessionData } from '@/lib/utils/helpers/get-session-data/session' // This function redirects to '/signin' if there's no session
import { prepareHashedPassword } from '@/lib/utils/helpers/prepare-hashed-password'
import { updateUserFunction } from '@/lib/utils/helpers/update-user-function'
import withFormHandling from '@/lib/utils/helpers/with-form-handling/wrapper'
import { userSchemes } from '@/lib/utils/zod/schema/user'
import { validateData } from '@/lib/utils/zod/validate'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * This file contains Server Actions that perform CRUD (Create, Read, Update, Delete)
 * operations on users, and also manage sessions (e.g., deleting a user leads to sign out).
 *
 * **Most actions utilizing `withFormHandling` (e.g., `createUser`, `updateUserName`, etc.)
 * are specifically designed for integration with React's `useActionState` hook (for form state management).**
 *
 * `withFormHandling` standardizes these actions by providing:
 * - Input validation using Zod schemas.
 * - Centralized error handling.
 * - Path revalidation for updating the Next.js cache.
 * - User redirection upon successful action completion.
 *
 * The `updateTasksPerPageNumber` and `deleteUser` actions are separate Server Actions that
 * **DO NOT use `withFormHandling`**.
 *
 * These actions ensure secure and type-safe interaction with the database
 * directly from client components.
 */

/**
 * Server Action for registering a new user.
 * It uses `withFormHandling` to validate `email` and `password` against the `userSchemes.emailAndPasswordInput` schema.
 *
 * `action`:
 * - Hashes the provided password using `bcrypt`.
 * - Creates a new user in the repository with the hashed password.
 *
 * `updateAndRedirect`:
 * - Redirects the user to the sign-in page (`PAGES.SIGNIN`) after successful registration.
 * This action does NOT revalidate the cache, as the redirection goes to a sign-in page.
 */
export const createUser: ActionHandler<ActionResult> = withFormHandling({
  schema: userSchemes.emailAndPasswordInput,
  action: async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    await userRepository.createUser({ email, password: hashedPassword })
  },
  updateAndRedirect: async () => {
    redirect(PAGES.SIGNIN)
  },
})

/**
 * Server Action for updating a user's name.
 * It uses `withFormHandling` with the `userSchemes.name` schema
 * and reuses the general user update functions from `updateUserFunction`.
 */
export const updateUserName: ActionHandler<ActionResult> = withFormHandling({
  schema: userSchemes.name,
  ...updateUserFunction,
})

/**
 * Server Action for updating a user's email address.
 * It uses `withFormHandling` with the `userSchemes.email` schema
 * and reuses the general user update functions from `updateUserFunction`.
 */
export const updateUserEmail: ActionHandler<ActionResult> = withFormHandling({
  schema: userSchemes.email,
  ...updateUserFunction,
})

/**
 * Server Action for changing a user's password.
 * It uses `withFormHandling` with the `userSchemes.changePassword` schema.
 *
 * `action`:
 * - Retrieves `userId` from the session.
 * - Verifies the current password and hashes the new password using `prepareHashedPassword`.
 * - Updates the user's password in the repository.
 * - Returns `{ status: 'showModal' }` to trigger a success modal display in the UI.
 *
 * `updateAndRedirect`:
 * - Set as `undefined` because the action returns a status for the UI, rather than redirecting.
 */
export const updateUserPassword: ActionHandler<ActionResult> = withFormHandling(
  {
    schema: userSchemes.changePassword,
    action: async (validatedData) => {
      const { userId: id } = await getSessionData()
      const password = await prepareHashedPassword(validatedData, id)
      await userRepository.updateUser({ id }, { password })

      return { status: 'showModal' }
    },
    updateAndRedirect: undefined,
  },
)

/**
 * Server Action for updating the number of tasks displayed per page for a user.
 * This action **DOES NOT use `withFormHandling`**.
 *
 * - **Validation**: The input `perPageNumber` is validated using `userSchemes.perPageNumber`.
 * - **Authentication**: Retrieves `userId` from the session.
 * - **Update**: Updates the user's `tasksPerPage` field in the repository.
 * - **Error Handling**: Returns `{ status: 'error' }` if validation or update errors occur.
 * - **Revalidation**: Revalidates the user page path to update the cache.
 *
 * @param  perPageNumber The value for the number of tasks per page as a string (will be validated as a number).
 * @returns  An action result object indicating success or error.
 */
export const updateTasksPerPageNumber = async (
  perPageNumber: string,
): Promise<ActionResult> => {
  try {
    const validationResult = validateData(
      { perPageNumber },
      userSchemes.perPageNumber,
    )
    const { userId: id } = await getSessionData()
    await userRepository.updateUser(
      { id },
      { tasksPerPage: validationResult.perPageNumber },
    )
  } catch (error) {
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }
  revalidatePath(PAGES.USER)
}

/**
 * Server Action for deleting the current user.
 * This action **DOES NOT use `withFormHandling`**.
 *
 * - **Authentication**: Retrieves `userId` from the session.
 * - **Deletion**: Deletes the user from the repository.
 * - **Error Handling**: Returns `{ status: 'error' }` if errors occur during deletion.
 * - **Sign Out & Redirection**: After successful user deletion, it forces a sign out
 * and redirects the user to the home page (`PAGES.HOME`).
 *
 * @returns  An action result object indicating success or error.
 */
export const deleteUser = async (): Promise<ActionResult> => {
  const { userId: id } = await getSessionData()
  try {
    await userRepository.deleteUser({ id })
  } catch (error) {
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }

  // After successful user deletion, sign out and redirect to the home page.
  await signOut({ redirectTo: PAGES.HOME })
}
