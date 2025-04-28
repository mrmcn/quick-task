'use client'

import { ListStatusField, ListTaskField } from '@/lib/constants/text-const'
import { updateStatusTasks } from '@/lib/services/actions/task'
import { TaskData } from '@/lib/services/queries/task'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import { useActionState } from 'react'

export default function UpdateTaskStatus({
  id,
  status,
  title,
}: EditStatusFormProps) {
  const [state, action, pending] = useActionState(updateStatusTasks, undefined)

  if (pending)
    return (
      <CircularProgress
        size={15}
        sx={{ mr: 5, mt: 3, color: 'primary.dark' }}
      />
    )

  if (state?.error.message) return <Box>{state.error.message}</Box>
  const { completed, in_progress } = ListStatusField
  const value = status === completed ? in_progress : completed

  return (
    <form
      action={action}
      style={{
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <Checkbox
        onChange={(e) => {
          e.preventDefault()
          e.currentTarget.form?.requestSubmit()
        }}
        edge='end'
        checked={status.includes(completed)}
        sx={{ mr: 3 }}
        aria-labelledby={`task-${title}`}
      />
      <input
        type='hidden'
        name={ListTaskField.id}
        value={id}
      />
      <input
        type='hidden'
        name={ListTaskField.status}
        value={value}
      />
    </form>
  )
}

type EditStatusFormProps = Omit<TaskData, 'priority' | 'details'>
