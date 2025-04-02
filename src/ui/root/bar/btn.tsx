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
import fetchUserData from '@/lib/services/queries/user'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default async function BarBtn() {
  const session = await auth()
  if (!session)
    return (
      <>
        <HomeBtn href={HOME_URL} />
        <Signin />
      </>
    )

  const { data } = await fetchUserData()
  const userName = !data ? ListError.error : data.name

  return (
    <>
      <HomeBtn href={DASHBOARD_URL} />
      <Button
        component={Link}
        href={USER_URL}
        color='inherit'
        startIcon={<PersonIcon />}
        aria-label='user setting'
      >
        {userName}
      </Button>
    </>
  )
}

function Signin() {
  return (
    <Button
      component={Link}
      href={SIGNIN_URL}
      color='inherit'
      aria-label='Go to signup'
    >
      <Typography>{ListBtnNames.signIn}</Typography>
    </Button>
  )
}

function HomeBtn({ href }: { href?: string }) {
  return (
    <Button
      component={Link}
      href={href}
      color='inherit'
      aria-label='Go to home'
      sx={{ flexGrow: 1 }}
    >
      <Typography sx={{ flexGrow: 1 }}>{ListPhrases.quickTask}</Typography>
    </Button>
  )
}
