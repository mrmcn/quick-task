import { auth } from '@/auth'
import fetchUserData from '@/lib/data'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default async function BarBtn() {
  const session = await auth()
  if (!session)
    return (
      <>
        <HomeBtn href='/' />
        <Signin />
      </>
    )

  const { userName } = await fetchUserData()

  return (
    <>
      <HomeBtn href='/dashboard' />
      <Button
        component={Link}
        href='/user'
        color='inherit'
        startIcon={<PersonIcon />}
        aria-label='delete'
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
      color='inherit'
      href='/signin'
    >
      Sign in
    </Button>
  )
}

function HomeBtn({ href }: { href?: string }) {
  return (
    <Button
      component={Link}
      href={href}
      size='large'
      color='inherit'
      sx={{ flexGrow: 1 }}
    >
      <Typography
        variant='h4'
        component='div'
        sx={{ flexGrow: 1 }}
      >
        QUICK TASK
      </Typography>
    </Button>
  )
}
