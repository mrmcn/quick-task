import { ListTextFieldLabel } from '@/lib/constants/text-const'
import { UserNameAndEmail } from '@/lib/services/queries/user'
import TextField from '@mui/material/TextField'

export default function NameTextField({ placeholder, data }: Props) {
  const defaultValue = data?.name

  return (
    <TextField
      label={ListTextFieldLabel.name}
      type='text'
      name='name'
      id='name'
      required
      margin='dense'
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  )
}

interface Props {
  placeholder?: string
  data?: UserNameAndEmail
}
