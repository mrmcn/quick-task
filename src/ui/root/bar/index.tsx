import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import BarBtn from './btn'

export default function BasicAppBar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <AppBar position='static'>
          <Toolbar>
            <BarBtn />
          </Toolbar>
        </AppBar>
        {children}
      </Container>
    </>
  )
}
