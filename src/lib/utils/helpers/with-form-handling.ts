import { ActionProps, StateProps } from '@/lib/services/actions/types'
import { handleError } from '@/lib/utils/error-handling'
import { validateFormData } from '@/lib/zod/validate'
import { z, ZodSchema } from 'zod'
import { HandleErrorProps } from '../error-handling/type'

export default function withFormHandling<T extends z.ZodTypeAny>(
  schema: T,
  action: ActionWrapperProps<T>,
  updateAndRedirect?: (formData?: FormData) => Promise<never | void>,
): ActionProps<StateProps> {
  return async (state, formData) => {
    const validationResult = validateFormData(schema, formData)

    if (validationResult.errors) {
      return { status: 'error', error: handleError(validationResult.errors) }
    }

    if (validationResult.data) {
      try {
        const vas = await action(validationResult.data)
        if (vas?.status === 'success') return { status: 'success' }
      } catch (error) {
        return {
          status: 'error',
          error: handleError(error as HandleErrorProps),
        }
      }
    }
    if (updateAndRedirect) await updateAndRedirect(formData)
  }
}

type ActionWrapperProps<T extends ZodSchema> = (
  data: z.infer<T>,
) => Promise<void | { status: 'success' }>
