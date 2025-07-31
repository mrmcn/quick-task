'use client'

import { getLabel } from '@/lib/utils/helpers/get-label'
import { useFilterParams } from '@/lib/utils/hooks/use-filter-params'
import { sxDashboardPage } from '@/ui/dashboard/page/styles'
import { ChipContentProps } from '@/ui/dashboard/page/types'
import DoneIcon from '@mui/icons-material/Done'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import { useFormStatus } from 'react-dom'

/**
 * @function ChipContent
 * @description The main client component for displaying an interactive filter chip.
 * It handles the logic of interacting with URL parameters and displays the visual state of the chip.
 *
 * @param data - Monitoring state data (e.g., task counts).
 * Used to display counters on status chips.
 * @param chipConfig - Configuration for the specific chip (name, filtering parameter, value).
 */
export default function ChipContent({ data, chipConfig }: ChipContentProps) {
  // Use a custom hook to get the filter change function
  // and check if the current chip is active.
  const { handleChange, isActive } = useFilterParams(chipConfig)

  // Generate the text label for the chip, which may include counters.
  const label = getLabel(isActive, chipConfig, data)

  return (
    // The form is used to integrate with Next.js Server Actions and useFormStatus.
    <form action={handleChange}>
      <Chip
        component={Button}
        type='submit'
        variant='outlined'
        label={label}
        icon={<GetIcon isActive={isActive} />}
        sx={sxDashboardPage.chip}
      />
    </form>
  )
}

/**
 * @function GetIcon
 * @description A helper component for displaying the appropriate icon on the chip.
 * It shows a loading indicator during form submission, a checkmark if the chip is active,
 * or nothing otherwise.
 *
 * @param isActive - Indicates whether the current chip is active.
 * @returns The corresponding icon or `undefined`.
 */
function GetIcon({ isActive }: { isActive: boolean }) {
  // Use useFormStatus to track the form submission state.
  const { pending } = useFormStatus()

  // Determine which icon to display.
  const icon = pending ? (
    // If the form is submitting, show a circular progress indicator.
    <CircularProgress
      size={20}
      color='inherit'
      sx={sxDashboardPage.iconChip}
    />
  ) : isActive ? (
    // If the chip is active and the form is not submitting, show a checkmark.
    <DoneIcon sx={sxDashboardPage.iconChip} />
  ) : // Otherwise, display nothing.
  undefined
  return icon
}
