import { User } from '@prisma/client'
import bcrypt from 'bcrypt'

export default async function verifyAndHashPassword(
  data: {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
  },
  user: User | null,
) {
  const { currentPassword, newPassword } = data

  if (!user || !user.password)
    return {
      error: 'User not found or current password missing.',
      data: null,
    }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password,
  )

  if (!isCurrentPasswordValid)
    return {
      error: 'The current password entered is incorrect.',
      data: null,
    }

  const hashedPassword = await bcrypt.hash(newPassword, 10)
  return { data: hashedPassword, error: null }
}
