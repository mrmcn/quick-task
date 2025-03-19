'use server'

import { signIn, signOut } from '@/auth'
import { DASHBOARD_URL, HOME_URL, USER_URL } from '@/lib/constants/url'
import prisma from '@/lib/prisma'
import { checkAuth } from '@/lib/utils/check-auth'
import {
  handleAuthError,
  handleError,
  HandleErrorProps,
  handleZodError,
} from '@/lib/utils/error-handling'
import {
  EmailAndPasswordSchema,
  EmailSchema,
  NameSchema,
  PasswordSchema,
} from '@/lib/zod/schema/user'
import { validateForm } from '@/lib/zod/validate'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// await new Promise((resolve) => setTimeout(resolve, 3000))

export const createUser: ActionProps<StateProps> = async (state, formData) => {
  const validationResult = validateForm(EmailAndPasswordSchema, formData)

  if (validationResult.errors)
    return { error: handleZodError(validationResult.errors) }
  if (validationResult.data)
    try {
      const { email, password } = validationResult.data
      const hashedPassword = await bcrypt.hash(password, 10)
      await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      })
    } catch (error) {
      return { error: handleError(error) }
    }
  revalidatePath(DASHBOARD_URL)
  redirect(DASHBOARD_URL)
}

export const updateUserName: ActionProps<StateProps> = async (
  state,
  formData,
) => {
  const validationResult = validateForm(NameSchema, formData)

  if (validationResult.errors)
    return { error: handleZodError(validationResult.errors) }
  if (validationResult.data)
    try {
      const { name } = validationResult.data
      const { id } = await checkAuth()
      await prisma.user.update({
        where: { id: id },
        data: {
          name: name,
        },
      })
    } catch (error) {
      return { error: handleError(error) }
    }
  revalidatePath(USER_URL)
  redirect(USER_URL)
}

export const updatePassword: ActionProps<StateProps> = async (
  state,
  formData,
) => {
  const validationResult = validateForm(PasswordSchema, formData)

  if (validationResult.errors)
    return { error: handleZodError(validationResult.errors) }
  if (validationResult.data)
    try {
      const { password } = validationResult.data
      const hashedPassword = await bcrypt.hash(password, 10)
      const { id } = await checkAuth()
      await prisma.user.update({
        where: { id: id },
        data: {
          password: hashedPassword,
        },
      })
    } catch (error) {
      return { error: handleError(error) }
    }
  revalidatePath(USER_URL)
  redirect(USER_URL)
}

export const updateEmail: ActionProps<StateProps> = async (state, formData) => {
  const validationResult = validateForm(EmailSchema, formData)

  if (validationResult.errors)
    return { error: handleZodError(validationResult.errors) }
  if (validationResult.data)
    try {
      const { email } = validationResult.data
      const { id } = await checkAuth()
      await prisma.user.update({
        where: { id: id },
        data: {
          email: email,
        },
      })
    } catch (error) {
      return { error: handleError(error) }
    }
  revalidatePath(USER_URL)
  redirect(USER_URL)
}

export async function deleteUser(): Promise<StateProps> {
  const { id } = await checkAuth()
  try {
    const deleteTasks = prisma.task.deleteMany({
      where: { authorId: id },
    })
    const deleteUser = prisma.user.delete({
      where: { id: id },
    })
    await prisma.$transaction([deleteTasks, deleteUser])
  } catch (error) {
    return { error: handleError(error) }
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
    return { error: handleAuthError(error) }
  }
}

export async function signout() {
  await signOut({ redirectTo: HOME_URL })
}

export type StateProps = { error: HandleErrorProps } | undefined // undefined is the type of initialState with useActionState '@/ui/common/form-wrapper/with-action'

export type ActionProps<T> = (
  state: Awaited<T>,
  payload: FormData,
) => T | Promise<T>
