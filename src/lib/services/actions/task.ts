'use server'

import { auth } from '@/auth'
import {
  ListSearchParameter,
  ListSortingParameter,
} from '@/lib/constants/text-const'
import { DASHBOARD_URL } from '@/lib/constants/url'
import prisma from '@/lib/prisma'
import { handleError, HandleErrorProps } from '@/lib/utils/error-handling'
import { getSessionData } from '@/lib/utils/get-session-data'
import withFormHandling from '@/lib/utils/services-helper/with-form-handling'
import {
  CreateTaskSchema,
  UpdatePrioritySchema,
  UpdateStatusSchema,
  UpdateTaskDetailsSchema,
  UpdateTaskTitleSchema,
} from '@/lib/zod/schema/tasks'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ActionProps, StateProps } from './user'

export const createTask: ActionProps<StateProps> = withFormHandling(
  CreateTaskSchema,
  async ({ title, details }) => {
    const { userId } = await getSessionData()
    await prisma.task.create({
      data: {
        title,
        details,
        authorId: userId,
      },
    })
  },
  async () => {
    revalidatePath(DASHBOARD_URL)
    redirect(
      `${DASHBOARD_URL}?${ListSearchParameter.sorting}=${ListSortingParameter.dateDesc}`,
    )
  },
)

export const updateStatusTasks: ActionProps<StateProps> = withFormHandling(
  UpdateStatusSchema,
  async ({ id, status }) => {
    await prisma.task.update({
      where: { id: id },
      data: {
        status: status,
      },
    })
  },
  async () => {
    revalidatePath(DASHBOARD_URL)
  },
)

export const updatePriorityTasks: ActionProps<StateProps> = withFormHandling(
  UpdatePrioritySchema,
  async ({ id, priority }) => {
    const session = await auth()

    if (!session) return undefined
    await prisma.task.update({
      where: { id: id },
      data: {
        priority: priority,
      },
    })
  },
  async () => {
    revalidatePath(DASHBOARD_URL)
  },
)

export const updateTaskTitle: ActionProps<StateProps> = withFormHandling(
  UpdateTaskTitleSchema,
  async ({ id, title }) => {
    await prisma.task.update({
      where: { id: id },
      data: {
        title: title,
      },
    })
  },
  async (formData) => {
    const searchParamsString = formData?.get('searchParams')
    revalidatePath(DASHBOARD_URL)
    redirect(`${DASHBOARD_URL}${searchParamsString}`)
  },
)

export const updateTaskDetails: ActionProps<StateProps> = withFormHandling(
  UpdateTaskDetailsSchema,
  async ({ id, details }) => {
    await prisma.task.update({
      where: { id: id },
      data: {
        details: details,
      },
    })
  },
  async (formData) => {
    const searchParamsString = formData?.get('searchParams')
    revalidatePath(DASHBOARD_URL)
    redirect(`${DASHBOARD_URL}${searchParamsString}`)
  },
)

export async function deleteTask(formData: FormData) {
  const session = await auth()

  if (!session) return undefined
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
    return handleError(error as HandleErrorProps)
  }
  revalidatePath(DASHBOARD_URL)
  redirect(`${DASHBOARD_URL}${searchParamsString}`)
}
