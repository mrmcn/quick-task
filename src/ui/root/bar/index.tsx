import { auth } from '@/auth'
import { ListBtnNames, ListPhrases } from '@/lib/constants/text-const'
import {
  DASHBOARD_URL,
  HOME_URL,
  SIGNIN_URL,
  USER_URL,
} from '@/lib/constants/url'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default async function Appbar() {
  const session = await auth()
  const homeUrl = session ? DASHBOARD_URL : HOME_URL
  const userCabinetUrl = session ? USER_URL : SIGNIN_URL
  const btnName = session ? session.user.name : ListBtnNames.signIn

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
        aria-label='Go to signup'
      >
        <Typography>{btnName}</Typography>
      </Button>
    </Box>
  )
}
