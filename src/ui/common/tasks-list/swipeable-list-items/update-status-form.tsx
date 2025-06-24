'use client'

import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { updateTaskStatus } from '@/lib/services/actions/task'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import { EditStatusFormProps } from '@/ui/common/tasks-list/types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import { Status } from '@prisma/client'
import { useActionState } from 'react'

export default function UpdateTaskStatus({
  id,
  status,
  title,
}: EditStatusFormProps) {
  const [state, action, pending] = useActionState(updateTaskStatus, undefined)

  if (pending)
    return (
      <CircularProgress
        size={15}
        sx={{ mr: 5, mt: 3, color: 'primary.dark' }}
      />
    )

  if (state?.status === 'error') return <Box>{state.error.message}</Box>
  const value =
    status === Status.completed ? Status.in_progress : Status.completed

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
        checked={status.includes(Status.completed)}
        sx={{ mr: 3 }}
        aria-labelledby={`task-${title}`}
      />
      <HiddenInputs
        taskId={id}
        dynamicField={{
          name: TextFieldsNameAttributeList.status,
          value: value,
        }}
      />
    </form>
  )
}
