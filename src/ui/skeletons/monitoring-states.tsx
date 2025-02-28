import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import { MonitoringCard } from '../dashboard/monitoring-screen'

export default function MonitoringScreenSkeleton() {
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
            value={0}
          />
        </Grid>
        <Grid size={6}>
          <MonitoringCard
            name='Pending tasks'
            value={0}
          />
        </Grid>
        <Grid size={12}>
          <MonitoringCard
            name='Progress, %'
            value={0}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
