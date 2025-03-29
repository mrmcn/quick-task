'use client'

import {
  ListButtonNames,
  ListFormNames,
  ListLoadingIndicator,
  ListPlaceholder,
} from '@/lib/constants/text-const'
import { DASHBOARD_URL, SIGNUP_URL } from '@/lib/constants/url'
import { authenticate } from '@/lib/services/actions/user'
import FormWrapperActionState, {
  RedirectNameProps,
} from '@/ui/common/form-action-state/form-wrapper'
import EmailTextField from '@/ui/common/form-action-state/text-fields/user/email'
import PasswordTextField from '@/ui/common/form-action-state/text-fields/user/password'
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
      formName={ListFormNames.signin}
      name={RedirectNameProps.signin}
      value={callbackUrl}
    >
      <EmailTextField placeholder={ListPlaceholder.enterEmail} />
      <PasswordTextField placeholder={ListPlaceholder.enterEmail} />
      <Button
        component={Link}
        href={SIGNUP_URL}
        sx={{ mt: 2 }}
      >
        {ListButtonNames.signup}
      </Button>
      <LoadingIndicator content={ListLoadingIndicator.loggingIn} />
    </FormWrapperActionState>
  )
}
