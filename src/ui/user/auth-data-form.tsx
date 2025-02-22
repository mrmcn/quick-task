'use client'

import { updateAuthData } from '@/lib/actions'
import { usePasswordVisibility } from '@/lib/hooks'
import TextField from '@mui/material/TextField'
import FormWrapper from '../common/form-wrapper'

export default function AuthDataForm({ email }: { email: string }) {
  const { input, type } = usePasswordVisibility()

  return (
    <FormWrapper
      fn={updateAuthData}
      formName='Edit email & password'
      btnName='Save'
    >
      <TextField
        autoFocus
        defaultValue={email}
        label='Email'
        type='text'
        name='email'
        required
        fullWidth
        margin='dense'
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />
      <TextField
        label='password'
        type={type}
        name='password'
        required
        fullWidth
        margin='dense'
        slotProps={{
          htmlInput: { minLength: 6 },
          input: input,
          inputLabel: { shrink: true },
        }}
      />
    </FormWrapper>
  )
}
