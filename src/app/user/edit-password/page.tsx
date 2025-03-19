import { ListFormNames, ListPlaceholder } from '@/lib/constants/text-const'
import { updatePassword } from '@/lib/services/actions/user'
import FormWrapperWithAction from '@/ui/common/form/form-wrapper-action-state'
import PasswordTextField from '@/ui/common/form/text-fields/user/password'

export default function EditPassword() {
  return (
    <FormWrapperWithAction
      action={updatePassword}
      formName={ListFormNames.resetPassword}
    >
      <PasswordTextField placeholder={ListPlaceholder.createPassword} />
    </FormWrapperWithAction>
  )
}
