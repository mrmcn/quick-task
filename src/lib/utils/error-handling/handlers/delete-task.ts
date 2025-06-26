import { DeleteTaskError } from '@/lib/errors/delete-task-error'

export function handleDeleteTaskError(error: DeleteTaskError) {
  return {
    type: error.type,
    message: error.message,
    details: error.details,
  }
}
