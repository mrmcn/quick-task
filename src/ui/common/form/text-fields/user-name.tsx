import { TextFieldLabel } from '@/lib/constants/text-const'
import { MyTextField, MyTextFieldProps } from './custom-text-field'

export default function NameTextField({ defaultValue }: MyTextFieldProps) {
  return (
    <MyTextField
      label={TextFieldLabel.name}
      type='text'
      name='name'
      id='name'
      required
      defaultValue={defaultValue}
      margin='dense'
    />
  )
}
