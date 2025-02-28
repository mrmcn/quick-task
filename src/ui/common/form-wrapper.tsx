'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Fab from '@mui/material/Fab'
import Typography from '@mui/material/Typography'
import { useActionState } from 'react'

export default function FormWrapper({
  fn,
  children,
  formName,
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
      {state?.massage && (
        <Typography
          component='p'
          variant='h5'
          color='error'
          align='center'
          gutterBottom
          aria-live='polite'
          aria-atomic='true'
        >
          {state.massage}
        </Typography>
      )}
      <Box
        sx={{
          '& > :not(style)': {
            position: 'fixed',
            top: '85%',
            left: '70%',
          },
        }}
      >
        <Fab
          component={Button}
          variant='extended'
          type='submit'
          color='primary'
          aria-label='add'
          loading={isPending}
          aria-disabled={isPending}
        >
          Save
        </Fab>
      </Box>
    </Container>
  )
}

interface fnProps {
  (prevState: any, formData: FormData): Promise<
    | {
        massage: string
        message?: undefined
      }
    | {
        message: string
        massage?: undefined
      }
  >
}

interface FormWrapperProps {
  fn: fnProps
  children: React.ReactNode
  formName: string
}
