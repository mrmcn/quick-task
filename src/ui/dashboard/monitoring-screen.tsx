import { fetchMonitoringStates } from '@/lib/data'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

export default async function MonitoringScreen() {
  const { completed, pending, progress } = await fetchMonitoringStates()

  return (
    <Box
      component='article'
      sx={{ flexGrow: 1, mt: '3vh' }}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid size={6}>
          <MonitoringCard
            name='Completed tasks'
            value={completed}
          />
        </Grid>
        <Grid size={6}>
          <MonitoringCard
            name='Pending tasks'
            value={pending}
          />
        </Grid>
        <Grid size={12}>
          <MonitoringCard
            name='Progress, %'
            value={progress}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export function MonitoringCard({ name, value }: MonitoringStateProps) {
  return (
    <Card
      component='section'
      raised
    >
      <CardContent>
        <Typography
          variant='h6'
          align='center'
        >
          {name}
        </Typography>
        <Typography align='center'>{value}</Typography>
      </CardContent>
    </Card>
  )
}

export interface MonitoringStateProps {
  name: string
  value: number
}
