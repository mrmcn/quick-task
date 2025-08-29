'use client'

import { LabelsList, NameAttributeList } from '@/lib/constants/text-const'
import PageFormContainer from '@/ui/common/forms/form-container'
import PasswordTextField from '@/ui/common/forms/text-fields/password'
import { AuthFormProps } from '@/ui/common/forms/types'
import TextField from '@mui/material/TextField'
import { useActionState } from 'react'

// Destructuring constants for improved readability and to avoid duplication.
const { email: emailName, password: passwordName } = NameAttributeList
const { email: emailLabel, password: passwordLabel } = LabelsList

/**
 * The **AuthForm** component serves as a versatile authentication form,
 * used for both **user sign-in** and **new user sign-up**.
 *
 * `AuthForm` utilizes the React `useActionState` hook to manage form states and server actions.
 * The overall form structure, including the title, submit button, and error display,
 * is delegated to the `PageFormContainer` component, into which the input fields are embedded.
 *
 * @param  action - The **server action** to be executed upon form submission. For example, `authenticate` for sign-in or `createUser` for sign-up.
 * @param  btnName - The text displayed on the form's submit button (e.g., "Sign In" or "Sign Up"). Passed to `PageFormContainer`.
 * @param  formName - The name of the form, displayed as a title (e.g., "Sign In" or "Sign Up"). Passed to `PageFormContainer`.
 * @param  emailPlaceholder - The placeholder text for the email input field (e.g., "Enter Email").
 * @param  passwordPlaceholder - The placeholder text for the password input field. This can vary for sign-in ("Enter Password") and sign-up ("Create Password").
 *
 * @returns  The authentication form with Email and Password fields.
 */
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
          id={emailName}
          required
          name={emailName}
          label={emailLabel}
          placeholder={emailPlaceholder}
          margin='dense'
        />
        <PasswordTextField
          label={passwordLabel}
          name={passwordName}
          id={passwordName}
          placeholder={passwordPlaceholder}
          margin='dense'
        />
      </PageFormContainer>
    </form>
  )
}
