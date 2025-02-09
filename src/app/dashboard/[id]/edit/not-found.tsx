import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Box component='main'>
      <Typography>404 Not Found</Typography>
      <Typography component='p'>Could not find the requested task.</Typography>
      <Link href='/dashboard'>Go Back</Link>
    </Box>
  )
}
