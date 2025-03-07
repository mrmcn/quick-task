import * as userService from '@/lib/services/actions/user-service'
import FormWrapperWithAction from '../common/form-wrapper/with-action'
import EmailTextField from '../common/text-field/email'
import PasswordTextField from '../common/text-field/password'

export default function SignupForm() {
  return (
    <FormWrapperWithAction
      action={userService.createUser}
      formName='Please create account to continue.'
    >
      <EmailTextField placeholder='Enter your email address' />
      <PasswordTextField placeholder='Enter password' />
    </FormWrapperWithAction>
  )
}
