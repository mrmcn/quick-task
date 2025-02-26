'use client'

import { createUser } from '@/lib/actions'
import { usePasswordVisibility } from '@/lib/hooks'
import TextField from '@mui/material/TextField'
import FormWrapper from '../common/form-wrapper'

export default function SignupForm() {
  const { input, type } = usePasswordVisibility()

  return (
    <FormWrapper
      fn={createUser}
      formName='Please create account to continue.'
    >
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
    </FormWrapper>
  )
}
