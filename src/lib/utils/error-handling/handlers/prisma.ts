import { HandleError, PrismaClientError } from '@/lib/utils/error-handling/type'
import { Prisma } from '@prisma/client'

export function handlePrismaError(error: PrismaClientError): HandleError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      type: 'database',
      message: `${error.message}. Code: ${error.code}.`,
      details: error.meta,
    }
  } else {
    return {
      type: 'database',
      message: 'Database error.',
      details: error.message,
    }
  }
}
