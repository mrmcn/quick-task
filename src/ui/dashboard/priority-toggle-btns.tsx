'use client'

import { ListPhrases } from '@/lib/constants/text-const'
import { usePriorityState } from '@/lib/hooks'
import { TaskId } from '@/lib/services/queries/task'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { Priority } from '@prisma/client'

export default function PriorityToggleBtns({ data }: Props) {
  const { changePriority, handlePriority } = usePriorityState(data)

  return (
    <>
      <Typography
        variant='caption'
        sx={{ ml: '1vw' }}
      >
        {ListPhrases.priority}
      </Typography>
      <ToggleButtonGroup
        size='small'
        value={changePriority}
        fullWidth
        exclusive
        onChange={handlePriority}
        aria-label='priority selection buttons'
      >
        <ToggleButton
          color='secondary'
          value={Priority['low']}
          aria-label='low priority'
        >
          {ListPhrases.low}
        </ToggleButton>
        <ToggleButton
          color='error'
          value={Priority['high']}
          aria-label='high priority'
        >
          {ListPhrases.high}
        </ToggleButton>
      </ToggleButtonGroup>
      <input
        type='hidden'
        name='priority'
        value={changePriority}
      />
    </>
  )
}

interface Props {
  data?: TaskId
}
