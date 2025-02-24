import { auth } from '@/auth'
import { fetchMonitoringStates } from '@/lib/data'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import MonitoringState from './state'

export default async function MonitoringScreen() {
  const session = await auth()
  const { completed, pending, progress } = session
    ? await fetchMonitoringStates()
    : { completed: 1, pending: 2, progress: 33 }

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
          value={completed}
        />
        <MonitoringState
          name='Pending tasks'
          size={6}
          value={pending}
        />
        <MonitoringState
          name='Progress, %'
          size={12}
          value={progress}
        />
      </Grid>
    </Box>
  )
}
