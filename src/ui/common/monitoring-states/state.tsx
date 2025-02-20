import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { MonitoringStateProps } from './monitor'

export default function MonitoringState({
  name,
  value,
  size,
}: MonitoringStateProps) {
  return (
    <Grid size={size}>
      <Paper>
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
    </Grid>
  )
}
