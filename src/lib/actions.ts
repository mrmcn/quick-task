'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { CreateNewTask } from './data'

export async function createTask(formData: FormData) {
  await CreateNewTask(formData)
  revalidatePath('/dashboard')
  redirect('/dashboard')
}
