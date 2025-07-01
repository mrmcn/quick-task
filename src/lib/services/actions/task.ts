'use server'

import { auth } from '@/auth'
import { PAGES } from '@/lib/constants/routes'
import {
  ListSearchParameter,
  ListSortingParameter,
} from '@/lib/constants/text-const'
import { DeleteTaskError } from '@/lib/errors/delete-task-error'
import { taskRepository } from '@/lib/repositories/prisma/tasks'
import { ActionProps, StateProps } from '@/lib/services/types'
import { getSessionData } from '@/lib/utils/helpers/get-session-data'
import withFormHandling from '@/lib/utils/helpers/with-form-handling'
import { tasksSchemes } from '@/lib/zod/schema/tasks'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createTask: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.create,
  async ({ title, details }) => {
    const { userId } = await getSessionData()
    await taskRepository.createTask(userId, { title, details })
  },
  async () => {
    revalidatePath(PAGES.DASHBOARD)
    redirect(
      `${PAGES.DASHBOARD}?${ListSearchParameter.sorting}=${ListSortingParameter.dateDesc}`,
    )
  },
)

export const updateTaskStatus: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.updateStatus,
  async ({ id, status }) => {
    await taskRepository.updateTask({ id }, { status })
  },
  async () => {
    revalidatePath(PAGES.DASHBOARD)
  },
)

export const updateTaskPriority: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.updatePriority,
  async ({ id, priority }) => {
    getSessionData()
    await taskRepository.updateTask({ id }, { priority })
  },
  async () => {
    revalidatePath(PAGES.DASHBOARD)
  },
)

export const updateTaskTitle: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.updateTitle,
  async ({ id, title }) => {
    await taskRepository.updateTask({ id }, { title })
  },
  async (formData) => {
    const searchParamsString = formData?.get('searchParams')
    revalidatePath(PAGES.DASHBOARD)
    redirect(`${PAGES.DASHBOARD}${searchParamsString}`)
  },
)

export const updateTaskDetails: ActionProps<StateProps> = withFormHandling(
  tasksSchemes.updateDetails,
  async ({ id, details }) => {
    await taskRepository.updateTask({ id }, { details })
  },
  async (formData) => {
    const searchParamsString = formData?.get('searchParams')
    revalidatePath(PAGES.DASHBOARD)
    redirect(`${PAGES.DASHBOARD}${searchParamsString}`)
  },
)

export const deleteTask = async (formData: FormData) => {
  const id = formData.get('id')
  const searchParamsString = formData.get('searchParams')

  if (!(await auth())) return

  if (typeof id !== 'string') {
    console.error('Invalid task ID:', id)
    throw new DeleteTaskError('Invalid task ID')
  }

  try {
    await taskRepository.deleteTask({ id })
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
  revalidatePath(PAGES.DASHBOARD)
  redirect(`${PAGES.DASHBOARD}${searchParamsString}`)
}
