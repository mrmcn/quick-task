import fetchUserData from '@/lib/data'
import * as userService from '@/lib/services/actions/user-service'
import FormWrapperWithAction from '@/ui/common/form-wrapper/with-action'
import NameTextField from '@/ui/common/text-field/user-name'

export default async function EditUsername() {
  const { userName } = await fetchUserData()

  return (
    <FormWrapperWithAction
      action={userService.updateUserName}
      formName='Edit user name'
    >
      <NameTextField defaultValue={userName} />
    </FormWrapperWithAction>
  )
}
