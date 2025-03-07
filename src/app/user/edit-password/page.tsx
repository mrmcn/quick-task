import * as userService from '@/lib/services/actions/user-service'
import FormWrapperWithAction from '@/ui/common/form-wrapper/with-action'
import PasswordTextField from '@/ui/common/text-field/password'

export default function EditPassword() {
  return (
    <FormWrapperWithAction
      action={userService.updatePassword}
      formName='Reset password'
    >
      <PasswordTextField />
    </FormWrapperWithAction>
  )
}
