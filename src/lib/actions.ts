/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { auth, signIn, signOut } from '@/auth'
import bcrypt from 'bcrypt'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from './prisma'
import {
  AuthDataSchema,
  CreateTask,
  UpdateStatusTasks,
  UpdateTask,
  UserEmailSchema,
  UserNameSchema,
  UserPasswordSchema,
} from './zod'

// await new Promise((resolve) => setTimeout(resolve, 3000))

export async function createTask(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session) return redirect('/signin')
  const authorId = session.user.id
  const validatedFields = CreateTask.safeParse({
    summary: formData.get('summary'),
    details: formData.get('details'),
    priority: formData.get('priority'),
  })

  if (!validatedFields.success) {
    return { massage: 'Missing Fields. Failed to Create Task.' }
  }

  const { summary, details, priority } = validatedFields.data

  const res = await prisma.task.create({
    data: {
      summary,
      details,
      priority,
      authorId,
    },
  })

  if (!res) {
    return { message: 'Failed to create task' }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function createUser(prevState: any, formData: FormData) {
  const validatedFields = AuthDataSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { massage: 'Missing Fields. Failed to Create User.' }
  }

  const { email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const res = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  })
  if (!res) {
    return { message: 'Failed to create user' }
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
    return { massage: 'Missing Fields. Failed to update name.' }
  }
  const { name } = validatedFields.data
  const res = await prisma.user.update({
    where: { id: id },
    data: {
      name: name,
    },
  })
  if (!res) {
    return { message: 'Failed to update name' }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function updatePassword(prevState: any, formData: FormData) {
  const session = await auth()
  const id = session?.user.id
  const validatedFields = UserPasswordSchema.safeParse({
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { massage: 'Missing Fields. Failed to update password.' }
  }
  const { password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const res = await prisma.user.update({
    where: { id: id },
    data: {
      password: hashedPassword,
    },
  })
  if (!res) {
    return { message: 'Failed to update password' }
  }

  revalidatePath('/user')
  redirect('/dashboard')
}

export async function updateEmail(prevState: any, formData: FormData) {
  const session = await auth()
  const id = session?.user.id
  const validatedFields = UserEmailSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { massage: 'Missing Fields. Failed to update email.' }
  }
  const { email } = validatedFields.data
  const res = await prisma.user.update({
    where: { id: id },
    data: {
      email: email,
    },
  })
  if (!res) {
    return { message: 'Failed to update email' }
  }

  revalidatePath('/user')
  redirect('/dashboard')
}

export async function updateStatusTasks(prevState: any, formData: FormData) {
  const validatedFields = UpdateStatusTasks.safeParse({
    id: formData.get('taskId'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return { massage: 'Missing Fields. Failed to update task.' }
  }
  const { id, status } = validatedFields.data
  const res = await prisma.task.update({
    where: { id: id },
    data: {
      status: status,
    },
  })
  if (!res) {
    return { message: 'Failed to update task' }
  }

  revalidatePath('/dashboard')
}

export async function updateTask(prevState: any, formData: FormData) {
  const validatedFields = UpdateTask.safeParse({
    id: formData.get('taskId'),
    summary: formData.get('summary'),
    details: formData.get('details'),
    priority: formData.get('priority'),
  })

  if (!validatedFields.success) {
    return { massage: 'Missing Fields. Failed to update task.' }
  }
  const { id, summary, details, priority } = validatedFields.data
  const res = await prisma.task.update({
    where: { id: id },
    data: {
      summary: summary,
      details: details,
      priority: priority,
    },
  })
  if (!res) {
    return { message: 'Failed to update task' }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function deleteTask(taskId: string) {
  const res = await prisma.task.delete({
    where: { id: taskId },
  })
  if (!res) {
    return { message: 'Failed to delete' }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function deleteUser() {
  const session = await auth()
  const userId = session?.user.id
  const deleteTasks = prisma.task.deleteMany({
    where: { authorId: userId },
  })

  const deleteUser = prisma.user.delete({
    where: { id: userId },
  })

  const res = await prisma.$transaction([deleteTasks, deleteUser])
  if (!res) {
    return { message: 'Failed to delete' }
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

export async function signout() {
  await signOut({ redirectTo: '/' })
}
