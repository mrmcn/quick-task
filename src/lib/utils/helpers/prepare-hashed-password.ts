import { userRepository } from '@/lib/repositories/prisma/user'
import verifyAndHashPassword from '@/lib/utils/helpers/verify-and-hash-password'
import { User } from '@prisma/client'

const prepareHashedPassword = async (
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

export default prepareHashedPassword
