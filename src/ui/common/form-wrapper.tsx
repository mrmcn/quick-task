'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useActionState } from 'react'

export default function FormWrapper({
  fn,
  children,
  formName,
  btnName,
}: FormWrapperProps) {
  const [state, formAction, isPending] = useActionState(fn, undefined)

  return (
    <Container
      component='form'
      action={formAction}
      maxWidth='xs'
      sx={{
        mt: { xs: '10vh', sm: '15vh' },
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
        {formName}
      </Typography>
      {children}
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
      <Button
        type='submit'
        loading={isPending}
        aria-disabled={isPending}
        sx={{ mt: '4vh' }}
      >
        {btnName}
      </Button>
    </Container>
  )
}

interface fnProps {
  (prevState: any, formData: FormData):
    | Promise<string>
    | Promise<'Invalid credentials.' | 'Something went wrong.' | undefined>
}

interface FormWrapperProps {
  fn: fnProps
  children: React.ReactNode
  formName: string
  btnName: string
}
