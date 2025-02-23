import { auth } from '@/auth'
import fetchUserData from '@/lib/data'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default async function BarBtn() {
  const session = await auth()
  const hrefBtn = session ? '/dashboard' : '/'
  if (!session)
    return (
      <>
        <HomeBtn hrefBtn={hrefBtn} />
        <Signin />
      </>
    )

  const userData = await fetchUserData()
  const name = userData.name ?? 'User'

  return (
    <>
      <HomeBtn hrefBtn={hrefBtn} />
      <IconButton
        component={Link}
        color='inherit'
        href='/user'
        aria-label='delete'
      >
        <PersonIcon />
        <Typography>{name}</Typography>
      </IconButton>
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

function HomeBtn({ hrefBtn }: { hrefBtn: string }) {
  return (
    <Button
      component={Link}
      href={hrefBtn}
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
