import TextField, { TextFieldProps } from '@mui/material/TextField'

export default function EmailTextField({
  defaultValue,
  placeholder,
}: TextFieldProps) {
  return (
    <TextField
      label='Email'
      type='email'
      name='email'
      id='email'
      defaultValue={defaultValue}
      placeholder={placeholder}
      required
      margin='dense'
    />
  )
}
