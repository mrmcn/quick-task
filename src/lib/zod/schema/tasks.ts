import { z } from 'zod'

const form = z.object({
  id: z.string(),
  title: z.string({ message: '"This field is required."' }), //This field is required.
  details: z.string({ message: '"This field is required."' }), //This field is required.
  date: z.date(),
  priority: z.enum(['high', 'low']),
  status: z.enum(['completed', 'in_progress']),
  authorId: z.string(),
})

const updatePriority = form.pick({
  id: true,
  priority: true,
})

const updateStatus = form.pick({
  id: true,
  status: true,
})

const updateTitle = form.pick({
  id: true,
  title: true,
})

const updateDetails = form.pick({
  id: true,
  details: true,
})

const create = form.pick({
  title: true,
  details: true,
})

export const tasksSchemes: TasksSchemes = {
  create,
  updatePriority,
  updateStatus,
  updateTitle,
  updateDetails,
  form,
}

interface TasksSchemes {
  updatePriority: typeof updatePriority
  updateStatus: typeof updateStatus
  updateTitle: typeof updateTitle
  updateDetails: typeof updateDetails
  create: typeof create
  form: typeof form
}
