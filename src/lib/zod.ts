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

export const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export const UpdateStatusTasks = TaskFormSchema.omit({
  summary: true,
  details: true,
  date: true,
  priority: true,
  authorId: true,
})

export const UpdateTask = TaskFormSchema.omit({
  date: true,
  authorId: true,
  status: true,
})

export const CreateTask = TaskFormSchema.omit({
  id: true,
  date: true,
  status: true,
  authorId: true,
})

export const UserNameSchema = UserSchema.omit({
  email: true,
  password: true,
})

export const AuthDataSchema = UserSchema.omit({
  name: true,
})
