'use client'

import { useTaskForm } from '@/lib/hooks'
import * as taskService from '@/lib/services/actions/task-service'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { $Enums } from '@prisma/client'
import FormWrapperWithAction from '../common/form-wrapper/with-action'

// edit & create form

export default function TaskForm({ task }: { task: TaskFormProps | null }) {
  const {
    changePriority,
    handlePriority,
    action, // server Action function
    formName, // form title
    id, // taskId
    summary, // task title
    details, // task details
  } = useTaskForm(task)

  return (
    <>
      <FormWrapperWithAction
        action={action}
        formName={formName}
      >
        <TextField
          label='Title'
          id='summary'
          type='text'
          name='summary'
          defaultValue={summary}
          required
          margin='dense'
        />
        <TextField
          label='Details'
          id='details'
          type='text'
          name='details'
          defaultValue={details}
          multiline
          rows={4}
          required
          margin='dense'
        />
        <Typography
          variant='caption'
          sx={{ ml: '1vw' }}
        >
          Priority
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
            value='low'
            aria-label='low priority'
          >
            low
          </ToggleButton>
          <ToggleButton
            color='error'
            value='high'
            aria-label='high priority'
          >
            high
          </ToggleButton>
        </ToggleButtonGroup>
        <input
          type='hidden'
          name='priority'
          value={changePriority}
        />
        {task?.id && (
          <input
            type='hidden'
            name='id'
            value={id}
          />
        )}
      </FormWrapperWithAction>
      {task?.id && (
        <Button
          color='error'
          onClick={() => taskService.deleteTask(task?.id)}
        >
          Delete task
        </Button>
      )}
    </>
  )
}

export interface TaskFormProps {
  id: string
  summary: string
  details: string
  priority: $Enums.Priority
}
