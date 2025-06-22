import { HandleError } from '@/lib/utils/error-handling/type'

export function handleLastError(error: Error): HandleError {
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
