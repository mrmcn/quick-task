import { HandleError, ZodErrors } from '@/lib/utils/error-handling/type'
import { z } from 'zod'

export function handleZodError(error: z.ZodError): HandleError {
  const fieldErrors: ZodErrors = {}
  const zodErrors = error.flatten().fieldErrors

  for (const field in zodErrors) {
    if (zodErrors[field] && zodErrors[field] !== undefined) {
      fieldErrors[field] = zodErrors[field]
    }
  }

  return {
    type: 'zodValidation',
    message: 'Validation error.',
    details: fieldErrors,
  }
}
