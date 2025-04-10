'use server'

import {
  ListSearchParameter,
  ListSortingParameter,
} from '@/lib/constants/text-const'
import { DASHBOARD_URL } from '@/lib/constants/url'
import prisma from '@/lib/prisma'
import { checkAuth } from '@/lib/utils/check-auth'
import { handleError, handleZodError } from '@/lib/utils/error-handling'
import {
  CreateTaskSchema,
  UpdateStatusSchema,
  UpdateTaskSchema,
} from '@/lib/zod/schema/tasks'
import { validateFormData } from '@/lib/zod/validate'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ActionProps, StateProps } from './user'

export const createTask: ActionProps<StateProps> = async (state, formData) => {
  const validationResult = validateFormData(CreateTaskSchema, formData)

  if (validationResult.errors)
    return { error: handleZodError(validationResult.errors) }
  if (validationResult.data)
    try {
      const { id } = await checkAuth()
      const { title, details, priority } = validationResult.data
      await prisma.task.create({
        data: {
          title,
          details,
          priority,
          authorId: id,
        },
      })
    } catch (error) {
      return { error: handleError(error) }
    }
  revalidatePath(DASHBOARD_URL)
  redirect(
    `${DASHBOARD_URL}?${ListSearchParameter.sorting}=${ListSortingParameter.dateDesc}`,
  )
}

export const updateStatusTasks: ActionProps<StateProps> = async (
  state,
  formData,
) => {
  const validationResult = validateFormData(UpdateStatusSchema, formData)

  if (validationResult.errors)
    return { error: handleZodError(validationResult.errors) }
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
      return { error: handleError(error) }
    }
  revalidatePath(DASHBOARD_URL)
}

export const updateTask: ActionProps<StateProps> = async (state, formData) => {
  const validationResult = validateFormData(UpdateTaskSchema, formData)

  if (validationResult.errors)
    return { error: handleZodError(validationResult.errors) }
  if (validationResult.data)
    try {
      const { id, title, details, priority } = validationResult.data
      await prisma.task.update({
        where: { id: id },
        data: {
          title: title,
          details: details,
          priority: priority,
        },
      })
    } catch (error) {
      return { error: handleError(error) }
    }
  const searchParamsString = formData.get('searchParams')

  revalidatePath(DASHBOARD_URL)
  redirect(`${DASHBOARD_URL}${searchParamsString}`)
}

export const deleteTask = async (formData: FormData) => {
  const taskId = formData.get('id')
  const searchParamsString = formData.get('searchParams')

  if (typeof taskId !== 'string') {
    console.error('Invalid task ID:', taskId)
    throw new Error('Invalid task ID')
  }
  try {
    await prisma.task.delete({
      where: { id: taskId },
    })
  } catch (error) {
    console.error('Error deleting task:', error)
    throw new Error('Failed to delete task')
  }
  revalidatePath(DASHBOARD_URL)
  redirect(`${DASHBOARD_URL}${searchParamsString}`)
}
