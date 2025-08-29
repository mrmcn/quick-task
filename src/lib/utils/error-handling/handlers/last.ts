import { HandleError } from '@/lib/utils/error-handling/types'

/**
 * @function handleLastError
 * @description Handles general JavaScript errors (`Error` objects) that haven't been recognized
 * by more specific error handlers. This function serves as a "fallback" error processing mechanism.
 *
 * @param  error - The standard JavaScript `Error` object.
 * @returns  - A standardized error object, including `type`, `message`, and `details`.
 * @throws  - Re-throws the original error if its message is `'NEXT_REDIRECT'`.
 * This is crucial for the correct functioning of Next.js's redirect mechanism.
 */
export function handleLastError(error: Error): HandleError {
  // Checks if the error is a special Next.js redirect signal.
  // If it is, we **re-throw** this error because Next.js handles it
  // to perform the redirect, and it should not be "caught" as a regular error.
  if (error.message === 'NEXT_REDIRECT') {
    throw error
  } else {
    return {
      type: 'unknown',
      message: error.message,
      details: error.name,
    }
  }
}
