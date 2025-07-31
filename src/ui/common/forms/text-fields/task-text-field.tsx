'use client'

import { MyTextFieldProps } from '@/ui/common/forms/types'
import TextField from '@mui/material/TextField'
import { useFormStatus } from 'react-dom'

/**
 * The TaskTextField component represents a text input field
 * optimized for use within forms utilizing server actions.
 *
 * It automatically disables itself during a form's pending state
 * using the `useFormStatus` hook from React DOM.
 * It also conditionally controls the `onBlur` event behavior during pending states.
 *
 * @param props - Properties passed to the underlying MUI TextField component,
 * including `MyTextFieldProps` for specific extensions.
 * @returns A TextField component adapted for forms with server actions.
 */
export default function TaskTextField(props: MyTextFieldProps) {
  // Retrieves the "pending" status from the nearest parent form
  // that is using server actions.
  const { pending } = useFormStatus()

  // Conditionally assigns the onBlur handler.
  // It will only be active when the form is NOT in a pending state
  // to prevent unintended behavior during form submission.
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
