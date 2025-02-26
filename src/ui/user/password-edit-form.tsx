'use client'

import { updatePassword } from '@/lib/actions'
import { usePasswordVisibility } from '@/lib/hooks'
import TextField from '@mui/material/TextField'
import FormWrapper from '../common/form-wrapper'

export default function PasswordEditingForm() {
  const { input, type } = usePasswordVisibility()

  return (
    <FormWrapper
      fn={updatePassword}
      formName='Reset password'
    >
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
