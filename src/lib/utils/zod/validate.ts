import { InputData } from '@/lib/utils/zod/types'
import { z } from 'zod'

/**
 * Validates a FormData object against a provided Zod schema.
 * This function is designed for Server Actions that receive data directly from HTML forms.
 * It transforms the FormData into a plain object and performs a safe validation.
 *
 * @template T - The type of the Zod schema used for data validation.
 * @param  schema - The Zod schema for validating the incoming FormData.
 * @see 'src/lib/zod/schema'
 * @param  formData - The FormData object containing the data to be validated.
 * @returns  Validated and type-inferred data if the validation is successful.
 * @throws  Throws a ZodError if the validation fails.
 */
export function validateFormData<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData,
): z.infer<T> {
  const parsedData: Record<string, string | File | undefined> = {}
  for (const [key, value] of formData.entries()) {
    parsedData[key] = value
  }
  const validatedFields = schema.safeParse(parsedData)

  if (!validatedFields.success) throw validatedFields.error

  return validatedFields.data
}

/**
 * Validates an arbitrary data object (inputData) against a provided Zod schema.
 * This function is useful for validating data that does not originate directly from FormData
 * (e.g., URL parameters, JSON request bodies, or internal objects).
 *
 * @template T - The type of the Zod schema used for data validation.
 * @param inputData - The data object to be validated.
 * @param  schema - The Zod schema for validating the incoming object.
 * @see 'src/lib/zod/schema'
 * @returns  Validated and type-inferred data if the validation is successful.
 * @throws  Throws a ZodError if the validation fails.
 */
export function validateData<T extends z.ZodSchema>(
  inputData: InputData,
  schema: T,
): z.infer<T> {
  const parsedResult = schema.safeParse(inputData)

  if (parsedResult.success) return parsedResult.data

  throw parsedResult.error
}
