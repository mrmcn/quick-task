'use client'

import getLabel from '@/lib/utils/helpers/get-label'
import { useFilterParams } from '@/lib/utils/hooks/use-filter-params'
import { chipsBlock } from '@/ui/dashboard/page/chips-block/styles'
import { ChipContentProps } from '@/ui/dashboard/page/chips-block/types'
import DoneIcon from '@mui/icons-material/Done'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import { useFormStatus } from 'react-dom'

export default function ChipContent({ data, chipConfig }: ChipContentProps) {
  const { handleChange, isActive } = useFilterParams(chipConfig)
  const label = getLabel(isActive, chipConfig, data)

  return (
    <form action={handleChange}>
      <Chip
        component={Button}
        type='submit'
        variant='outlined'
        label={label}
        icon={<GetIcon isActive={isActive} />}
        sx={chipsBlock.chipSx}
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
