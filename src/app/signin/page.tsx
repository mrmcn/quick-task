'use client'

import { PAGES } from '@/lib/constants/routes'
import {
  ListBtnNames,
  ListFormNames,
  ListLabels,
  ListPlaceholder,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { authenticate } from '@/lib/services/actions/auth'
import PageFormContainer from '@/ui/common/forms/form-container'
import PasswordTextField from '@/ui/common/forms/text-fields/password'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
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
        <TextField
          type='email'
          id='email'
          required
          name={TextFieldsNameAttributeList.email}
          label={ListLabels.email}
          placeholder={ListPlaceholder.enterEmail}
          margin='dense'
        />
        <PasswordTextField
          label={ListLabels.password}
          name={TextFieldsNameAttributeList.password}
          id={TextFieldsNameAttributeList.password}
          placeholder={ListPlaceholder.enterEmail}
          margin='dense'
        />
        <Button
          component={Link}
          href={PAGES.SIGNUP}
          color='secondary'
        >
          {ListBtnNames.signup}
        </Button>
      </PageFormContainer>
    </form>
  )
}
