import { DeleteTaskError } from '@/lib/errors/delete-task-error'
import { ValidationError } from '@/lib/errors/validation-error'
import {
  HandleErrorProps,
  PrismaClientError,
} from '@/lib/utils/error-handling/type'
import { Prisma } from '@prisma/client'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export function isPrismaClientError(
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

export function isAuthError(error: HandleErrorProps): error is AuthError {
  return error instanceof AuthError
}

export function isZodError(error: HandleErrorProps): error is z.ZodError {
  return error instanceof z.ZodError
}
export function isValidateError(
  error: HandleErrorProps,
): error is ValidationError {
  return error instanceof ValidationError
}

export function isDeleteTaskError(
  error: HandleErrorProps,
): error is DeleteTaskError {
  return error instanceof DeleteTaskError
}

export function isError(error: HandleErrorProps): error is Error {
  return error instanceof Error
}
