/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useActionState } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'

export default function EditForm({
  type,
  updateUser,
  name,
  placeholder,
}: EditForm) {
  const [state, formActionName, isPending] = useActionState(
    updateUser,
    undefined,
  )

  return (
    <Box
      component='form'
      action={formActionName}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <TextField
        label={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required
        fullWidth
        margin='dense'
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

type updateUserProps = (prevState: any, formData: FormData) => Promise<string>

interface EditForm {
  type: string
  updateUser: updateUserProps
  name: string
  placeholder: string
}
