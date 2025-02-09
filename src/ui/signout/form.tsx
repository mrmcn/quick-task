import { signOut } from '@/auth'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export function SignOut() {
  return (
    <Box
      component='form'
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button
        type='submit'
        color='inherit'
      >
        Sign Out
      </Button>
    </Box>
  )
}
