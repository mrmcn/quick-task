import { ListTextFieldLabel } from '@/lib/constants/text-const'
import { TaskId } from '@/lib/services/queries/task'
import { TextField } from '@mui/material'

export default function DetailsTextField({ placeholder, data }: Props) {
  return (
    <TextField
      label={ListTextFieldLabel.details}
      type='text'
      name='details'
      id='details'
      required
      margin='dense'
      multiline
      rows={4}
      defaultValue={data?.details}
      placeholder={placeholder}
    />
  )
}

interface Props {
  placeholder?: string
  data?: TaskId
}
