import { ListTextFieldLabel } from '@/lib/constants/text-const'
import { UserNameAndEmail } from '@/lib/services/queries/user'
import TextField from '@mui/material/TextField'

export default function EmailTextField({ placeholder, data }: Props) {
  const defaultValue = data?.email

  return (
    <TextField
      label={ListTextFieldLabel.email}
      type='email'
      name='email'
      id='email'
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
