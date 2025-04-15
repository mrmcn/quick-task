'use client'

import { ListBtnNames } from '@/lib/constants/text-const'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <Button
      onClick={handleBack}
      sx={{ mt: 2, color: 'secondary.main' }}
    >
      {ListBtnNames.back}
    </Button>
  )
}
