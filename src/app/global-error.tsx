'use client'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function GlobalError({ error, reset }: Props) {
  return (
    <html>
      <body>
        <Typography>Something went wrong!</Typography>
        <Typography>{error.message}</Typography>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  )
}

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}
