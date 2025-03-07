'use client'

import * as taskService from '@/lib/services/actions/task-service'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import { useActionState } from 'react'
import { TasksListProps } from './tasks-list'

export default function EditStatusForm({
  id,
  status,
  summary,
}: EditStatusFormProps) {
  const [state, action, pending] = useActionState(
    taskService.updateStatusTasks,
    undefined,
  )

  if (pending)
    return (
      <CircularProgress
        size={15}
        sx={{ mr: 3 }}
      />
    )
  if (state?.message) return <Box>{state.message}</Box>

  return (
    <>
      <Box
        component='form'
        action={action}
      >
        <Checkbox
          onChange={(e) => {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
          }}
          edge='end'
          checked={status.includes('completed')}
          sx={{ mr: 1, ml: 2 }}
          inputProps={{ 'aria-labelledby': summary }}
        />
        <input
          type='hidden'
          name='id'
          value={id}
        />
        <input
          type='hidden'
          name='status'
          value={status === 'completed' ? 'in_progress' : 'completed'}
        />
      </Box>
    </>
  )
}

type EditStatusFormProps = Omit<TasksListProps, 'priority' | 'details'>
