import { signOut } from '@/auth'
import { MenuItem, Typography } from '@mui/material'
import Box from '@mui/material/Box'

export function SignOut() {
  return (
    <Box
      component='form'
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/' })
      }}
    >
      <MenuItem
        component='button'
        type='submit'
      >
        <Typography
          align='center'
          variant='button'
        >
          Sign out
        </Typography>
      </MenuItem>
    </Box>
  )
}
