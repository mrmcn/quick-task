import TextField, { TextFieldProps } from '@mui/material/TextField'

export default function NameTextField({ defaultValue }: TextFieldProps) {
  return (
    <TextField
      label='Name'
      type='text'
      name='name'
      defaultValue={defaultValue}
      required
      fullWidth
      margin='dense'
    />
  )
}
