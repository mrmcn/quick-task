import { ActionProps, StateProps } from '@/lib/services/actions/user'
import { handleError } from '@/lib/utils/error-handling'
import { validateFormData } from '@/lib/zod/validate'
import { z, ZodSchema } from 'zod'

export default function withFormHandling<T extends z.ZodTypeAny>(
  schema: T,
  action: ActionWrapperProps<T>,
  updateAndRedirect: (formData?: FormData) => Promise<never | void>,
): ActionProps<StateProps> {
  return async (state, formData) => {
    const validationResult = validateFormData(schema, formData)

    if (validationResult.errors) {
      return { error: handleError(validationResult.errors) }
    }

    if (validationResult.data) {
      try {
        await action(validationResult.data)
      } catch (error) {
        return { error: handleError(error) }
      }
    }
    await updateAndRedirect(formData)
  }
}

type ActionWrapperProps<T extends ZodSchema> = (
  data: z.infer<T>,
) => Promise<void>
