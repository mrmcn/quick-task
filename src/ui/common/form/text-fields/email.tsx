import { TextFieldLabel } from '@/lib/constants/text-const'
import { MyTextField, MyTextFieldProps } from './custom-text-field'

export default function EmailTextField({
  defaultValue,
  placeholder,
}: MyTextFieldProps) {
  return (
    <MyTextField
      label={TextFieldLabel.email}
      type='email'
      name='email'
      id='email'
      required
      defaultValue={defaultValue}
      placeholder={placeholder}
      margin='dense'
    />
  )
}
