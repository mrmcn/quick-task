import {
  HandleErrorProps,
  PrismaClientError,
} from '@/lib/utils/error-handling/type'
import { DeleteTaskError } from '@/lib/utils/errors/delete-task-error'
import { ValidationError } from '@/lib/utils/errors/validation-error'
import { Prisma } from '@prisma/client'
import { AuthError } from 'next-auth'
import { z } from 'zod'

/**
 * @function isPrismaClientError
 * @description A type guard that checks if the provided object is a Prisma client error.
 * It identifies various types of errors that can occur during database interactions via Prisma.
 *
 * @param  error - The error object to check.
 * @returns  - `true` if the error is an instance of one of the Prisma Client error classes,
 * which allows TypeScript to narrow its type to `PrismaClientError`.
 */
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

/**
 * @function isAuthError
 * @description A type guard that checks if the provided object is an authentication error.
 * This function specifically identifies errors originating from the **Auth.js (NextAuth.js)** library.
 *
 * @param  error - The error object to check.
 * @returns  - `true` if the error is an instance of `AuthError`,
 * which allows TypeScript to narrow its type.
 */
export function isAuthError(error: HandleErrorProps): error is AuthError {
  return error instanceof AuthError
}

/**
 * @function isZodError
 * @description A type guard that checks if the provided object is a Zod validation error.
 * Zod is used for defining and validating data schemas.
 *
 * @param  error - The error object to check.
 * @returns  - `true` if the error is an instance of `z.ZodError`,
 * which allows TypeScript to narrow its type.
 */
export function isZodError(error: HandleErrorProps): error is z.ZodError {
  return error instanceof z.ZodError
}

/**
 * @function isValidateError
 * @description A type guard that checks if the provided object is a general validation error.
 * This applies to custom validation errors that are not specific to Zod.
 *
 * @param error - The error object to check.
 * @returns - `true` if the error is an instance of `ValidationError`,
 * which allows TypeScript to narrow its type.
 */
export function isValidateError(
  error: HandleErrorProps,
): error is ValidationError {
  return error instanceof ValidationError
}

/**
 * @function isDeleteTaskError
 * @description A type guard that checks if the provided object is an error
 * specific to task deletion operations.
 *
 * @param  error - The error object to check.
 * @returns - `true` if the error is an instance of `DeleteTaskError`,
 * which allows TypeScript to narrow its type.
 */
export function isDeleteTaskError(
  error: HandleErrorProps,
): error is DeleteTaskError {
  return error instanceof DeleteTaskError
}

/**
 * @function isError
 * @description A type guard that checks if the provided object is a basic `Error` instance.
 * This function acts as a general "fallback" for standard JavaScript errors
 * that don't fall into more specific categories.
 *
 * @param  error - The error object to check.
 * @returns  - `true` if the error is an instance of `Error`,
 * which allows TypeScript to narrow its type.
 */
export function isError(error: HandleErrorProps): error is Error {
  return error instanceof Error
}
