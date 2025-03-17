'use client'

import { ButtonName, FormName, Phrases } from '@/lib/constants/text-const'
import { DASHBOARD_URL, SIGNUP_URL } from '@/lib/constants/url'
import { authenticate } from '@/lib/services/actions/user'
import FormWrapperActionState, {
  RedirectNameProps,
} from '@/ui/common/form/form-wrapper-action-state'
import EmailTextField from '@/ui/common/form/text-fields/email'
import PasswordTextField from '@/ui/common/form/text-fields/password'
import LoadingIndicator from '@/ui/common/loading-indicator'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function SigninPage() {
  return (
    <Suspense>
      <SigninForm />
    </Suspense>
  )
}

function SigninForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || DASHBOARD_URL

  return (
    <FormWrapperActionState
      action={authenticate}
      formName={FormName.signin}
      name={RedirectNameProps.signin}
      value={callbackUrl}
    >
      <EmailTextField placeholder={Phrases.enterEmail} />
      <PasswordTextField />
      <Button
        component={Link}
        href={SIGNUP_URL}
        sx={{ mt: 2 }}
      >
        {ButtonName.signup}
      </Button>
      <LoadingIndicator content={Phrases.loggingIn} />
    </FormWrapperActionState>
  )
}
