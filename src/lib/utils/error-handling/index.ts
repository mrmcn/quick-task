import { handleAuthError } from '@/lib/utils/error-handling/handlers/auth'
import { handleLastError } from '@/lib/utils/error-handling/handlers/last'
import { handlePrismaError } from '@/lib/utils/error-handling/handlers/prisma'
import { handleValidationError } from '@/lib/utils/error-handling/handlers/validation'
import { handleZodError } from '@/lib/utils/error-handling/handlers/zod'
import {
  isAuthError,
  isDeleteTaskError,
  isError,
  isPrismaClientError,
  isValidateError,
  isZodError,
} from '@/lib/utils/error-handling/type-guards'
import { handleDeleteTaskError } from './handlers/delete-task'
import { HandleError, HandleErrorProps } from './type'

export function handleError(error: HandleErrorProps): HandleError {
  switch (true) {
    case isPrismaClientError(error):
      return handlePrismaError(error)
    case isAuthError(error):
      return handleAuthError(error)
    case isZodError(error):
      return handleZodError(error)
    case isValidateError(error):
      return handleValidationError(error)
    case isDeleteTaskError(error):
      return handleDeleteTaskError(error)
    case isError(error):
      return handleLastError(error)
    default:
      throw new Error(
        'An error occurred while using service functions in app/lib/services',
      )
  }
}
