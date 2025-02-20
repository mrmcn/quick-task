'use client'

import { deleteTask } from '@/lib/actions'
import { useTaskForm } from '@/lib/hooks'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { $Enums } from '@prisma/client'
import Link from 'next/link'

export default function TaskForm({ task }: { task: TaskFormProps | null }) {
  const { changePriority, handlePriority, state, formAction, isPending } =
    useTaskForm(task)

  return (
    <Container
      component='form'
      action={formAction}
      maxWidth='xs'
      sx={{
        mt: { xs: '10vh', sm: '20vh' },
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
        {task?.id ? 'Edit' : 'Create'} task
      </Typography>
      <TextField
        label='Title'
        id='summary'
        type='text'
        name='summary'
        placeholder='Enter title'
        defaultValue={task?.summary}
        required
        margin='dense'
      />
      <TextField
        label='Details'
        id='details'
        type='text'
        name='details'
        placeholder='Enter details'
        defaultValue={task?.details}
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
          value={task.id}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '2vh',
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
            {task?.id ? 'Save ...' : 'Create ...'}
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
      {task?.id && (
        <Button
          onClick={() => deleteTask(task.id)}
          sx={{ mt: '4vh' }}
        >
          Delete task
        </Button>
      )}
    </Container>
  )
}

export interface TaskFormProps {
  id: string
  summary: string
  details: string
  priority: $Enums.Priority
}
