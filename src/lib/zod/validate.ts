import { z } from 'zod'

export function validateFormData<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData,
): {
  errors: z.ZodError<T> | null
  data: z.infer<T> | null
} {
  const parsedData: Record<string, string | File | undefined> = {}
  for (const [key, value] of formData.entries()) {
    parsedData[key] = value
  }
  const validatedFields = schema.safeParse(parsedData)

  if (!validatedFields.success) {
    return { errors: validatedFields.error, data: null }
  }

  return { errors: null, data: validatedFields.data }
}
