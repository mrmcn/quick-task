import { auth } from '@/auth'
import { AuthData } from '@/lib/utils/types'
import { redirect } from 'next/navigation'

/**
 * @description An asynchronous function to retrieve the current user's session data.
 * It uses the `auth` function to get the session object. If the user is not authenticated
 * (i.e., `session.user` is missing), the function **initiates a redirect** to the `/signin` page
 * and **stops further code execution**.
 * Otherwise, it returns the user's ID and email.
 * This function is critical for protected routes and accessing user information.
 *
 * @returns - An object containing the `userId` and `userEmail`
 * of the authenticated user.
 */
export const getSessionData = async (): Promise<AuthData> => {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/signin')
  } else {
    const { id, email } = session.user

    return {
      id,
      email,
    }
  }
}
