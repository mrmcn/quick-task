import { HandleError, ZodErrors } from '@/lib/utils/error-handling/type'
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
  // Initialize an empty object to store field-specific errors.
  const fieldErrors: ZodErrors = {}
  // Use Zod's `.flatten()` method to get errors, separated into field errors
  // and form errors. Here, we're primarily interested in `fieldErrors`.
  const zodErrors = error.flatten().fieldErrors

  // Iterate over each field for which Zod detected a validation error.
  for (const field in zodErrors) {
    // Ensure the field has an actual error associated with it.
    if (zodErrors[field] && zodErrors[field] !== undefined) {
      // Add the error for the current field to our `fieldErrors` object.
      fieldErrors[field] = zodErrors[field]
    }
  }

  // Return the standardized HandleError object with the type, a general message,
  // and the detailed field-specific errors.
  return {
    type: 'zodValidation', // Error type: Zod validation
    message: 'Validation error.', // General message for validation failure
    details: fieldErrors, // Detailed object with errors per field
  }
}
