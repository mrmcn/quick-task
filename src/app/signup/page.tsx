import {
  BtnNamesList,
  FormNamesList,
  PlaceholderList,
} from '@/lib/constants/text-const'
import { createUser } from '@/lib/services/actions/user'
import AuthForm from '@/ui/common/forms/auth-form'

/**
 * @function SignupPage
 * @description The signup page component.
 * This component renders a form for new user account creation,
 * utilizing the generic `AuthForm` component and passing relevant props to it.
 *
 * @returnsA JSX element representing the signup page.
 */
export default function SignupPage() {
  return (
    <AuthForm
      action={createUser}
      btnName={BtnNamesList.signup}
      formName={FormNamesList.signup}
      emailPlaceholder={PlaceholderList.enterEmail}
      passwordPlaceholder={PlaceholderList.createPassword}
    />
  )
}
