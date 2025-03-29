import {
  ListFormNames,
  ListLoadingIndicator,
  ListPlaceholder,
} from '@/lib/constants/text-const'
import { createUser } from '@/lib/services/actions/user'
import FormWrapperActionState from '@/ui/common/form-action-state/form-wrapper'
import EmailTextField from '@/ui/common/form-action-state/text-fields/user/email'
import PasswordTextField from '@/ui/common/form-action-state/text-fields/user/password'
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
