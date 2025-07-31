'use client'

import { usePasswordVisibility } from '@/lib/utils/hooks/use-password-visibility'
import { MyTextFieldProps } from '@/ui/common/forms/types'
import { TextField } from '@mui/material'

/**
 * The PasswordTextField component provides a password input field
 * with integrated visibility toggling functionality.
 *
 * It leverages the custom `usePasswordVisibility` hook to manage
 * the password's visibility state and display the appropriate icon (show/hide).
 *
 * @param props - Properties passed to the underlying MUI TextField component,
 * including `MyTextFieldProps` for specific extensions.
 * @returns A TextField component with integrated password visibility features.
 */
export default function PasswordTextField(props: MyTextFieldProps) {
  // Destructures values returned by the usePasswordVisibility hook:
  // - visibilityToggle: The component that toggles visibility (e.g., an "eye" icon).
  // - type: The dynamic type of the input field ('password' or 'text').
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
