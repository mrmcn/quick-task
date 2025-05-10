'use client'

import { usePasswordVisibility } from '@/lib/utils/hooks/use-password-visibility'
import { TextField, TextFieldProps } from '@mui/material'

export default function PasswordTextField({
  placeholder,
  label,
  name,
}: TextFieldProps) {
  const { visibilityToggle, type } = usePasswordVisibility()

  return (
    <TextField
      label={label}
      type={type}
      name={name}
      id={name}
      required
      placeholder={placeholder}
      margin='dense'
      slotProps={{
        htmlInput: { minLength: 6 },
        input: { endAdornment: visibilityToggle },
      }}
    />
  )
}
