'use client'

import { createTask } from '@/lib/actions'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Link from 'next/link'
import { useActionState } from 'react'

export default function CreateForm() {
  const [state, formAction, isPending] = useActionState(createTask, undefined)

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
      <FormControl>
        <FormLabel id='priority-radio-buttons-group-label'>Priority</FormLabel>
        <RadioGroup
          aria-labelledby='priority-radio-buttons-group-label'
          defaultValue='low'
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
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
            Create ...
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
