import TextField from '@mui/material/TextField'
import { MyTextFieldProps } from '../my-text-field-props'

export default function EmailTextField(props: MyTextFieldProps) {
  return (
    <TextField
      type='email'
      id='email'
      required
      {...props}
    />
  )
}
