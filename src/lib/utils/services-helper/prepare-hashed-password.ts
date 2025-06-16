import { userRepository } from '@/lib/repositories/prisma/user'
import { User } from '@prisma/client'
import verifyAndHashPassword from './verify-and-hash-password'

export const prepareHashedPassword = async (
  currentPassword: User['password'],
  newPassword: User['password'],
  id: User['id'],
) => {
  const user = await userRepository.getUser({ id })
  const hashedNewPassword = await verifyAndHashPassword(
    currentPassword,
    newPassword,
    user,
  )
  return { password: hashedNewPassword }
}
