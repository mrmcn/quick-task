'use client'

import { ListLabelNameProps } from '@/lib/constants/text-const'
import { TaskId } from '@/lib/services/queries/task'
import TextField from '@mui/material/TextField'
import { useFormStatus } from 'react-dom'

export default function TitleTextField({
  placeholder,
  defaultValue,
  label,
  margin,
  onBlur,
}: TitleTextFieldProps) {
  const { pending } = useFormStatus()
  const onBlurWithPending = !pending ? onBlur : undefined

  return (
    <TextField
      label={label}
      type='text'
      name='title'
      id='title'
      required
      margin={margin}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onBlur={onBlurWithPending}
      disabled={pending}
      size='small'
    />
  )
}

export interface TitleTextFieldProps {
  placeholder?: string
  defaultValue?: TaskId['title']
  label?: ListLabelNameProps
  margin: 'dense' | 'none' | 'normal'
  onBlur?: () => void
}

/**
 * Specifics of using the `autoFocus` prop:
 *
 * In this `TitleTextField` component, the `autoFocus` prop is used to automatically
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
 *
 * Therefore, if you encounter unexpected behavior with `useFormStatus` while using
 * `autoFocus`, consider removing this prop and, if necessary, manage focus
 * programmatically using `useRef` and `useEffect`.
 */
