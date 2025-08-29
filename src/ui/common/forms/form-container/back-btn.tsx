'use client'

import { BtnNamesList } from '@/lib/constants/text-const'
import { sxForms } from '@/ui/common/forms/styles'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

/**
 * The BackButton component provides a button for navigation.
 *
 * It checks the browser's history:
 * - If there are previous pages in the history, it uses `router.back()` to go back.
 * - Otherwise, it redirects the user to the home page (`/`).
 *
 * @returns A React component for a "Back" button.
 */
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
      sx={sxForms.backBtn}
    >
      {BtnNamesList.back}
    </Button>
  )
}
