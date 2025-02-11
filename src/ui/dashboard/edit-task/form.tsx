'use client'

import { updateTask } from '@/lib/actions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { $Enums } from '@prisma/client'
import Link from 'next/link'
import { useActionState } from 'react'

export default function EditTaskForm({ task }: EditTaskFormProps) {
  const [state, formAction, isPending] = useActionState(updateTask, undefined)
  const { id, details, priority, status, summary } = task

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
      <input
        type='hidden'
        name='taskId'
        value={id}
      />
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
            loading={isPending}
            loadingPosition='center'
            aria-disabled={isPending}
          >
            Save ...
          </Button>
          <Button
            component={Link}
            href='/dashboard'
            loading={isPending}
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
    id: string
    summary: string
    details: string
    priority: $Enums.Priority
    status: $Enums.Status
  }
}
