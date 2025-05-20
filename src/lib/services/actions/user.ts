'use server'

import { signIn, signOut } from '@/auth'
import { DASHBOARD_URL, HOME_URL, USER_URL } from '@/lib/constants/url'
import { ValidationError } from '@/lib/errors/validation-error'
import prisma from '@/lib/prisma'
import {
  HandleError,
  handleError,
  HandleErrorProps,
} from '@/lib/utils/error-handling'
import { getSessionData } from '@/lib/utils/get-session-data'
import verifyAndHashPassword from '@/lib/utils/services-helper/verify-and-hash-password'
import withFormHandling from '@/lib/utils/services-helper/with-form-handling'
import {
  ChangePasswordSchema,
  EmailAndPasswordSchema,
  EmailSchema,
  NameSchema,
} from '@/lib/zod/schema/user'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// await new Promise((resolve) => setTimeout(resolve, 3000))

export const createUser: ActionProps<StateProps> = withFormHandling(
  EmailAndPasswordSchema,
  async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    })
  },
  async () => {
    revalidatePath(DASHBOARD_URL)
    redirect(DASHBOARD_URL)
  },
)

export const updateUserName: ActionProps<StateProps> = withFormHandling(
  NameSchema,
  async ({ name }) => {
    const { userId } = await getSessionData()
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
      },
    })
  },
  async () => {
    revalidatePath(USER_URL)
    redirect(USER_URL)
  },
)

export const updatePassword: ActionProps<StateProps> = withFormHandling(
  ChangePasswordSchema,
  async ({ currentPassword, newPassword }) => {
    const { userId } = await getSessionData()
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    const res = await verifyAndHashPassword(currentPassword, newPassword, user)

    if (res.data === null) {
      throw new ValidationError(res.error)
    }
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: res.data,
      },
    })

    return { status: 'success' }
  },
)

export const updateEmail: ActionProps<StateProps> = withFormHandling(
  EmailSchema,
  async ({ email }) => {
    const { userId } = await getSessionData()
    await prisma.user.update({
      where: { id: userId },
      data: {
        email: email,
      },
    })
  },
  async () => {
    revalidatePath(USER_URL)
    redirect(USER_URL)
  },
)

export async function deleteUser(): Promise<StateProps> {
  const { userId } = await getSessionData()
  try {
    const deleteTasks = prisma.task.deleteMany({
      where: { authorId: userId },
    })
    const deleteUser = prisma.user.delete({
      where: { id: userId },
    })
    await prisma.$transaction([deleteTasks, deleteUser])
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
