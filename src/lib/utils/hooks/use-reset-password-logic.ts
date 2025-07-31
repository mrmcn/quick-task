import { updateUserPassword } from '@/lib/services/actions/user'
import useModal from '@/lib/utils/hooks/common/use-modal'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'

/**
 * @function useResetPasswordLogic
 * @description A custom hook that encapsulates all the logic related to password reset/change.
 * It combines standard React and Next.js hooks to manage form state,
 * modal display, and navigation.
 *
 * @returns An object containing form state, functions for submission and modal control,
 * pending status, and the router object.
 * @property state - The current state returned by the `updateUserPassword` server action.
 * @property formAction - The function to be used as the `action` prop for the `<form>` element.
 * @property isPending - A boolean indicating whether the server action request is currently in progress.
 * @property open - A boolean indicating whether the modal window is currently open.
 * @property closeModal - A function to programmatically close the modal window.
 * @property router - The Next.js router object for programmatic navigation.
 */
export function useResetPasswordLogic() {
  const [state, formAction, isPending] = useActionState(
    updateUserPassword,
    undefined,
  )

  const { open, openModal, closeModal } = useModal()

  const router = useRouter()

  // Conditionally opens the modal window. This logic is moved here from the `ResetPasswordPage` component
  // to further encapsulate related logic in a single place.
  // The modal opens if the server action returns a "showModal" status
  // and the modal is not already open.
  if (state?.status === 'showModal' && open === false) openModal()

  return { state, formAction, isPending, open, closeModal, router }
}
