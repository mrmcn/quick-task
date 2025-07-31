import { PAGES } from '@/lib/constants/routes'
import {
  BtnNamesList,
  FormNamesList,
  PlaceholderList,
} from '@/lib/constants/text-const'
import { authenticate } from '@/lib/services/actions/auth'
import AuthForm from '@/ui/common/forms/auth-form'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

/**
 * @function SigninPage
 * @description The sign-in page component.
 * This component displays a form for authenticating an existing user,
 * and also provides a link to navigate to the signup page if the user does not yet have an account.
 *
 * @returns A JSX element representing the sign-in page.
 */
export default function SigninPage() {
  return (
    <>
      <AuthForm
        action={authenticate}
        btnName={BtnNamesList.signin}
        formName={FormNamesList.signin}
        emailPlaceholder={PlaceholderList.enterEmail}
        passwordPlaceholder={PlaceholderList.enterPassword}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          component={Link}
          href={PAGES.SIGNUP}
          color='secondary'
        >
          {BtnNamesList.signup}{' '}
        </Button>
      </Box>
    </>
  )
}
