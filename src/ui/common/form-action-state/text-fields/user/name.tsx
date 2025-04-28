import { ListLabelName } from '@/lib/constants/text-const'
import { UserData } from '@/lib/services/queries/user'
import TextField from '@mui/material/TextField'

export default function NameTextField({ placeholder, data }: Props) {
  return (
    <TextField
      label={ListLabelName.name}
      type='text'
      name='name'
      id='name'
      required
      margin='dense'
      placeholder={placeholder}
      defaultValue={data}
    />
  )
}

interface Props {
  placeholder?: string
  data?: UserData
}
