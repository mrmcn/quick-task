import fetchUserData from '@/lib/data'
import * as userService from '@/lib/services/actions/user-service'
import FormWrapperWithAction from '@/ui/common/form-wrapper/with-action'
import EmailTextField from '@/ui/common/text-field/email'

export default async function EditEmail() {
  const userData = await fetchUserData()
  const email = userData.email

  return (
    <FormWrapperWithAction
      action={userService.updateEmail}
      formName='Edit email'
    >
      <EmailTextField defaultValue={email} />
    </FormWrapperWithAction>
  )
}
