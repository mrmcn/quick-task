'use client'

import { usePasswordVisibility } from '@/lib/hooks'
import { TextFieldLabel } from '@/lib/constants/text-const'
import { MyTextField, MyTextFieldProps } from './custom-text-field'

export default function PasswordTextField({ placeholder }: MyTextFieldProps) {
  const { input, type } = usePasswordVisibility()

  return (
    <MyTextField
      label={TextFieldLabel.password}
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
