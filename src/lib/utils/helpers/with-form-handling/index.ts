import { ActionConfig, ActionHandler, ActionResult } from '@/lib/services/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/types'
import { validateFormData } from '@/lib/utils/zod/validate'
import { z } from 'zod'

/**
 * Higher-Order Function (HOF) for centralized form handling.
 * This function automates `FormData` validation with Zod,
 * executes the main asynchronous action (`actionConfig.action`), and provides unified error handling.
 * It's ideally suited for use with React's `useActionState` and Next.js Server Actions.
 *
 * Key principle: It ensures that an action either explicitly returns a `showModal` status for UI (e.g., a modal window),
 * OR it triggers external operations like cache revalidation and redirection, but never both simultaneously.
 * This clear separation is enforced by the `ActionConfig` type.
 *
 * @template T - The type of the Zod schema used for validating the incoming form data.
 *
 * @param  actionConfig - An object that defines the entire configuration for form handling.
 * It includes the Zod schema for validation (`schema`), the main asynchronous action (`action`),
 * and an optional function for update/redirection (`updateAndRedirect`).
 * The `ActionConfig` type guarantees mutually exclusive scenarios:
 * - Either `action` returns `void` AND `updateAndRedirect` is provided (for revalidation/redirection flows).
 * - OR `action` returns `{ status: 'showModal' }` AND `updateAndRedirect` is `undefined` (for UI-specific messages, like modals).
 *
 * @returns  - An action handler function compatible with React's `useActionState`.
 * It returns a `Promise<ActionResult>` which will contain `{ status: 'error', error: ... }` on failure,
 * or `{ status: 'showModal' }` if the `action` explicitly returned it.
 * If `updateAndRedirect` is called, the function's execution will be terminated by `redirect()`,
 * so `withFormHandling` itself does not return an `ActionResult` in that case.
 */
export default function withFormHandling<T extends z.ZodTypeAny>(
  actionConfig: ActionConfig<T>,
): ActionHandler<ActionResult> {
  return async (state, formData) => {
    try {
      // 1. Validate the form data.
      // `validateFormData` throws a `ZodError` on failure, or returns `z.infer<T>` (clean, validated data) on success.
      const validatedData = validateFormData(actionConfig.schema, formData)

      // 2. Execute the main business logic (`actionConfig.action`).
      // `actionConfig.action` receives the validated data (`z.infer<T>`).
      // Its return type (`void` or `{ status: 'showModal' }`) dictates the subsequent flow.
      const actionResult = await actionConfig.action(validatedData)

      // 3. Handle the result of the `action`.
      // If `actionResult` explicitly has a `'showModal'` status, it means the UI (e.g., a modal window)
      // should react to this specific "success" outcome.
      if (actionResult?.status === 'showModal') {
        return { status: 'showModal' } // This is the ONLY place where a UI-specific status is returned.
      }

      // 4. If `actionResult` did not explicitly return `{ status: 'showModal' }` (i.e., it returned `void`),
      // this signifies that follow-up steps (revalidation/redirection) should be executed.
      // According to `ActionConfig`, if `action` is `void`, then `updateAndRedirect` MUST be present.
      // The `updateAndRedirect` logic is intentionally placed AFTER the `try-catch` block to ensure
      // it only runs if no errors occurred during validation or the primary action.
    } catch (error) {
      // Error handling:
      // - Catches `ZodError` thrown by `validateFormData`.
      // - Catches any other errors thrown by `actionConfig.action`.
      return {
        status: 'error',
        error: handleError(error as HandleErrorProps),
      }
    }

    // 5. Execute optional follow-up actions (`actionConfig.updateAndRedirect`).
    // This block runs ONLY if the `try` block completed successfully,
    // AND `action` did NOT return an explicit `{ status: 'showModal' }` (meaning it returned `void`).
    // Due to the discriminated union in `ActionConfig`, TypeScript guarantees that `actionConfig.updateAndRedirect`
    // is defined in this scenario.
    if (actionConfig.updateAndRedirect) {
      await actionConfig.updateAndRedirect(formData)
      // IMPORTANT: When `redirect()` is called inside `updateAndRedirect`,
      // it terminates the current request. Therefore, `withFormHandling` itself
      // will NOT return an `ActionResult` in this specific execution path.
      // The `ActionHandler<ActionResult>` type signature is satisfied by the
      // `return { status: 'error' }` on failure and `return { status: 'showModal' }` for the UI case.
      // The `redirect` case is a special terminal operation that does not require a return from the HOF.
    }
  }
}
