'use client'

import { createTask } from '@/lib/actions'
import { useChoosingPriority } from '@/lib/hooks'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useActionState } from 'react'

export default function CreateForm() {
  const [state, formAction, isPending] = useActionState(createTask, undefined)
  const { changePriority, handleAlignment } = useChoosingPriority('low')

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
        Create new task
      </Typography>
      <TextField
        label='Title'
        id='summary'
        type='text'
        name='summary'
        placeholder='Enter title'
        required
        margin='dense'
      />
      <TextField
        label='Details'
        id='details'
        type='text'
        name='details'
        placeholder='Enter details'
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
        onChange={handleAlignment}
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
            Create ...
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
