'use server'

import { signIn, signOut } from '@/auth'
import { TextFieldsNameAttributeListValue } from '@/lib/constants/text-const'
import { DASHBOARD_URL, HOME_URL, USER_URL } from '@/lib/constants/url'
import { userRepository } from '@/lib/repositories/prisma/user'
import {
  handleError,
  HandleError,
  HandleErrorProps,
} from '@/lib/utils/error-handling'
import { getSessionData } from '@/lib/utils/get-session-data'
import verifyAndHashPassword from '@/lib/utils/services-helper/verify-and-hash-password'
import withFormHandling from '@/lib/utils/services-helper/with-form-handling'
import { userSchemes } from '@/lib/zod/schema/user'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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

export const updatePassword: ActionProps<StateProps> = withFormHandling(
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

export const updateTasksPerPageNumber = async (perPageNumber: string) => {
  try {
    const { userId: id } = await getSessionData()
    const tasksPerPage = Number(perPageNumber)
    await userRepository.updateUser({ id }, { tasksPerPage })
  } catch (error) {
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }
  revalidatePath(USER_URL)
}

export async function deleteUser(): Promise<StateProps> {
  const { userId: id } = await getSessionData()
  try {
    await userRepository.deleteUser({ id })
  } catch (error) {
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }

  await signOut()
  redirect(HOME_URL)
}

export const authenticate: ActionProps<StateProps> = async (
  state,
  formData,
) => {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    return { status: 'error', error: handleError(error as HandleErrorProps) }
  }
}

export async function signout() {
  await signOut({ redirectTo: HOME_URL })
}

export type StateProps =
  | { status: 'success' }
  | { status: 'error'; error: HandleError }
  | undefined // undefined is the type of initialState with useActionState '@/ui/common/form-wrapper/with-action'

export type ActionProps<T> = (
  state: Awaited<T>,
  payload: FormData,
) => T | Promise<T>

export type FieldNameAttribute = Extract<
  TextFieldsNameAttributeListValue,
  'email' | 'name'
>
