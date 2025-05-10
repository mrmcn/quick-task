'use client'

import { ListLabelNameProps } from '@/lib/constants/text-const'
import { TaskId } from '@/lib/services/queries/task'
import { TextField } from '@mui/material'
import { useFormStatus } from 'react-dom'

export default function DetailsTextField({
  placeholder,
  defaultValue,
  onBlur,
  label,
  margin,
}: DetailsTextFieldProps) {
  const { pending } = useFormStatus()
  const onBlurWithPending = !pending ? onBlur : undefined

  return (
    <TextField
      label={label}
      type='text'
      name='details'
      id='details'
      required
      margin={margin}
      multiline
      rows={4}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onBlur={onBlurWithPending}
      disabled={pending}
      size='small'
    />
  )
}

export interface DetailsTextFieldProps {
  placeholder?: string
  defaultValue?: TaskId['details']
  label?: ListLabelNameProps
  onBlur?: () => void
  margin: 'dense' | 'none' | 'normal'
}
