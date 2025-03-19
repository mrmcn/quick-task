'use client'

import { ListTextFieldLabel } from '@/lib/constants/text-const'
import { usePasswordVisibility } from '@/lib/hooks'
import { TextField, TextFieldProps } from '@mui/material'

export default function PasswordTextField({ placeholder }: TextFieldProps) {
  const { input, type } = usePasswordVisibility()

  return (
    <TextField
      label={ListTextFieldLabel.password}
      type={type}
      name='password'
      id='password'
      required
      placeholder={placeholder}
      margin='dense'
      slotProps={{
        htmlInput: { minLength: 6 },
        input: input,
      }}
    />
  )
}
