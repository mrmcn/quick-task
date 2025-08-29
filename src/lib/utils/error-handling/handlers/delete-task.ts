import { HandleError } from '@/lib/utils/error-handling/types'
import { DeleteTaskError } from '@/lib/utils/errors/delete-task-error'

/**
 * @function handleDeleteTaskError
 * @description Handles errors that occur during task deletion operations.
 * This function takes a specific `DeleteTaskError` object and transforms it
 * into a standardized `HandleError` object, ensuring a consistent error format
 * across the application.
 *
 * @param  error - The error object that occurred during task deletion.
 * @returns  - A standardized error object including `type`, `message`, and `details`,
 * derived directly from the original `DeleteTaskError`.
 */
export function handleDeleteTaskError(error: DeleteTaskError): HandleError {
  return {
    type: error.type,
    message: error.message,
    details: error.details,
  }
}
