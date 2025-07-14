import { auth } from '@/auth'
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
export async function getSessionData() {
  // Retrieve the session object using the `auth` function, integrated with NextAuth.js.
  const session = await auth()

  // Check if the user object exists within the session.
  // If the user is not authenticated or their data is missing, initiate a redirect.
  if (!session?.user) {
    // Perform a redirect to the sign-in page. This function interrupts the current code execution
    // and does not return a value in the conventional way.
    redirect('/signin')
  }

  // Destructure `id` and `email` from the `session.user` object.
  const { id, email } = session.user
  // Return an object with the user's ID and email.
  return {
    userId: id,
    userEmail: email,
  }
}
