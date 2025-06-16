'use client'

import {
  ListStatusField,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { updateTaskStatus } from '@/lib/services/actions/task'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import { Task } from '@prisma/client'
import { useActionState } from 'react'
import HiddenInputs from './hidden-inputs'

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
      <HiddenInputs
        dynamicField={{
          name: TextFieldsNameAttributeList.status,
          value: value,
        }}
        taskId={id}
      />
    </form>
  )
}

type EditStatusFormProps = Pick<Task, 'id' | 'status' | 'title'>
