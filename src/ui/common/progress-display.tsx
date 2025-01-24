import { Paper, Stack, Typography } from '@mui/material'

export default function ProgressDisplay({
  name,
  value,
}: {
  name: string
  value: string
}) {
  return (
    <Paper sx={{ width: { xs: '20vh', sm: '20vh' } }}>
      <Stack
        component='article'
        spacing={1}
        sx={{ justifyContent: 'center', mt: '1vh', mb: '1vh' }}
      >
        <Typography
          variant='h6'
          align='center'
        >
          {name}
        </Typography>
        <Typography align='center'>{value}</Typography>
      </Stack>
    </Paper>
  )
}
