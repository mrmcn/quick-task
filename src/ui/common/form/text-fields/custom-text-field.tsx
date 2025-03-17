import { TextFieldLabelProps } from '@/lib/constants/text-const'
import { TextField, TextFieldProps } from '@mui/material'

export function MyTextField(props: MyTextFieldProps) {
  return <TextField {...props} />
}

export type MyTextFieldProps = Omit<TextFieldProps, 'label'> & {
  label?: TextFieldLabelProps
}
