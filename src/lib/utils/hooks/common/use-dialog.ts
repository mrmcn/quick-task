import { StateProps } from '@/lib/services/actions/user'
import { useState } from 'react'

export default function useDialog(action: () => Promise<StateProps | void>) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleDeleteAccount = () => {
    setOpen(false)
    action()
  }
  return { open, handleClickOpen, handleClose, handleDeleteAccount }
}
