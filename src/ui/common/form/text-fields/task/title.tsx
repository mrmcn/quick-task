import { ListTextFieldLabel } from '@/lib/constants/text-const'
import { TaskId } from '@/lib/services/queries/task'
import { TextField } from '@mui/material'

export default function TitleTextField({ placeholder, data }: Props) {
  const defaultValue = data?.title

  return (
    <TextField
      label={ListTextFieldLabel.title}
      type='text'
      name='title'
      id='title'
      required
      margin='dense'
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  )
}

interface Props {
  placeholder?: string
  data?: TaskId
}
