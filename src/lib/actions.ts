/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { auth, signIn, signOut } from '@/auth'
import bcrypt from 'bcrypt'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from './prisma'
import {
  CreateTask,
  SignUpSchema,
  UpdateTask,
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
} from './zod'

export async function createTask(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) return redirect('/signin')
  const authorId = session?.user.id
  const validatedFields = CreateTask.safeParse({
    summary: formData.get('summary'),
    details: formData.get('details'),
    priority: formData.get('priority'),
  })

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to Create Task.'
  }

  const { summary, details, priority } = validatedFields.data

  try {
    await prisma.task.create({
      data: {
        summary,
        details,
        priority,
        authorId,
      },
    })
  } catch (error) {
    throw error
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = SignUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to Create Task.'
  }

  const { email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    })
  } catch (error) {
    throw error
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateUserName(prevState: any, formData: FormData) {
  const session = await auth()
  const id = session?.user.id
  const validatedFields = UserNameSchema.safeParse({
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to update user.'
  }
  const { name } = validatedFields.data
  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        name: name,
      },
    })
  } catch (error) {
    throw error
  }

  revalidatePath('/user')
  redirect('/dashboard')
}

export async function updateUserEmail(prevState: any, formData: FormData) {
  const session = await auth()
  const id = session?.user.id
  const validatedFields = UserEmailSchema.safeParse({
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to update user.'
  }
  const { email } = validatedFields.data
  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        email: email,
      },
    })
  } catch (error) {
    throw error
  }

  revalidatePath('/user')
  redirect('/dashboard')
}

export async function updateUserPassword(prevState: any, formData: FormData) {
  const session = await auth()
  const id = session?.user.id
  const validatedFields = UserPasswordSchema.safeParse({
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to update user.'
  }
  const { password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        password: hashedPassword,
      },
    })
  } catch (error) {
    throw error
  }

  revalidatePath('/user')
  redirect('/dashboard')
}

export async function updateTask(prevState: any, formData: FormData) {
  const validatedFields = UpdateTask.safeParse({
    id: formData.get('taskId'),
    summary: formData.get('summary'),
    details: formData.get('details'),
    priority: formData.get('priority'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to update task.'
  }
  const { id, summary, details, priority, status } = validatedFields.data
  try {
    await prisma.task.update({
      where: { id: id },
      data: {
        summary: summary,
        details: details,
        priority: priority,
        status: status,
      },
    })
  } catch (error) {
    throw error
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id: id },
    })
  } catch (error) {
    throw error
  }

  revalidatePath('/dashboard')
}

export async function deleteUser(id: string) {
  try {
    const deleteTasks = prisma.task.deleteMany({
      where: { authorId: id },
    })

    const deleteUser = prisma.user.delete({
      where: { id: id },
    })

    await prisma.$transaction([deleteTasks, deleteUser])
  } catch (error) {
    throw error
  }

  await signOut({ redirectTo: '/' })
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
