import { ValidationError } from '@/lib/errors/validation-error'
import { Prisma } from '@prisma/client'
import { AuthError } from 'next-auth'
import { z } from 'zod'

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
    case isError(error):
      return handleLastError(error)
    default:
      throw new Error(
        'An error occurred while using service functions in app/lib/services',
      )
  }
}

function isPrismaClientError(
  error: HandleErrorProps,
): error is PrismaClientError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientValidationError
  )
}

function isAuthError(error: HandleErrorProps): error is AuthError {
  return error instanceof AuthError
}

function isZodError(error: HandleErrorProps): error is z.ZodError {
  return error instanceof z.ZodError
}
function isValidateError(error: HandleErrorProps): error is ValidationError {
  return error instanceof ValidationError
}

function isError(error: HandleErrorProps): error is Error {
  return error instanceof Error
}

function handlePrismaError(error: PrismaClientError): HandleError {
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

function handleZodError(error: z.ZodError): HandleError {
  const fieldErrors: ZodErrors = {}
  const zodErrors = error.flatten().fieldErrors

  for (const field in zodErrors) {
    if (zodErrors[field] && zodErrors[field] !== undefined) {
      fieldErrors[field] = zodErrors[field]
    }
  }

  return {
    type: 'zodValidation',
    message: 'Validation error.',
    details: fieldErrors,
  }
}

function handleValidationError(error: ValidationError): HandleError {
  return {
    type: error.type,
    message: error.message,
    details: error.details,
  }
}

function handleAuthError(error: AuthError): HandleError {
  switch (error.type) {
    case 'CredentialsSignin':
      return {
        type: 'authenticate',
        message: 'Invalid credentials.',
        details: undefined,
      }
    default:
      return {
        type: 'authenticate',
        message: 'Something went wrong.',
        details: undefined,
      }
  }
}

function handleLastError(error: Error): HandleError {
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

export function paginationError(
  countPages: number | undefined,
  pageParam: number,
) {
  if (countPages && countPages < 1) {
    console.log('PaginationRow data < 1', countPages)
    return null
  }

  if (!Number.isInteger(pageParam) || pageParam < 1) {
    console.log('PaginationRow pageParam error', pageParam)
    return null
  }
}

export type HandleErrorProps =
  | PrismaClientError
  | AuthError
  | z.ZodError
  | ValidationError
  | Error

export type ZodErrors = Record<string, string[]>

type DetailsPrismaError = Record<string, unknown> | undefined

type DetailsUnknownError = string

export type HandleError =
  | {
      type: 'database'
      message: string
      details: DetailsPrismaError | DetailsUnknownError
    }
  | {
      type: 'authenticate'
      message: string
      details: undefined
    }
  | {
      type: 'unknown'
      message: string
      details: string
    }
  | HandleZodError
  | ValidationError

interface HandleZodError {
  type: 'zodValidation'
  message: 'Validation error.'
  details: ZodErrors
}

type PrismaClientError =
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientValidationError
