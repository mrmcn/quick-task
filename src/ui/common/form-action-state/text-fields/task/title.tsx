import { ListLabelName } from '@/lib/constants/text-const'
import { TaskId } from '@/lib/services/queries/task'
import { TextField } from '@mui/material'

export default function TitleTextField({ placeholder, data }: Props) {
  return (
    <TextField
      label={ListLabelName.title}
      type='text'
      name='title'
      id='title'
      required
      margin='dense'
      defaultValue={data?.title}
      placeholder={placeholder}
    />
  )
}

interface Props {
  placeholder?: string
  data?: TaskId
}
