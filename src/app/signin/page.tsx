'use client'

import {
  ListBtnNames,
  ListFormNames,
  ListLabelName,
  ListPlaceholder,
  ListUserField,
} from '@/lib/constants/text-const'
import { SIGNUP_URL } from '@/lib/constants/url'
import { authenticate } from '@/lib/services/actions/user'
import FormContainer from '@/ui/common/forms/form-container'
import FormWrapperUsesActionStateAndRendersErrors, {
  RenderWrappedComponentProps,
} from '@/ui/common/forms/form-use-action-state'
import EmailTextField from '@/ui/common/forms/text-fields/user/email'
import PasswordTextField from '@/ui/common/forms/text-fields/user/password'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default function SigninPage() {
  return (
    <FormWrapperUsesActionStateAndRendersErrors
      action={authenticate}
      renderWrappedComponent={(props) => <FormContent props={props} />}
    />
  )
}

function FormContent({ props }: { props: RenderWrappedComponentProps }) {
  return (
    <FormContainer
      formName={ListFormNames.signin}
      {...props}
    >
      <EmailTextField placeholder={ListPlaceholder.enterEmail} />
      <PasswordTextField
        label={ListLabelName.password}
        name={ListUserField.password}
        placeholder={ListPlaceholder.enterEmail}
      />
      <Button
        component={Link}
        href={SIGNUP_URL}
        color='secondary'
        sx={{ mt: 2 }}
      >
        {ListBtnNames.signup}
      </Button>
    </FormContainer>
  )
}
