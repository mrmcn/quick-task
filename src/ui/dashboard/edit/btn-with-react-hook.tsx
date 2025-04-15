'use client'

import { ListBtnNames } from '@/lib/constants/text-const'
import Button from '@mui/material/Button'
import { useFormStatus } from 'react-dom'

export default function BtnWithUseFormStatus() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      color='error'
      disabled={pending}
    >
      {ListBtnNames.deleteTask}
    </Button>
  )
}
