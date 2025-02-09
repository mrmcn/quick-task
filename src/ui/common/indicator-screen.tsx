import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function IndicatorScreen({ name, value }: IndicatorScreenProps) {
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

export interface IndicatorScreenProps {
  name: string
  value: number
}
