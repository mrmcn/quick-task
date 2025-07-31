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
  // Get the Next.js router instance for programmatic navigation.
  const router = useRouter()

  /**
   * Click handler for the "Back" button.
   * Dynamically determines where to redirect the user.
   */
  const handleBack = () => {
    // Check if there's more than one entry in the browser history.
    // (Current page + at least one previous page).
    if (window.history.length > 1) {
      // If there are previous pages, go back in history.
      router.back()
    } else {
      // If there are no previous pages (or the user landed directly),
      // redirect to the home page.
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
