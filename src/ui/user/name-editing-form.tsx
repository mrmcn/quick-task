import { updateUserName } from '@/lib/actions'
import TextField from '@mui/material/TextField'
import FormWrapper from '../common/form-wrapper'

export default function UsernameEditingForm({
  userName,
}: {
  userName: string
}) {
  return (
    <FormWrapper
      fn={updateUserName}
      formName='Edit user name'
    >
      <TextField
        label='Name'
        type='text'
        name='name'
        defaultValue={userName}
        required
        fullWidth
        margin='dense'
      />
    </FormWrapper>
  )
}
