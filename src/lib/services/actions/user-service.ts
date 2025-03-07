'use server'

import { checkAuth, signIn, signOut } from '@/auth'
import prisma from '@/lib/prisma'
import {
  DetailsPrismaErrorProps,
  DetailsUnknownErrorProps,
  handleAuthError,
  handleError,
  handleZodError,
} from '@/lib/utils/error-handling'
import * as zodSchema from '@/lib/zod/userSchema'
import { ValidateErrorsProps, validateForm } from '@/lib/zod/validate'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// await new Promise((resolve) => setTimeout(resolve, 3000))

export async function createUser(
  state: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const validationResult = validateForm(formData, zodSchema.AuthOrCreate)

  if (validationResult.errors) return handleZodError(validationResult.errors)

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
      return handleError(error)
    }
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateUserName(
  state: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const validationResult = validateForm(formData, zodSchema.Name)

  if (validationResult.errors) return handleZodError(validationResult.errors)
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
      return handleError(error)
    }
  revalidatePath('/user')
  redirect('/user')
}

export async function updatePassword(
  state: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const validationResult = validateForm(formData, zodSchema.Password)

  if (validationResult.errors) return handleZodError(validationResult.errors)
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
      return handleError(error)
    }
  revalidatePath('/user')
  redirect('/user')
}

export async function updateEmail(
  state: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const validationResult = validateForm(formData, zodSchema.Email)

  if (validationResult.errors) return handleZodError(validationResult.errors)
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
      return handleError(error)
    }
  revalidatePath('/user')
  redirect('/user')
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
    return handleError(error)
  }

  await signOut()
  redirect('/')
}

export async function authenticate(
  state: StateProps,
  formData: FormData,
): Promise<StateProps> {
  try {
    await signIn('credentials', formData)
    return {
      type: 'success',
      message: 'Authentication successful',
      details: undefined,
    }
  } catch (error) {
    return handleAuthError(error)
  }
}

export async function signout() {
  await signOut({ redirectTo: '/' })
}

export type StateProps =
  | {
      type: string
      message: string
      details:
        | ValidateErrorsProps
        | DetailsPrismaErrorProps
        | DetailsUnknownErrorProps
    }
  | undefined // undefined is the type of initialState with useActionState '@/ui/common/form-wrapper/with-action'
