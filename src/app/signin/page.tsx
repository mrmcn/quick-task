'use client'

import {
  ListBtnNames,
  ListFormNames,
  ListLabels,
  ListPlaceholder,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { SIGNUP_URL } from '@/lib/constants/url'
import { authenticate } from '@/lib/services/actions/user'
import PageFormContainer from '@/ui/common/forms/form-container'
import EmailTextField from '@/ui/common/forms/text-fields/user/email'
import PasswordTextField from '@/ui/common/forms/text-fields/user/password'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useActionState } from 'react'

export default function SigninPage() {
  const [state, formAction, isPending] = useActionState(authenticate, undefined)

  return (
    <form action={formAction}>
      <PageFormContainer
        disabled={isPending}
        state={state}
        btnName={ListBtnNames.signin}
        formName={ListFormNames.signin}
      >
        <EmailTextField
          name={TextFieldsNameAttributeList.email}
          label={ListLabels.email}
          placeholder={ListPlaceholder.enterEmail}
          margin='dense'
        />
        <PasswordTextField
          label={ListLabels.password}
          name={TextFieldsNameAttributeList.password}
          placeholder={ListPlaceholder.enterEmail}
          margin='dense'
        />
        <Button
          component={Link}
          href={SIGNUP_URL}
          color='secondary'
        >
          {ListBtnNames.signup}
        </Button>
      </PageFormContainer>
    </form>
  )
}
