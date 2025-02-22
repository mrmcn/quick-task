import { auth } from '@/auth'
import fetchUserData from '@/lib/data'
import PersonIcon from '@mui/icons-material/Person'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default async function CabinetBtn() {
  const session = await auth()
  if (!session) return null
  const userData = await fetchUserData()
  const name = userData.name ?? 'User'

  return (
    <IconButton
      component={Link}
      color='inherit'
      href='/user'
      aria-label='delete'
    >
      <PersonIcon />
      <Typography>{name}</Typography>
    </IconButton>
  )
}
