import {
  ListFormNames,
  ListLoadingIndicator,
  ListPlaceholder,
} from '@/lib/constants/text-const'
import { createUser } from '@/lib/services/actions/user'
import FormWrapperActionState from '@/ui/common/form/form-wrapper-action-state'
import EmailTextField from '@/ui/common/form/text-fields/user/email'
import PasswordTextField from '@/ui/common/form/text-fields/user/password'
import LoadingIndicator from '@/ui/common/loading-indicator'

export default function SignupPage() {
  return (
    <FormWrapperActionState
      action={createUser}
      formName={ListFormNames.signup}
    >
      <EmailTextField placeholder={ListPlaceholder.enterEmail} />
      <PasswordTextField placeholder={ListPlaceholder.createPassword} />
      <LoadingIndicator content={ListLoadingIndicator.creating} />
    </FormWrapperActionState>
  )
}
