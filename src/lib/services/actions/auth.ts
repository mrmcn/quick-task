'use server'

import { signIn, signOut } from '@/auth'
import { ActionHandler, ActionResult } from '@/lib/services/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/type'

/**
 * This file contains Server Actions responsible for user authentication.
 */

/**
 * The asynchronous `authenticate` action for user sign-in.
 * It uses `signIn` from NextAuth.js with the 'credentials' provider.
 *
 * Upon successful authentication, `signIn` redirects the user or establishes a session.
 * In case of an error, it catches the exception and returns a standardized error
 * object using `handleError`.
 *
 * @param state The previous state passed by `useActionState`. While not directly used for authentication logic
 * within this action, it's a required part of the function signature expected by `useActionState` to manage
 * the form's state lifecycle.
 * @param formData A `FormData` object containing the user's credentials (e.g., email and password) from the form.
 * @returns  An object containing the action's result:
 * - `{ status: 'error', error: ... }` if authentication fails.
 * - On success, this function does not explicitly return a value, as `signIn`
 * handles redirection or session creation.
 */
export const authenticate: ActionHandler<ActionResult> = async (
  state,
  formData,
) => {
  try {
    // Calls the NextAuth.js signIn function with the 'credentials' provider.
    // The credential validation logic (e.g., database lookup, password comparison)
    // is defined in the 'authorize' callback within auth.config.ts (or auth.ts).
    await signIn('credentials', formData)
  } catch (error) {
    // Catches errors that occur during authentication.
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }
}

/**
 * The asynchronous `signout` function for logging out a user.
 * This is a **Server Action** that leverages NextAuth.js's `signOut` functionality
 * to clear the user's session.
 *
 * After a successful logout, the user will be redirected to the specified URL.
 *
 * @param url The path to which the user will be redirected after a successful logout.
 */
export async function signout(url: string) {
  // Calls the NextAuth.js signOut function.
  // The `redirectTo` option ensures the user is redirected to the provided URL
  // after the logout operation completes on the server.
  await signOut({ redirectTo: url })
}
