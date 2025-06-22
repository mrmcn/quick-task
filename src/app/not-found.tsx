import { PAGES } from '@/lib/constants/url'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { rootStyles } from './styles'

export default function NotFound() {
  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={rootStyles.notFoundSx}
    >
      <Typography align='center'>404 Not Found</Typography>
      <Typography
        component='p'
        align='center'
      >
        Could not find the requested task.
      </Typography>
      <Link href={PAGES.DASHBOARD}>Go home</Link>
    </Container>
  )
}
