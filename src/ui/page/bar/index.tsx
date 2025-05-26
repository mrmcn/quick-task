import { auth } from '@/auth'
import {
  ListBtnNames,
  ListError,
  ListPhrases,
} from '@/lib/constants/text-const'
import {
  DASHBOARD_URL,
  HOME_URL,
  SIGNIN_URL,
  USER_URL,
} from '@/lib/constants/url'
import { fetchUserName } from '@/lib/services/queries/user'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default async function Appbar() {
  const { homeUrl, userButtonAriaLabel, userButtonText, userCabinetUrl } =
    await getAppBarConfig()

  return (
    <Box
      component='nav'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Button
        component={Link}
        href={homeUrl}
        color='inherit'
        aria-label='Go to home'
      >
        <Typography>{ListPhrases.quickTask}</Typography>
      </Button>
      <Button
        component={Link}
        href={userCabinetUrl}
        color='inherit'
        aria-label={userButtonAriaLabel}
      >
        <Typography>{userButtonText}</Typography>
      </Button>
    </Box>
  )
}

async function getAppBarConfig() {
  const session = await auth()

  if (session) {
    const { data } = await fetchUserName()
    const userName = data ?? ListError.failed

    return {
      homeUrl: DASHBOARD_URL,
      userCabinetUrl: USER_URL,
      userButtonText: userName,
      userButtonAriaLabel: 'Go to user cabinet',
    }
  }

  return {
    homeUrl: HOME_URL,
    userCabinetUrl: SIGNIN_URL,
    userButtonText: ListBtnNames.signin,
    userButtonAriaLabel: 'Go to sign in',
  }
}
