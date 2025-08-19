import { ValidationError } from '@/lib/utils/errors/validation-error'
import { CurrentAndNewPassword } from '@/lib/utils/types'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

/**
 * @function verifyAndHashPassword
 * @description An asynchronous function to verify a user's current password
 * and hash a new password.
 * It compares the `currentPassword` provided by the user against the hashed password retrieved from the database.
 * If successful, it hashes the `newPassword` using bcrypt.
 *
 * @param  passwords - An object containing the `currentPassword` (provided by the user)
 * and the `newPassword` (to be hashed).
 * @param  password - The user's current hashed password retrieved from the database.
 * @returns  - A Promise that resolves to the hashed new password.
 * @throws  - Throws a `ValidationError` if the provided `currentPassword` does not match
 * the hashed password from the database.
 */
export async function verifyAndHashPassword(
  passwords: CurrentAndNewPassword,
  password: User['password'],
) {
  // Compare the provided `currentPassword` with the hashed password retrieved from the database.
  const isCurrentPasswordValid = await bcrypt.compare(
    passwords.currentPassword,
    password,
  )

  // If the `currentPassword` does not match, throw a validation error.
  if (!isCurrentPasswordValid)
    throw new ValidationError('The current password entered is incorrect.')

  // Hash the `newPassword` using bcrypt with a salt round of 10.
  const hashedPassword = await bcrypt.hash(passwords.newPassword, 10)
  // Return the hashed new password.
  return hashedPassword
}
