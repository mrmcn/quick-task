'use client'

import {
  ListBtnNames,
  ListFormNames,
  ListLabels,
  ListPlaceholder,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { createUser } from '@/lib/services/actions/user'
import PageFormContainer from '@/ui/common/forms/form-container'
import EmailTextField from '@/ui/common/forms/text-fields/user/email'
import PasswordTextField from '@/ui/common/forms/text-fields/user/password'
import { useActionState } from 'react'

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(createUser, undefined)

  return (
    <form action={formAction}>
      <PageFormContainer
        formName={ListFormNames.signup}
        btnName={ListBtnNames.signup}
        disabled={isPending}
        state={state}
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
          placeholder={ListPlaceholder.createPassword}
          margin='dense'
        />
      </PageFormContainer>
    </form>
  )
}
