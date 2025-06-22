import { ValidationError } from '@/lib/errors/validation-error'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

export default async function verifyAndHashPassword(
  currentPassword: string,
  newPassword: string,
  user: User,
) {
  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password,
  )

  if (!isCurrentPasswordValid)
    throw new ValidationError('The current password entered is incorrect.')

  const hashedPassword = await bcrypt.hash(newPassword, 10)
  return hashedPassword
}
