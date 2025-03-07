import { z } from 'zod'

export const Form = z.object({
  id: z.string(),
  summary: z.string({ message: '"This field is required."' }), //This field is required.
  details: z.string({ message: '"This field is required."' }), //This field is required.
  date: z.date(),
  priority: z.enum(['high', 'low']),
  status: z.enum(['completed', 'in_progress']),
  authorId: z.string(),
})

export const UpdateStatus = Form.omit({
  summary: true,
  details: true,
  date: true,
  priority: true,
  authorId: true,
})

export const UpdateTask = Form.omit({
  date: true,
  authorId: true,
  status: true,
})

export const CreateTask = Form.omit({
  id: true,
  date: true,
  status: true,
  authorId: true,
})
