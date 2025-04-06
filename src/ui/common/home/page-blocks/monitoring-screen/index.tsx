import { ListMonitoringCardName } from '@/lib/constants/text-const'
import { fetchMonitoringStates } from '@/lib/services/queries/task'
import { StatusCard } from '@/ui/common/home/page-blocks/monitoring-screen/status-card'
import Grid from '@mui/material/Grid2'

export default function MonitoringScreen() {
  const monitoringStatesPromise = fetchMonitoringStates()

  return (
    <>
      <Grid size={6}>
        <StatusCard
          cardName={ListMonitoringCardName.completed}
          type='completed'
          promise={monitoringStatesPromise}
        />
      </Grid>
      <Grid size={6}>
        <StatusCard
          cardName={ListMonitoringCardName.pending}
          type='pending'
          promise={monitoringStatesPromise}
        />
      </Grid>
    </>
  )
}
