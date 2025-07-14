import { PAGES } from '@/lib/constants/routes'
import {
  ListBtnNames,
  ListFormNames,
  ListPlaceholder,
} from '@/lib/constants/text-const'
import { authenticate } from '@/lib/services/actions/auth'
import AuthForm from '@/ui/common/forms/auth-form'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

export default function SigninPage() {
  return (
    <>
      <AuthForm
        action={authenticate}
        btnName={ListBtnNames.signin}
        formName={ListFormNames.signin}
        emailPlaceholder={ListPlaceholder.enterEmail}
        passwordPlaceholder={ListPlaceholder.enterPassword}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          component={Link}
          href={PAGES.SIGNUP}
          color='secondary'
        >
          {ListBtnNames.signup}
        </Button>
      </Box>
    </>
  )
}
