import { auth } from '@/auth'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default async function HomeBtn() {
  const session = await auth()

  return (
    <Button
      component={Link}
      href={session ? '/dashboard' : '/'}
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
