import {
  ListFormNames,
  ListLoadingIndicator,
  ListPlaceholder,
} from '@/lib/constants/text-const'
import { updatePassword } from '@/lib/services/actions/user'
import FormWrapperWithAction from '@/ui/common/form/form-wrapper-action-state'
import PasswordTextField from '@/ui/common/form/text-fields/user/password'
import LoadingIndicator from '@/ui/common/loading-indicator'

export default function EditPassword() {
  return (
    <FormWrapperWithAction
      action={updatePassword}
      formName={ListFormNames.resetPassword}
    >
      <PasswordTextField placeholder={ListPlaceholder.createPassword} />
      <LoadingIndicator content={ListLoadingIndicator.updataUser} />
    </FormWrapperWithAction>
  )
}
