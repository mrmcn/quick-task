import { Prisma } from '@prisma/client'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export function handleError(error: unknown): HandleErrorProps {
  switch (true) {
    case error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError ||
      error instanceof Prisma.PrismaClientRustPanicError ||
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientValidationError:
      return handlePrismaError(error as PrismaClientError)
    case error instanceof AuthError:
      return handleAuthError(error)
    case error instanceof z.ZodError:
      return handleZodError(error)
    case typeof error === 'string':
      return handlePasswordValidationError(error)
    case error instanceof Error:
      if (error.message === 'NEXT_REDIRECT') {
        throw error
      } else {
        return {
          type: error.name,
          message: error.message,
          details: undefined,
        }
      }
    default:
      throw error
  }
}

function handlePrismaError(error: PrismaClientError): HandleErrorProps {
  // Handling of known errors Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
  } else {
    return {
      type: 'database',
      message: 'Database error.',
      details: error.message,
    }
  }
}

export function handleZodError(error: z.ZodError): HandleErrorProps {
  const fieldErrors: ValidateErrorsProps = {}
  const zodErrors = error.flatten().fieldErrors

  for (const field in zodErrors) {
    if (zodErrors[field] && zodErrors[field] !== undefined) {
      fieldErrors[field] = zodErrors[field]
    }
  }

  return {
    type: 'validation',
    message: 'Validation error.',
    details: fieldErrors,
  }
}

export function handleAuthError(error: unknown): HandleErrorProps {
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

function handlePasswordValidationError(error: string): HandleErrorProps {
  return {
    type: 'passwordValidation',
    message: error,
    details: undefined,
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

export type ValidateErrorsProps = Record<string, string[]>

export type DetailsPrismaErrorProps = Record<string, unknown> | undefined

export type DetailsUnknownErrorProps = string

export type HandleErrorProps =
  | {
      type: 'database'
      message: string
      details: DetailsPrismaErrorProps
    }
  | {
      type: 'database'
      message: string
      details: DetailsUnknownErrorProps
    }
  | {
      type: 'authenticate' | string
      message: string
      details: string | undefined
    }
  | HandleZodError
  | HandlePasswordValidationErrorProps

export interface HandleZodError {
  type: 'validation'
  message: 'Validation error.'
  details: ValidateErrorsProps
}

export interface HandlePasswordValidationErrorProps {
  type: 'passwordValidation'
  message: string
  details: undefined
}

type PrismaClientError =
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientValidationError
