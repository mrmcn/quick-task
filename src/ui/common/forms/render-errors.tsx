import { ActionResult } from '@/lib/services/types'
import {
  renderValidationErrors,
  renderZodErrors,
} from '@/lib/utils/helpers/renderErrors'

/**
 * The **RenderErrors** component is responsible for conditionally displaying error messages
 * for a form, based on the `ActionResult` state after a server action is performed.
 * It differentiates between various error types (Zod validation, general validation errors)
 * and renders them accordingly.
 *
 * @param  state - The state object containing the result of the last server action.
 * It is checked for an 'error' status to display messages.
 *
 * @returns A JSX element with error messages, or `null` if no errors are present.
 */
export default function RenderErrors({ state }: { state: ActionResult }) {
  // Check if the state indicates an error
  if (state?.status === 'error') {
    // If the error type is Zod validation, render detailed field-specific errors
    if (state.error.type === 'zodValidation') {
      return renderZodErrors(state.error.details)
    }
    // If the error type is general validation, render a general message
    if (state.error.type === 'validation') {
      return renderValidationErrors(state.error.message)
    }
  }
  // If no errors are present or the state is not an error, render nothing
  return null
}
