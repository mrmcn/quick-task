import TextField from '@mui/material/TextField'
import { MyTextFieldProps } from '../my-text-field-props'

export default function NameTextField(props: MyTextFieldProps) {
  return (
    <TextField
      type='text'
      id='name'
      required
      {...props}
    />
  )
}
