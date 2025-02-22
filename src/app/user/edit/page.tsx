import { auth } from '@/auth'
import { updateUserName } from '@/lib/actions'
import fetchUserData from '@/lib/data'
import FormWrapper from '@/ui/common/form-wrapper'
import AuthDataForm from '@/ui/user/auth-data-form'
import TextField from '@mui/material/TextField'
import { redirect } from 'next/navigation'

export default async function UserDataEditing() {
  const session = await auth()
  if (!session) redirect('/')
  const userData = await fetchUserData()
  const userName = userData.name ?? 'User'
  const email = userData.email

  return (
    <>
      <FormWrapper
        fn={updateUserName}
        formName='Edit user name'
        btnName='Save'
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
      <AuthDataForm email={email} />
    </>
  )
}
