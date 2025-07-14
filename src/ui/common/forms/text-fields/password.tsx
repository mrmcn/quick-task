'use client'

import { usePasswordVisibility } from '@/lib/utils/hooks/use-password-visibility'
import { MyTextFieldProps } from '@/ui/common/forms/text-fields/types'
import { TextField } from '@mui/material'

export default function PasswordTextField(props: MyTextFieldProps) {
  const { visibilityToggle, type } = usePasswordVisibility()

  return (
    <TextField
      type={type}
      required
      slotProps={{
        htmlInput: { minLength: 6 },
        input: { endAdornment: visibilityToggle },
      }}
      {...props}
    />
  )
}
