import { updateUserName } from '@/lib/actions'
import TextField from '@mui/material/TextField'
import FormWrapper from '../common/form-wrapper'

export default function NameEditingForm({ userName }: { userName: string }) {
  return (
    <FormWrapper
      fn={updateUserName}
      formName='Edit user name'
      btnName='Save'
    >
      <TextField
        label='Name'
        type='text'
        name='name'
        value={userName}
        required
        fullWidth
        margin='dense'
      />
    </FormWrapper>
  )
}
