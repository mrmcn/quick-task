'use client'

import { usePasswordVisibility } from '@/lib/hooks'
import TextField, { TextFieldProps } from '@mui/material/TextField'

export default function PasswordTextField({ placeholder }: TextFieldProps) {
  const { input, type } = usePasswordVisibility()

  return (
    <TextField
      label='password'
      id='password'
      type={type}
      name='password'
      placeholder={placeholder}
      required={true}
      margin='dense'
      slotProps={{
        htmlInput: { minLength: 6 },
        input: input,
      }}
    />
  )
}
