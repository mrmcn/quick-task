import { auth } from '@/auth'
import {
  ListBtnNames,
  ListError,
  ListPhrases,
} from '@/lib/constants/text-const'
import { PAGES } from '@/lib/constants/url'
import { fetchUser } from '@/lib/services/queries/user'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default async function BarBtn() {
  const session = await auth()
  if (!session)
    return (
      <>
        <HomeBtn href={PAGES.HOME} />
        <Button // signin btn
          component={Link}
          href={PAGES.SIGNIN}
          color='inherit'
          aria-label='Go to signup'
        >
          <Typography>{ListBtnNames.signin}</Typography>
        </Button>
      </>
    )

  const { data } = await fetchUser.uniqueData('name')
  const userName = data ?? ListError.error

  return (
    <>
      <HomeBtn href={PAGES.DASHBOARD} />
      <Button // user cabinet
        component={Link}
        href={PAGES.USER}
        color='inherit'
        startIcon={<PersonIcon />}
        aria-label='user setting'
      >
        {userName}
      </Button>
    </>
  )
}

function HomeBtn({ href }: { href: string }) {
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
