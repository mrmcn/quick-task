'use client'

import { deleteTask } from '@/lib/actions'
import { useTaskForm } from '@/lib/hooks'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { $Enums } from '@prisma/client'
import FormWrapper from '../common/form-wrapper'

// edit & create form

export default function TaskForm({ task }: { task: TaskFormProps | null }) {
  const {
    changePriority,
    handlePriority,
    action,
    formName,
    btnName,
    id,
    summary,
    details,
  } = useTaskForm(task)

  return (
    <>
      <FormWrapper
        fn={action}
        formName={formName}
        btnName={btnName}
      >
        <TextField
          label='Title'
          id='summary'
          type='text'
          name='summary'
          placeholder='Enter title'
          defaultValue={summary}
          required
          margin='dense'
        />
        <TextField
          label='Details'
          id='details'
          type='text'
          name='details'
          placeholder='Enter details'
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
            name='taskId'
            value={id}
          />
        )}
      </FormWrapper>
      {task?.id && (
        <Button
          color='error'
          onClick={() => deleteTask(task?.id)}
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
