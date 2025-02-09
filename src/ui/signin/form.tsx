'use client'

import { authenticate } from '@/lib/actions'
import { useVisibility } from '@/lib/hooks'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

export default function SigninForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  )
  const { input, type } = useVisibility()

  return (
    <>
      <h1>Login page</h1>
      <nav>
        <div>
          <Link href='/'>home</Link>
        </div>
        <div>
          <Link href='/sample'>sample</Link>
        </div>
        <div>
          <Link href='/dashboard'>dashboard</Link>
        </div>
      </nav>
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
          variant='h5'
          gutterBottom
          align='center'
        >
          Please sign in to continue.
        </Typography>
        <TextField
          label='email'
          id='email'
          type='email'
          name='email'
          placeholder='Enter your email address'
          required
          margin='dense'
        />
        <TextField
          label='password'
          id='password'
          type={type}
          name='password'
          placeholder='Enter password'
          required
          margin='dense'
          slotProps={{
            htmlInput: { minLength: 6 },
            input: input,
          }}
        />
        <Button
          type='submit'
          name='redirectTo'
          value={callbackUrl}
          disabled={isPending}
          aria-disabled={isPending}
        >
          Sign in ...
        </Button>
        {errorMessage && (
          <Typography
            component='p'
            variant='h5'
            color='error'
            align='center'
            gutterBottom
            aria-live='polite'
            aria-atomic='true'
          >
            {errorMessage}
          </Typography>
        )}
      </Container>
    </>
  )
}
