import { DeleteTaskError } from '@/lib/utils/errors/delete-task-error'
import { ValidationError } from '@/lib/utils/errors/validation-error'
import { Prisma } from '@prisma/client'
import { AuthError } from 'next-auth'
import { z } from 'zod'

/**
 * @description A union type representing any possible error that is passed
 * to centralized error handling functions, such as `handleError`.
 * It covers a wide range of errors: from Prisma and Auth.js specific errors,
 * to Zod validation errors, custom validation errors, and general JavaScript `Error` objects.
 */
export type HandleErrorProps =
  | PrismaClientError // Errors related to Prisma ORM
  | AuthError // Errors from NextAuth.js
  | z.ZodError // Validation errors from Zod
  | ValidationError // General custom validation errors
  | DeleteTaskError // Errors specific to task deletion operations
  | Error // Standard JavaScript errors

/**
 * @description A type representing the structure of Zod validation errors,
 * grouped by field names. The object's key is the field name,
 * and the value is an array of strings containing error messages for that field.
 * Used for detailing Zod validation errors.
 */
export type ZodErrors = Record<string, string[]>

/**
 * @description Type for detailed metadata that may accompany Prisma errors.
 * This can be an object with additional context about the database error
 * or `undefined` if no such details are available.
 */
type DetailsPrismaError = Record<string, unknown> | undefined

/**
 * @description Type for details of a general unknown error.
 * Typically, this is a string containing the message from the original error.
 */
type DetailsUnknownError = string

/**
 * @description A union type representing the standardized format of handled errors
 * returned by error handlers. Each variant of this union type defines the structure
 * for different error categories, ensuring consistency when returning errors
 * to the client (API) or for internal logging.
 */
export type HandleError =
  | HandleDBError
  | {
      type: 'authenticate' // Error type related to authentication (e.g., invalid credentials).
      message: string
      details: undefined // For this error type, details are usually not needed or absent.
    }
  | {
      type: 'unknown' // Type for an unrecognized or general error.
      message: string
      details: string // Details are typically the original error message.
    }
  | {
      type: 'delete task' // Error type specific to task deletion operations.
      message: string
      details: undefined // For this error type, details are usually not needed or absent.
    }
  | HandleZodError // Includes the detailed structure for Zod validation errors.
  | ValidationError // Includes the detailed structure for general validation errors.

export interface HandleDBError {
  type: 'database' // Error type related to the database (e.g., Prisma).
  message: string
  details: DetailsPrismaError | DetailsUnknownError
}

/**
 * @description An interface defining the specific structure for handled Zod validation errors.
 * It indicates that a Zod validation error has a clear type (`'zodValidation'`),
 * a standard message, and a `details` object with errors for each field.
 */
export interface HandleZodError {
  type: 'zodValidation'
  message: 'Validation error.'
  details: ZodErrors
}

/**
 * @description A union type encompassing all possible errors that can be generated
 * by the Prisma Client during its operation. This type aggregates various Prisma error classes,
 * allowing them to be handled in a unified manner within the error handling system.
 */
export type PrismaClientError =
  | Prisma.PrismaClientInitializationError // Error occurring during Prisma Client initialization.
  | Prisma.PrismaClientKnownRequestError // A known database request error (e.g., a constraint violation).
  | Prisma.PrismaClientRustPanicError // An internal Rust panic error within the Prisma engine.
  | Prisma.PrismaClientUnknownRequestError // An unknown error originating from the Prisma Client.
  | Prisma.PrismaClientValidationError // A validation error for input data to a Prisma query.
