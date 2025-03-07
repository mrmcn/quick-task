'use server'

import { checkAuth } from '@/auth'
import prisma from '@/lib/prisma'
import { handleError, handleZodError } from '@/lib/utils/error-handling'
import * as zodSchema from '@/lib/zod/tasksSchema'
import { validateForm } from '@/lib/zod/validate'
import { Task } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { StateProps } from './user-service'

export async function createTask(
  state: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const validationResult = validateForm(formData, zodSchema.CreateTask)

  if (validationResult.errors) return handleZodError(validationResult.errors)
  if (validationResult.data)
    try {
      const { id } = await checkAuth()
      const { summary, details, priority } = validationResult.data
      await prisma.task.create({
        data: {
          summary,
          details,
          priority,
          authorId: id,
        },
      })
    } catch (error) {
      return handleError(error)
    }
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateStatusTasks(
  state: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const validationResult = validateForm(formData, zodSchema.UpdateStatus)

  if (validationResult.errors) return handleZodError(validationResult.errors)
  if (validationResult.data)
    try {
      const { id, status } = validationResult.data
      await prisma.task.update({
        where: { id: id },
        data: {
          status: status,
        },
      })
    } catch (error) {
      return handleError(error)
    }
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateTask(
  state: StateProps,
  formData: FormData,
): Promise<StateProps> {
  const validationResult = validateForm(formData, zodSchema.UpdateTask)

  if (validationResult.errors) return handleZodError(validationResult.errors)
  if (validationResult.data)
    try {
      const { id, summary, details, priority } = validationResult.data
      await prisma.task.update({
        where: { id: id },
        data: {
          summary: summary,
          details: details,
          priority: priority,
        },
      })
    } catch (error) {
      return handleError(error)
    }
  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function deleteTask(taskId: Task['id']) {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    })
  } catch (error) {
    return handleError(error)
  }
  revalidatePath('/dashboard')
  redirect('/dashboard')
}
