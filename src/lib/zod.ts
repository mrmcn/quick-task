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
  date: true,
  authorId: true,
})

export const CreateTask = TaskFormSchema.omit({
  id: true,
  date: true,
  status: true,
  authorId: true,
})

export const UserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export const UserNameSchema = UserSchema.omit({
  email: true,
  password: true,
})

export const UserEmailSchema = UserSchema.omit({
  name: true,
  password: true,
})

export const UserPasswordSchema = UserSchema.omit({
  email: true,
  name: true,
})

export const SignInSchema = UserSchema.omit({
  name: true,
})

export const SignUpSchema = UserSchema.omit({
  name: true,
})
