import { z } from 'zod'

function validateFormData<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData,
): {
  errors: ValidateErrorsProps | null
  data: z.infer<T> | null
} {
  const parsedData: Record<string, string | File | undefined> = {}
  for (const [key, value] of formData.entries()) {
    parsedData[key] = value
  }
  const validatedFields = schema.safeParse(parsedData)

  if (!validatedFields.success) {
    const fieldErrors: ValidateErrorsProps = {}
    const zodErrors = validatedFields.error.flatten().fieldErrors

    for (const field in zodErrors) {
      if (zodErrors[field] && zodErrors[field] !== undefined) {
        fieldErrors[field] = zodErrors[field]
      }
    }
    return { errors: fieldErrors, data: null }
  }

  return { errors: null, data: validatedFields.data }
}

export function validateForm(formData: FormData, updateSchema: z.ZodTypeAny) {
  return validateFormData(updateSchema, formData)
}

export type ValidateErrorsProps = Record<string, string[]>
