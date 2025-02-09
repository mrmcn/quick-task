import { z } from 'zod'

export const TaskFormSchema = z.object({
  id: z.string(),
  summary: z.string(),
  details: z.string(),
  date: z.date(),
  priority: z.enum(['high', 'low']),
  status: z.enum(['completed', 'in_progress']),
  authorId: z.string(),
})

export const UpdateTask = TaskFormSchema.omit({
  id: true,
  date: true,
  authorId: true,
})

export const CreateTask = TaskFormSchema.omit({
  id: true,
  date: true,
  status: true,
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
