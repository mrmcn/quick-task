'use client'

import { updateTask } from '@/lib/actions'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { $Enums } from '@prisma/client'
import Link from 'next/link'
import { useActionState } from 'react'

export default function EditTaskForm({ task, id }: EditTaskFormProps) {
  const updateTaskWithId = updateTask.bind(null, id)
  const [state, formAction, isPending] = useActionState(
    updateTaskWithId,
    undefined,
  )
  const { details, priority, status, summary } = task

  return (
    <Container
      component='form'
      action={formAction}
      maxWidth='xs'
      sx={{
        mt: '20vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography
        component='h1'
        variant='h4'
        gutterBottom
        align='center'
      >
        Edit task
      </Typography>
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
      <FormControl>
        <FormLabel id='priority-radio-buttons-group-label'>Priority</FormLabel>
        <RadioGroup
          aria-labelledby='priority-radio-buttons-group-label'
          defaultValue={priority}
          name='priority'
        >
          <FormControlLabel
            value='low'
            control={<Radio />}
            label='low'
          />
          <FormControlLabel
            value='high'
            control={<Radio />}
            label='high'
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id='status-radio-buttons-group-label'>Status</FormLabel>
        <RadioGroup
          aria-labelledby='status-radio-buttons-group-label'
          defaultValue={status}
          name='status'
        >
          <FormControlLabel
            value='completed'
            control={<Radio />}
            label='completed'
          />
          <FormControlLabel
            value='in_progress'
            control={<Radio />}
            label='in_progress'
          />
        </RadioGroup>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ButtonGroup
          variant='text'
          aria-label='Button group'
        >
          <Button
            type='submit'
            name='authorId'
            value='35cc0da1-fc3b-47bc-867a-f4e887485a39'
            loading={isPending}
            loadingPosition='center'
            aria-disabled={isPending}
          >
            Save ...
          </Button>
          <Button
            component={Link}
            href='/dashboard'
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
      {state && (
        <Typography
          component='p'
          variant='h5'
          color='error'
          align='center'
          gutterBottom
          aria-live='polite'
          aria-atomic='true'
        >
          {state}
        </Typography>
      )}
    </Container>
  )
}

interface EditTaskFormProps {
  task: {
    summary: string
    details: string
    priority: $Enums.Priority
    status: $Enums.Status
  }
  id: string
}
