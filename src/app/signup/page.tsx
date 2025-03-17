import { FormName, Phrases } from '@/lib/constants/text-const'
import { createUser } from '@/lib/services/actions/user'
import FormWrapperActionState from '@/ui/common/form/form-wrapper-action-state'
import EmailTextField from '@/ui/common/form/text-fields/email'
import PasswordTextField from '@/ui/common/form/text-fields/password'

export default function SignupPage() {
  return (
    <FormWrapperActionState
      action={createUser}
      formName={FormName.signup}
    >
      <EmailTextField placeholder={Phrases.enterEmail} />
      <PasswordTextField placeholder={Phrases.enterPassword} />
    </FormWrapperActionState>
  )
}
