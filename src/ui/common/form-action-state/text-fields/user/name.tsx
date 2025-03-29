import { ListTextFieldLabel } from '@/lib/constants/text-const'
import { UserNameAndEmail } from '@/lib/services/queries/user'
import TextField from '@mui/material/TextField'

export default function NameTextField({ placeholder, data }: Props) {
  return (
    <TextField
      label={ListTextFieldLabel.name}
      type='text'
      name='name'
      id='name'
      required
      margin='dense'
      placeholder={placeholder}
      defaultValue={data?.name}
    />
  )
}

interface Props {
  placeholder?: string
  data?: UserNameAndEmail
}
