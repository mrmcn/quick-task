'use client'

import {
  ListError,
  ListPriorityField,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { updatePriorityTasks } from '@/lib/services/actions/task'
import { TaskData } from '@/lib/services/queries/task'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import LowPriorityIcon from '@mui/icons-material/LowPriority'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useActionState } from 'react'

export function UpdateTaskPriority({ task }: Props) {
  const [state, formAction, isPending] = useActionState(
    updatePriorityTasks,
    undefined,
  )
  const { id, priority } = TextFieldsNameAttributeList
  const { icon, value } = getIconAndPriorityValue(task)
  const errorMessage =
    state?.status === 'error' ? (
      <Typography
        variant='caption'
        color='error'
      >
        {ListError.failed}
      </Typography>
    ) : null

  return (
    <form
      action={formAction}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 48,
          bgcolor: 'primary.light',
        }}
      >
        <IconButton
          type='submit'
          disabled={isPending}
          sx={{
            color: 'secondary.main',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {icon}
        </IconButton>
      </Box>
      {errorMessage}
      <input
        type='hidden'
        name={priority}
        value={value}
      />
      <input
        type='hidden'
        name={id}
        value={task.id}
      />
    </form>
  )
}

function getIconAndPriorityValue(task: TaskData) {
  const { high, low } = ListPriorityField
  const highStatus = task.priority === high
  const icon = highStatus ? (
    <LowPriorityIcon />
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ArrowUpwardIcon sx={{ fontSize: 'small' }} />
      <PriorityHighIcon sx={{ marginLeft: '-8px' }} />
    </Box>
  )
  const value = highStatus ? low : high
  return { icon, value }
}

interface Props {
  task: TaskData
}
