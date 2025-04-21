import { z } from 'zod'

export const FormSchema = z.object({
  id: z.string(),
  title: z.string({ message: '"This field is required."' }), //This field is required.
  details: z.string({ message: '"This field is required."' }), //This field is required.
  date: z.date(),
  priority: z.enum(['high', 'low']),
  status: z.enum(['completed', 'in_progress']),
  authorId: z.string(),
})

export const UpdatePrioritySchema = FormSchema.pick({
  id: true,
  priority: true,
})

export const UpdateStatusSchema = FormSchema.pick({
  id: true,
  status: true,
})

export const UpdateTaskTitleSchema = FormSchema.pick({
  id: true,
  title: true,
})

export const UpdateTaskDetailsSchema = FormSchema.pick({
  id: true,
  details: true,
})

export const CreateTaskSchema = FormSchema.pick({
  title: true,
  details: true,
})
