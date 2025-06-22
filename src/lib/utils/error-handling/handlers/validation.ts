import { ValidationError } from '@/lib/errors/validation-error'
import { HandleError } from '@/lib/utils/error-handling/type'

export function handleValidationError(error: ValidationError): HandleError {
  return {
    type: error.type,
    message: error.message,
    details: error.details,
  }
}
