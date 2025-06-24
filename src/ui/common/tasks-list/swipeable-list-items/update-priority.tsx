'use client'

import {
  ListError,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { updateTaskPriority } from '@/lib/services/actions/task'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import { WithTaskProps } from '@/ui/common/tasks-list/types'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import LowPriorityIcon from '@mui/icons-material/LowPriority'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { $Enums, Priority } from '@prisma/client'
import { useActionState } from 'react'

export function UpdateTaskPriority({ task }: WithTaskProps) {
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
        taskId={task.id}
        dynamicField={{
          name: TextFieldsNameAttributeList.priority,
          value: value,
        }}
      />
    </form>
  )
}

function getIconAndPriorityValue(priority: $Enums.Priority) {
  const highStatus = priority === Priority.high
  const icon = highStatus ? (
    <LowPriorityIcon />
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ArrowUpwardIcon sx={{ fontSize: 'small' }} />
      <PriorityHighIcon sx={{ marginLeft: '-8px' }} />
    </Box>
  )
  const value = highStatus ? Priority.low : Priority.high
  return { icon, value }
}
