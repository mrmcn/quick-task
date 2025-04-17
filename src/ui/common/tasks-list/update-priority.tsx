'use client'

import { ListPriorityField, ListTaskField } from '@/lib/constants/text-const'
import { updatePriorityTasks } from '@/lib/services/actions/task'
import { TaskData } from '@/lib/services/queries/task'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import LowPriorityIcon from '@mui/icons-material/LowPriority'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { notFound } from 'next/navigation'
import { useActionState } from 'react'

export function UpdateTaskPriority({ task }: Props) {
  const [state, formAction, isPending] = useActionState(
    updatePriorityTasks,
    undefined,
  )

  if (state?.error) notFound()

  const { id, priority } = ListTaskField
  const { icon, value } = getIconAndPriorityValue(task)

  return (
    <form
      action={formAction}
      style={{ display: 'flex', alignItems: 'stretch' }}
    >
      <Box
        sx={{
          ml: 6,
          width: 48,
          bgcolor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ListItemButton
          component={Button}
          type='submit'
          disabled={isPending}
          sx={{ justifyContent: 'center', height: '100%' }}
        >
          <ListItemIcon sx={{ minWidth: 'auto', mr: 0 }}>{icon}</ListItemIcon>
        </ListItemButton>
      </Box>
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
    <LowPriorityIcon color='secondary' />
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ArrowUpwardIcon
        color='secondary'
        sx={{ fontSize: 'small' }}
      />
      <PriorityHighIcon
        color='secondary'
        sx={{ marginLeft: '-8px' }}
      />
    </Box>
  )
  const value = highStatus ? low : high
  return { icon, value }
}

interface Props {
  task: TaskData
}
