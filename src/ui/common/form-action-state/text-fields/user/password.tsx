'use client'

import { ListLabelName } from '@/lib/constants/text-const'
import { usePasswordVisibility } from '@/lib/utils/hooks/use-password-visibility'
import { TextField, TextFieldProps } from '@mui/material'

export default function PasswordTextField({ placeholder }: TextFieldProps) {
  const { visibilityToggle, type } = usePasswordVisibility()

  return (
    <TextField
      label={ListLabelName.password}
      type={type}
      name='password'
      id='password'
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
