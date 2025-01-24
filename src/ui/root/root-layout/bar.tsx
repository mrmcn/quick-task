import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function Bar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h4'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            QUICK TASK
          </Typography>
          <Button
            component={Link}
            color='inherit'
            href='/login'
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
