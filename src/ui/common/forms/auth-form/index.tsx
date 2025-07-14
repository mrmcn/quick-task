'use client'

import {
  ListLabels,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import {
  ListBtnNamesValue,
  ListFormNamesValue,
  ListPlaceholderValue,
} from '@/lib/constants/type'
import { ActionHandler, ActionResult } from '@/lib/services/types'
import PageFormContainer from '@/ui/common/forms/form-container'
import PasswordTextField from '@/ui/common/forms/text-fields/password'
import TextField from '@mui/material/TextField'
import { useActionState } from 'react'

export default function AuthForm({
  action,
  btnName,
  formName,
  emailPlaceholder,
  passwordPlaceholder,
}: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined)

  return (
    <form action={formAction}>
      <PageFormContainer
        disabled={isPending}
        state={state}
        btnName={btnName}
        formName={formName}
      >
        <TextField
          type='email'
          id='email'
          required
          name={TextFieldsNameAttributeList.email}
          label={ListLabels.email}
          placeholder={emailPlaceholder}
          margin='dense'
        />
        <PasswordTextField
          label={ListLabels.password}
          name={TextFieldsNameAttributeList.password}
          id={TextFieldsNameAttributeList.password}
          placeholder={passwordPlaceholder}
          margin='dense'
        />
      </PageFormContainer>
    </form>
  )
}

interface AuthFormProps {
  action: ActionHandler<ActionResult>
  btnName: ListBtnNamesValue
  formName: ListFormNamesValue
  emailPlaceholder: ListPlaceholderValue
  passwordPlaceholder: ListPlaceholderValue
}
