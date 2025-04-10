import { Prisma } from '@prisma/client'
import { AuthError } from 'next-auth'
import { ValidateErrorsProps } from '../zod/validate'

export function handleError(error: unknown): HandleErrorProps {
  if (error instanceof Prisma.PrismaClientKnownRequestError)
    return handlePrismaError(error)
  else return handleUnknownError(error)
}

function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError,
): HandlePrismaErrorProps {
  // Handling of known errors Prisma
  switch (error.code) {
    case 'P2002':
      return {
        type: 'database',
        message: 'Such a record already exists.',
        details: error.meta,
      }
    case ' P2001':
      return {
        type: 'database',
        message: 'The record searched does not exist.',
        details: error.meta,
      }
    case 'P2025':
      return {
        type: 'database',
        message: 'The operation failed because no records were found.',
        details: error.meta,
      }
    default:
      return {
        type: 'database',
        message: `Database error. Code: ${error.code}.`,
        details: undefined,
      }
  }
}

export function handleZodError(error: ValidateErrorsProps) {
  return {
    type: 'validation',
    message: 'Validation error.',
    details: error,
  }
}

export function handleAuthError(error: unknown) {
  if (error instanceof AuthError) {
    console.log('error authenticate:', error)

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
  } else throw error
}

function handleUnknownError(error: unknown): HandleUnknownErrorProps {
  if (
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return {
      type: 'database',
      message: 'Database error.',
      details: error.message,
    }
  } else if (error instanceof Error) {
    return {
      type: 'unknown',
      message: 'An unexpected error occurred.',
      details: error.message,
    }
  }
  throw error
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

interface HandlePrismaErrorProps {
  type: string
  message: string
  details: DetailsPrismaErrorProps | undefined
}

interface HandleUnknownErrorProps {
  type: string
  message: string
  details: DetailsUnknownErrorProps
}

export type DetailsPrismaErrorProps = Record<string, unknown> | undefined

export type DetailsUnknownErrorProps = string

export interface HandleErrorProps {
  type: string
  message: string
  details:
    | ValidateErrorsProps
    | DetailsPrismaErrorProps
    | DetailsUnknownErrorProps
}
