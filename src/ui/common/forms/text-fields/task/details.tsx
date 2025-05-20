'use client'

import { TextField } from '@mui/material'
import { useFormStatus } from 'react-dom'
import { MyTextFieldProps } from '../my-text-field-props'

export default function DetailsTextField(props: MyTextFieldProps) {
  const { pending } = useFormStatus()
  const onBlurWithPending = !pending ? props.onBlur : undefined

  return (
    <TextField
      type='text'
      id='details'
      required
      multiline
      rows={4}
      onBlur={onBlurWithPending}
      disabled={pending}
      size='small'
      {...props}
    />
  )
}
