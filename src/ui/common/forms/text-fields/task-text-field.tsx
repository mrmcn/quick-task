'use client'

import TextField from '@mui/material/TextField'
import { useFormStatus } from 'react-dom'
import { MyTextFieldProps } from './types'

export default function TaskTextField(props: MyTextFieldProps) {
  const { pending } = useFormStatus()
  const onBlurWithPending = !pending ? props.onBlur : undefined

  return (
    <TextField
      type='text'
      required
      onBlur={onBlurWithPending}
      disabled={pending}
      size='small'
      {...props}
    />
  )
}

/**
 * Specifics of using the `autoFocus` prop:
 *
 * In this `MyTextField` component, the `autoFocus` prop is used to automatically
 * set focus on the input field after it has been rendered.
 *
 * However, caution should be exercised when using it in the context of dynamically
 * displaying this component (for example, within the `EditableText` component,
 * which is shown upon clicking another element).
 *
 * Experiments have shown that when `autoFocus` is set to `true`, the behavior of
 * the `useFormStatus` hook could differ depending on the activation method
 * (mouse click versus touch tap). This could lead to the `pending` state not
 * updating correctly when clicking the "Save" button with a mouse.
 */
