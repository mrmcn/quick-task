import { PAGES } from '@/lib/constants/routes'
import { userRepository } from '@/lib/repositories/prisma/user/user'
import { getSessionData } from '@/lib/utils/helpers/get-session-data/session'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z, ZodSchema } from 'zod'

/**
 * @function action
 * @description An asynchronous action function that updates user data in the data repository.
 * It is designed for use with `withFormHandling` Server Actions.
 *
 * @template T - The type of the Zod schema from which validated update data is inferred.
 * @param  validatedData - An object containing the validated data to update the user.
 * This is expected to be the fields to update in the Prisma `User` model.
 * @returns  - A Promise that resolves upon successful user update.
 * @throws  - May throw an error if the user update fails
 * (e.g., database issue, user not found).
 */
const action = async <T extends ZodSchema>(validatedData: z.infer<T>) => {
  const { id } = await getSessionData()
  await userRepository.updateUser({ id }, validatedData)
}

/**
 * @function updateAndRedirect
 * @description An asynchronous function responsible for revalidating the cache and redirecting
 * to the user page after a successful Server Action execution.
 *
 * @returns - This function does not return a value,
 * as `redirect` terminates the request execution.
 */
const updateAndRedirect = async () => {
  revalidatePath(PAGES.USER)
  redirect(PAGES.USER)
}

/**
 * @const updateUserFunction
 * @description An object grouping the shared `action` and `updateAndRedirect` functions
 * for use in Server Actions related to updating user data (e.g., name, email).
 * This promotes code reuse and consistent behavior across different user updates.
 */
export const updateUserFunction = {
  action,
  updateAndRedirect,
}
