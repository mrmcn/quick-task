'use client'

import { ListBtnNames, ListLabelNameProps } from '@/lib/constants/text-const'
import { TaskId } from '@/lib/services/queries/task'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useFormStatus } from 'react-dom'

export default function TitleTextField({
  placeholder,
  data,
  label,
  onBlur,
}: Props) {
  const { pending } = useFormStatus()
  const onBlurWithPending = !pending ? onBlur : undefined
  const progress = pending ? (
    <CircularProgress
      size={20}
      color='secondary'
    />
  ) : undefined

  return (
    <>
      <TextField
        label={label}
        type='text'
        name='title'
        id='title'
        required
        defaultValue={data?.title}
        placeholder={placeholder}
        onBlur={onBlurWithPending}
        autoFocus
        disabled={pending}
        size='small'
      />
      <Button
        type='submit'
        color='secondary'
        disabled={pending}
        onMouseDown={(e) => e.preventDefault()} // Запобігаємо втраті фокуса з поля введення
      >
        {ListBtnNames.save}
      </Button>
      {progress}
    </>
  )
}

interface Props {
  placeholder?: string
  data?: TaskId
  label?: ListLabelNameProps
  onBlur?: () => void
}
