import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import MonitoringState from '../common/monitoring-states/state'

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
        <MonitoringState
          name='Completed tasks'
          size={6}
          value={0}
        />
        <MonitoringState
          name='Pending tasks'
          size={6}
          value={0}
        />
        <MonitoringState
          name='Progress, %'
          size={12}
          value={0}
        />
      </Grid>
    </Box>
  )
}
