'use server'

import { signOut } from '@/auth'
import { DASHBOARD_URL, HOME_URL, USER_URL } from '@/lib/constants/url'
import { userRepository } from '@/lib/repositories/prisma/user'
import { handleError, HandleErrorProps } from '@/lib/utils/error-handling'
import { getSessionData } from '@/lib/utils/get-session-data'
import { prepareHashedPassword } from '@/lib/utils/services-helper/prepare-hashed-password'
import withFormHandling from '@/lib/utils/services-helper/with-form-handling'
import { userSchemes } from '@/lib/zod/schema/user'
import { validateData } from '@/lib/zod/validate'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ActionProps, StateProps } from './types'

// await new Promise((resolve) => setTimeout(resolve, 3000))

export const createUser: ActionProps<StateProps> = withFormHandling(
  userSchemes.emailAndPasswordInput,
  async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    await userRepository.createUser({ email, password: hashedPassword })
  },
  async () => {
    revalidatePath(DASHBOARD_URL)
    redirect(DASHBOARD_URL)
  },
)

export const updateUserName: ActionProps<StateProps> = withFormHandling(
  userSchemes.name,
  async ({ name }) => {
    const { userId: id } = await getSessionData()
    await userRepository.updateUser({ id }, { name })
  },
  async () => {
    revalidatePath(USER_URL)
    redirect(USER_URL)
  },
)

export const updateUserEmail: ActionProps<StateProps> = withFormHandling(
  userSchemes.email,
  async ({ email }) => {
    const { userId: id } = await getSessionData()
    await userRepository.updateUser({ id }, { email })
  },
  async () => {
    revalidatePath(USER_URL)
    redirect(USER_URL)
  },
)

export const updateUserPassword: ActionProps<StateProps> = withFormHandling(
  userSchemes.changePassword,
  async ({ currentPassword, newPassword }) => {
    const { userId: id } = await getSessionData()
    const { password } = await prepareHashedPassword(
      currentPassword,
      newPassword,
      id,
    )
    await userRepository.updateUser({ id }, { password })

    return { status: 'success' }
  },
)

export const updateTasksPerPageNumber = async (
  perPageNumber: string,
): Promise<StateProps> => {
  try {
    const validationResult = validateData(
      { perPageNumber },
      userSchemes.perPageNumber,
    )
    const { userId: id } = await getSessionData()
    await userRepository.updateUser(
      { id },
      { tasksPerPage: validationResult.perPageNumber },
    )
  } catch (error) {
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }
  revalidatePath(USER_URL)
}

export const deleteUser = async (): Promise<StateProps> => {
  const { userId: id } = await getSessionData()
  try {
    await userRepository.deleteUser({ id })
  } catch (error) {
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }

  await signOut()
  redirect(HOME_URL)
}
