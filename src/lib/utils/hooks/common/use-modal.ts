'use client'

import { useCallback, useState } from 'react'

/**
 * @function useModal
 * @description A custom React hook for managing the open/closed state of a modal.
 * It provides an `open` boolean state and `openModal` and `closeModal` functions
 * to programmatically control this state.
 *
 * @param  - The initial state of the modal.
 * Defaults to `false` (modal is closed).
 * @returns  - An object containing:
 * - `open`: The current state of the modal (true if open, false if closed).
 * - `openModal`: A function to open the modal (sets `open` to `true`).
 * - `closeModal`: A function to close the modal (sets `open` to `false`).
 */
export default function useModal(initialValue: boolean = false) {
  // `useState` to store the current open state of the modal.
  const [open, setOpen] = useState(initialValue)

  // `useCallback` to memoize the `openModal` function.
  // This prevents it from being redefined on every render, optimizing performance
  // and preventing unnecessary re-renders of child components that use this function.
  const openModal = useCallback(() => {
    setOpen(true)
  }, []) // No dependencies as the function always sets to `true`.

  // `useCallback` to memoize the `closeModal` function.
  // Similar to `openModal`, this optimizes performance.
  const closeModal = useCallback(() => {
    setOpen(false)
  }, []) // No dependencies as the function always sets to `false`.

  // Return the state and the control functions for the modal.
  return { open, openModal, closeModal }
}
