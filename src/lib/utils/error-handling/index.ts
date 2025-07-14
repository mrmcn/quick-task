import { handleAuthError } from '@/lib/utils/error-handling/handlers/auth'
import { handleDeleteTaskError } from '@/lib/utils/error-handling/handlers/delete-task'
import { handleLastError } from '@/lib/utils/error-handling/handlers/last'
import { handlePrismaError } from '@/lib/utils/error-handling/handlers/prisma'
import { handleValidationError } from '@/lib/utils/error-handling/handlers/validation'
import { handleZodError } from '@/lib/utils/error-handling/handlers/zod'
import { HandleError, HandleErrorProps } from '@/lib/utils/error-handling/type'
import {
  isAuthError,
  isDeleteTaskError,
  isError,
  isPrismaClientError,
  isValidateError,
  isZodError,
} from '@/lib/utils/error-handling/type-guards'

/**
 * @function handleError
 * @description Centralized error handling function for the application.
 * It identifies the type of error and dispatches it to the appropriate specialized handler.
 * This helps maintain clean code and ensures consistent error processing for various error types
 * (e.g., database-related, authentication, validation, etc.).
 *
 * @param  error - The error object to be handled. This can be any
 * error that occurs during the execution of service functions.
 * @returns  - The result of the error being processed by its corresponding handler.
 * Typically, this is a standardized object containing the error message and status,
 * suitable for display to the user or for logging.
 * @throws  - Throws a generic error if the received error type does not match
 * any of the predefined types (i.e., it was not recognized by any type guard).
 */
export function handleError(error: HandleErrorProps): HandleError {
  // We use a `switch (true)` construct for sequential checking of error types.
  // This approach allows checking the error against various "type guards" (`is...Error`)
  // and executing the first `case` block that returns `true`.
  switch (true) {
    // Checks for a Prisma Client error (related to database operations).
    case isPrismaClientError(error):
      return handlePrismaError(error)

    // Checks for an authentication error, specifically those originating from **Auth.js (NextAuth.js)**.
    case isAuthError(error):
      return handleAuthError(error)

    // Checks for a Zod validation error (occurs when data doesn't conform to a Zod schema).
    case isZodError(error):
      return handleZodError(error)

    // Checks for a general validation error (not Zod-specific, but related to invalid input data).
    case isValidateError(error):
      return handleValidationError(error)

    // Checks for an error during task deletion (specific to task deletion operations).
    case isDeleteTaskError(error):
      return handleDeleteTaskError(error)

    // A general check for a basic JavaScript `Error` object. This case serves as a "fallback"
    // for any standard errors that don't fall into more specific categories.
    // **Note:** `handleLastError` **re-throws** the error
    // if its message (`error.message`) is `'NEXT_REDIRECT'`. This is critical for
    // the correct functioning of redirects in Next.js.
    case isError(error):
      return handleLastError(error)

    // Default case: If none of the above error types match,
    // it means we received an unhandled error. A new error is thrown to
    // indicate an unexpected scenario.
    default:
      throw new Error(
        'An unexpected error occurred while using service functions in app/lib/services. The error was not recognized by any handler.',
      )
  }
}
