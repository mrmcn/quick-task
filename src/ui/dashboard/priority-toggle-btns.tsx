'use client'

import { ListError, Phrases } from '@/lib/constants/text-const'
import { usePriorityState } from '@/lib/hooks'
import { FetchTaskData, TaskIdData } from '@/lib/services/queries/task'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { Priority } from '@prisma/client'
import { notFound } from 'next/navigation'
import { use } from 'react'

export default function SuspensePriorityToggleBtns({ promise }: SuspenseProps) {
  const { data, error } = promise ? use(promise) : {}

  if (error && error.type !== 'database') notFound()
  const { changePriority, handlePriority } = usePriorityState(data)
  const errorMessage = error ? ListError.noData : null
  const renderIdTask = data ? (
    <input
      type='hidden'
      name='id'
      value={data.id}
    />
  ) : null

  return (
    <>
      <Typography
        variant='caption'
        sx={{ ml: '1vw' }}
      >
        {Phrases.priority}
        {errorMessage}
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
          color='primary'
          value={Priority['low']}
          aria-label='low priority'
        >
          {Phrases.low}
        </ToggleButton>
        <ToggleButton
          color='error'
          value={Priority['high']}
          aria-label='high priority'
        >
          {Phrases.high}
        </ToggleButton>
      </ToggleButtonGroup>
      <input
        type='hidden'
        name='priority'
        value={changePriority}
      />
      {renderIdTask}
    </>
  )
}

interface SuspenseProps {
  promise?: FetchTaskData<TaskIdData>
}
