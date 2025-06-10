'use server'

import {
  ListSearchParameter,
  ListSortingParameter,
} from '@/lib/constants/text-const'
import { DASHBOARD_URL } from '@/lib/constants/url'
import { taskRepository } from '@/lib/repositories/prisma/tasks'
import { getSessionData } from '@/lib/utils/get-session-data'
import withFormHandling from '@/lib/utils/services-helper/with-form-handling'
import { tasksSchemes } from '@/lib/zod/schema/tasks'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ActionProps, StateProps } from './user'

export const createTask: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.create,
  async ({ title, details }) => {
    const { userId } = await getSessionData()
    await taskRepository.createTask(userId, {
      details,
      title,
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
  tasksSchemes.updateStatus,
  async ({ id, status }) => {
    await taskRepository.updateTask({ id }, { status })
  },
  async () => {
    revalidatePath(DASHBOARD_URL)
  },
)

export const updatePriorityTasks: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.updatePriority,
  async ({ id, priority }) => {
    getSessionData()
    await taskRepository.updateTask({ id }, { priority })
  },
  async () => {
    revalidatePath(DASHBOARD_URL)
  },
)

export const updateTaskTitle: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.updateTitle,
  async ({ id, title }) => {
    await taskRepository.updateTask({ id }, { title })
  },
  async (formData) => {
    const searchParamsString = formData?.get('searchParams')
    revalidatePath(DASHBOARD_URL)
    redirect(`${DASHBOARD_URL}${searchParamsString}`)
  },
)

export const updateTaskDetails: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.updateDetails,
  async ({ id, details }) => {
    await taskRepository.updateTask({ id }, { details })
  },
  async (formData) => {
    const searchParamsString = formData?.get('searchParams')
    revalidatePath(DASHBOARD_URL)
    redirect(`${DASHBOARD_URL}${searchParamsString}`)
  },
)

export async function deleteTask(formData: FormData) {
  const id = formData.get('id')
  const searchParamsString = formData.get('searchParams')

  if (typeof id !== 'string') {
    console.error('Invalid task ID:', id)
    throw new Error('Invalid task ID')
  }

  try {
    await taskRepository.deleteTask({ id })
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
  revalidatePath(DASHBOARD_URL)
  redirect(`${DASHBOARD_URL}${searchParamsString}`)
}
