import { ValidationError } from '@/lib/errors/validation-error'
import bcrypt from 'bcrypt'

export default async function verifyAndHashPassword(
  currentPassword: string,
  newPassword: string,
  password: string,
) {
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, password)

  if (!isCurrentPasswordValid)
    throw new ValidationError('The current password entered is incorrect.')

  const hashedPassword = await bcrypt.hash(newPassword, 10)
  return hashedPassword
}
