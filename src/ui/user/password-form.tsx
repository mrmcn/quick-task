'use client'

import { updateUserPassword } from '@/lib/actions'
import { useVisibility } from '@/lib/hooks'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useActionState } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'

export default function PasswordForm() {
  const [state, formActionPassword, isPending] = useActionState(
    updateUserPassword,
    undefined,
  )
  const { input, type } = useVisibility()

  return (
    <Box
      component='form'
      action={formActionPassword}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <TextField
        label='password'
        id='password'
        type={type}
        name='password'
        placeholder='Enter password'
        required
        margin='dense'
        fullWidth
        slotProps={{
          htmlInput: { minLength: 6 },
          input: input,
        }}
      />
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
      <ButtonGroup
        variant='text'
        fullWidth
        size='small'
        sx={{ mt: '2vh' }}
        aria-label='Button group'
      >
        <Button
          type='submit'
          name='redirectTo'
          disabled={isPending}
          aria-disabled={isPending}
        >
          Save
        </Button>
        <Button
          component={Link}
          href='/dashboard'
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Box>
  )
}
