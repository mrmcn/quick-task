import { auth } from '@/auth'
import { fetchUserName } from '@/lib/data'
import PersonIcon from '@mui/icons-material/Person'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default async function MenuAppBar({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // if (!session) return redirect('/signin')
  const data = session && (await fetchUserName(session.user.id))

  // if (!data) throw new Error('User not found')
  // const userName = data.name ?? 'User'

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
                {data && (
                  <>
                    <IconButton
                      component={Link}
                      color='inherit'
                      href='/user'
                      aria-label='delete'
                    >
                      <PersonIcon />
                      <Typography>{data.name ?? 'User'}</Typography>
                    </IconButton>
                  </>
                )}
                <Button
                  component={Link}
                  color='inherit'
                  href='/signin'
                  sx={{ display: session ? 'none' : 'block' }}
                >
                  Sign in
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
