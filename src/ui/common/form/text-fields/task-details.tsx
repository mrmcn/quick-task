import { TextFieldLabel } from '@/lib/constants/text-const'
import { MyTextField, MyTextFieldProps } from './custom-text-field'

export default function TaskDetailsTextField({
  defaultValue,
}: MyTextFieldProps) {
  return (
    <MyTextField
      label={TextFieldLabel.details}
      type='text'
      name='details'
      id='details'
      required
      defaultValue={defaultValue}
      multiline
      rows={4}
      margin='dense'
    />
  )
}
