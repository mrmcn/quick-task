import { TextFieldLabel } from '@/lib/constants/text-const'
import { MyTextField, MyTextFieldProps } from './custom-text-field'

export default function TaskTitleTextField({ defaultValue }: MyTextFieldProps) {
  return (
    <MyTextField
      label={TextFieldLabel.summary}
      type='text'
      name='summary'
      id='summary'
      required
      defaultValue={defaultValue}
      margin='dense'
    />
  )
}
