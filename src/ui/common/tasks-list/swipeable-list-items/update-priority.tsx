'use client'

import {
  ListError,
  ListPriorityField,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { TaskListDto } from '@/lib/repositories/prisma/tasks'
import { updateTaskPriority } from '@/lib/services/actions/task'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import LowPriorityIcon from '@mui/icons-material/LowPriority'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { $Enums } from '@prisma/client'
import { useActionState } from 'react'
import HiddenInputs from './hidden-inputs'

export function UpdateTaskPriority({ task }: Props) {
  const [state, formAction, isPending] = useActionState(
    updateTaskPriority,
    undefined,
  )
  const { icon, value } = getIconAndPriorityValue(task.priority)
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
      <HiddenInputs
        dynamicField={{
          name: TextFieldsNameAttributeList.priority,
          value: value,
        }}
        taskId={task.id}
      />
    </form>
  )
}

function getIconAndPriorityValue(priority: $Enums.Priority) {
  const { high, low } = ListPriorityField
  const highStatus = priority === high
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
  task: TaskListDto
}
