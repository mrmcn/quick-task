'use client'

import * as userService from '@/lib/services/actions/user-service'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import FormWrapperWithAction from '../common/form-wrapper/with-action'
import EmailTextField from '../common/text-field/email'
import PasswordTextField from '../common/text-field/password'

export default function SigninForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  return (
    <FormWrapperWithAction
      action={userService.authenticate}
      formName='Sign in'
      value={callbackUrl}
      name='redirectTo'
    >
      <EmailTextField placeholder='Enter your email address' />
      <PasswordTextField />
      <Button
        component={Link}
        href='/signup'
        sx={{ mt: 2 }}
      >
        Sign up
      </Button>
    </FormWrapperWithAction>
  )
}
