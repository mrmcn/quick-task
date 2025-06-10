'use client'

import {
  ListChipNamesValue,
  ListSearchParameter,
  ListSearchParameterValue,
} from '@/lib/constants/text-const'
import { MonitoringStatesProps } from '@/lib/services/queries/task'
import { useFilterParams } from '@/lib/utils/hooks/use-filter-params'
import DoneIcon from '@mui/icons-material/Done'
import { Button, CircularProgress } from '@mui/material'
import Chip from '@mui/material/Chip'
import { Priority, Status } from '@prisma/client'
import { useFormStatus } from 'react-dom'

export function TaskParamChip({
  chipName,
  filterValue,
  filteringParam,
  data,
}: Props) {
  const { handleChange, isActive } = useFilterParams(
    filterValue,
    filteringParam,
  )

  const number =
    isActive && data && filteringParam === ListSearchParameter.status
      ? data[filterValue as keyof MonitoringStatesProps]
      : ''

  return (
    // We wrap the Chip in a form to utilize the useFormStatus hook.
    // This allows us to track the form submission state when the Chip is clicked.
    <form action={handleChange}>
      <Chip
        component={Button}
        type='submit'
        variant='outlined'
        label={`${chipName} ${number}`}
        icon={<GetIcon isActive={isActive} />}
        sx={{
          width: { md: 125 },
          '& .MuiChip-label': {
            textTransform: 'none', // This overrides the automatic text transformation (e.g., uppercase) that might be applied by the Button component's styles.
            fontWeight: 'normal', // This sets the font weight to normal, overriding any bolding that might be inherited from the Button component's styles.
          },
        }}
      />
    </form>
  )
}

function GetIcon({ isActive }: { isActive: boolean }) {
  const { pending } = useFormStatus()
  const icon = pending ? (
    <CircularProgress
      size={20}
      color='inherit'
      sx={{ ml: 1 }}
    />
  ) : isActive ? (
    <DoneIcon sx={{ ml: 1 }} />
  ) : undefined
  return icon
}

interface Props {
  chipName: ListChipNamesValue
  filterValue: Status | Priority
  filteringParam: ListSearchParameterValue
  data?: MonitoringStatesProps
}
