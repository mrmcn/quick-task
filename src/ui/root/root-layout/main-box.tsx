import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Bar from './bar'

export default function MainBox({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Box sx={{ height: '100vh' }}>
          <Bar />
          {children}
        </Box>
      </Container>
    </>
  )
}
