import {
  ListBtnNames,
  ListFormNames,
  ListPlaceholder,
} from '@/lib/constants/text-const'
import { createUser } from '@/lib/services/actions/user'
import AuthForm from '@/ui/common/forms/auth-form'

export default function SignupPage() {
  return (
    <AuthForm
      action={createUser}
      btnName={ListBtnNames.signup}
      formName={ListFormNames.signup}
      emailPlaceholder={ListPlaceholder.enterEmail}
      passwordPlaceholder={ListPlaceholder.createPassword}
    />
  )
}
