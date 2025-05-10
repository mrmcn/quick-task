'use client'

import {
  ListFormNames,
  ListLabelName,
  ListPlaceholder,
  ListUserField,
} from '@/lib/constants/text-const'
import { createUser } from '@/lib/services/actions/user'
import FormContainer from '@/ui/common/forms/form-container'
import FormWrapperUsesActionStateAndRendersErrors, {
  RenderWrappedComponentProps,
} from '@/ui/common/forms/form-use-action-state'
import EmailTextField from '@/ui/common/forms/text-fields/user/email'
import PasswordTextField from '@/ui/common/forms/text-fields/user/password'

export default function SignupPage() {
  return (
    <FormWrapperUsesActionStateAndRendersErrors
      action={createUser}
      renderWrappedComponent={(props) => <FormContent props={props} />}
    />
  )
}

function FormContent({ props }: { props: RenderWrappedComponentProps }) {
  return (
    <FormContainer
      formName={ListFormNames.signup}
      {...props}
    >
      <EmailTextField placeholder={ListPlaceholder.enterEmail} />
      <PasswordTextField
        label={ListLabelName.password}
        name={ListUserField.password}
        placeholder={ListPlaceholder.createPassword}
      />
    </FormContainer>
  )
}
