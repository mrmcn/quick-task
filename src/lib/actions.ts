/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from './prisma'
import { CreateTask, UpdateTask } from './zod'

export async function createTask(prevState: any, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
    summary: formData.get('summary'),
    details: formData.get('details'),
    priority: formData.get('priority'),
    authorId: formData.get('authorId'),
  })

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to Create Task.'
  }

  const { summary, details, priority, authorId } = validatedFields.data

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

export async function updateTask(
  id: string,
  prevState: any,
  formData: FormData,
) {
  const validatedFields = UpdateTask.safeParse({
    summary: formData.get('summary'),
    details: formData.get('details'),
    priority: formData.get('priority'),
    status: formData.get('status'),
  })

  if (!validatedFields.success) {
    return 'Missing Fields. Failed to Create Invoice.'
  }
  const { summary, details, priority, status } = validatedFields.data
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
