import { ActionResult } from '@/lib/services/types'
import { useCallback } from 'react'
import useModal from './use-modal'

/**
 * @function useConfirmDialog
 * @description A custom hook to manage the state of a confirmation dialog
 * and handle an action upon confirmation. It encapsulates the logic for
 * opening/closing the dialog and executing the provided action.
 *
 * @param action - The function (action) to be called
 * after the dialog is confirmed (closed). This function can be synchronous or asynchronous.
 * @returns An object containing:
 * - `open`: The current open state of the dialog (true if open, false if closed).
 * - `openModal`: A function to open the dialog (sets `open` to `true`).
 * - `closeModal`: A function to close the dialog (sets `open` to `false`).
 * - `handleConfirm`: The click handler that closes the dialog and executes the `action`.
 */
export function useConfirmDialog(action: () => void | Promise<ActionResult>) {
  // Destructure the state and control functions from the useModal hook.
  const { open, openModal, closeModal } = useModal()

  // Memoize the handleConfirm function using useCallback.
  // This ensures that the function reference remains stable across renders,
  // preventing unnecessary re-renders of components that use this handler,
  // as long as its dependencies (closeModal and action) don't change.
  const handleConfirm = useCallback(() => {
    closeModal()
    action()
  }, [closeModal, action])

  return {
    open,
    openModal,
    closeModal,
    handleConfirm,
  }
}
