import { z } from 'zod'

export const FormSchema = z.object({
  id: z.string(),
  title: z.string({ message: '"This field is required."' }), //This field is required.
  details: z.string({ message: '"This field is required."' }), //This field is required.
  date: z.date(),
  priority: z.enum(['high', 'low']),
  status: z.enum(['completed', 'in_progress']),
  authorId: z.string(),
  searchParams: z.string(),
})

export const UpdateStatusSchema = FormSchema.omit({
  title: true,
  details: true,
  date: true,
  priority: true,
  authorId: true,
  searchParams: true,
})

export const UpdateTaskSchema = FormSchema.omit({
  date: true,
  authorId: true,
  status: true,
})

export const CreateTaskSchema = FormSchema.omit({
  id: true,
  date: true,
  status: true,
  authorId: true,
  searchParams: true,
})
