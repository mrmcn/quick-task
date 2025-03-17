import { DASHBOARD_URL } from '@/lib/constants/url'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        mt: { xs: '10vh', sm: '15vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography align='center'>404 Not Found</Typography>
      <Typography
        component='p'
        align='center'
      >
        Could not find the requested task.
      </Typography>
      <Link href={DASHBOARD_URL}>Go Back</Link>
    </Container>
  )
}
