'use client'

import { useCallback, useState } from 'react'

export default function useModal(initialValue: boolean = false) {
  const [open, setOpen] = useState(initialValue)
  const openModal = useCallback(() => {
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  return { open, openModal, closeModal }
}
