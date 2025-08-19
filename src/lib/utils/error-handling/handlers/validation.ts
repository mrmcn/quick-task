import { HandleError } from '@/lib/utils/error-handling/types'
import { ValidationError } from '@/lib/utils/errors/validation-error'

/**
 * @function handleValidationError
 * @description Handles custom validation errors (`ValidationError`) that occur within the application.
 * This function takes a `ValidationError` object and transforms it into a standardized `HandleError` object,
 * ensuring consistency in how validation-related issues are represented across the system.
 *
 * @param  error - The validation error object, typically a custom error
 * indicating issues with input data or business logic validation.
 * @returns  - A standardized error object including `type`, `message`, and `details`,
 * directly sourced from the original `ValidationError`.
 */
export function handleValidationError(error: ValidationError): HandleError {
  return {
    type: error.type, // The type of validation error
    message: error.message, // A user-friendly message describing the validation failure
    details: error.details, // Specific details about the validation error (e.g., which fields failed)
  }
}
