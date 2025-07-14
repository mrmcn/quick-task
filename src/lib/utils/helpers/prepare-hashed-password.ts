import { userRepository } from '@/lib/repositories/prisma/user'
import verifyAndHashPassword from '@/lib/utils/helpers/verify-and-hash-password'
import { CurrentAndNewPassword } from '@/lib/utils/types'
import { User } from '@prisma/client'

/**
 * @function prepareHashedPassword
 * @description An asynchronous function to prepare a hashed new password for a user.
 * It retrieves the user's current hashed password from the database,
 * then passes it along with the provided passwords to `verifyAndHashPassword` for validation and hashing.
 * This function is part of the password change process, ensuring the security of the operation.
 *
 * @param  passwordStack - An object containing the user's current and new passwords.
 * @param  id - The ID of the user for whom the password is being changed.
 * @returns  - A Promise that resolves to the hashed `newPassword` (a string directly).
 * @throws  - May throw an error if:
 * - User data could not be retrieved (e.g., user not found).
 * - `verifyAndHashPassword` throws an error (e.g., if `currentPassword` does not match).
 */
export const prepareHashedPassword = async (
  passwords: CurrentAndNewPassword,
  id: User['id'],
) => {
  // Retrieve the user's current hashed password from the database using their ID.
  const { password } = await userRepository.getSelectUser(
    { id },
    { password: true },
  )

  // Verify the `currentPassword` against the retrieved hashed password
  // and hash the `newPassword`. The `verifyAndHashPassword` function handles all the logic.
  const hashedNewPassword = await verifyAndHashPassword(passwords, password)

  // Return the new hashed password (string).
  return hashedNewPassword
}
