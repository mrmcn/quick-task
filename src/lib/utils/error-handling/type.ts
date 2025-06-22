import { ValidationError } from '@/lib/errors/validation-error'
import { Prisma } from '@prisma/client'
import { AuthError } from 'next-auth'
import { z } from 'zod'

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

export type PrismaClientError =
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientValidationError
