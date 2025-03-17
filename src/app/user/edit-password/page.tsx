import { updatePassword } from '@/lib/services/actions/user'
import { FormName } from '@/lib/constants/text-const'
import FormWrapperWithAction from '@/ui/common/form/form-wrapper-action-state'
import PasswordTextField from '@/ui/common/form/text-fields/password'

export default function EditPassword() {
  return (
    <FormWrapperWithAction
      action={updatePassword}
      formName={FormName.resetPassword}
    >
      <PasswordTextField />
    </FormWrapperWithAction>
  )
}
