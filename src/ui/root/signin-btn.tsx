import { auth } from '@/auth'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default async function SigninBtn() {
  const session = await auth()
  if (session) return null
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
