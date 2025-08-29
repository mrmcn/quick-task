import { HandleError, ZodErrors } from '@/lib/utils/error-handling/types'
import { z } from 'zod'

/**
 * @function handleZodError
 * @description Handles validation errors that arise when using the Zod library.
 * This function transforms a detailed `z.ZodError` object into a standardized `HandleError`,
 * extracting and organizing field-specific errors for easier consumption.
 *
 * @param  error - The Zod error object containing validation details.
 * @returns  - A standardized error object including a `type` (always 'zodValidation'),
 * a general `message`, and `details` containing an object with errors for each field.
 */
export function handleZodError(error: z.ZodError): HandleError {
  const fieldErrors: ZodErrors = {}
  // Use Zod's `.flatten()` method to get errors, separated into field errors
  // and form errors. Here, we're primarily interested in `fieldErrors`.
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
