import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function MainBox({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box sx={{ height: '100vh' }}>
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
          {children}
        </Box>
      </Container>
    </>
  )
}
