import { ListMonitoringCardName } from '@/lib/constants/text-const'
import { fetchMonitoringStates } from '@/lib/services/queries/task'
import { StatusCard } from '@/ui/common/home/page-blocks/monitoring-screen/status-card'
import Grid from '@mui/material/Grid2'
import { Suspense } from 'react'

export default function MonitoringScreen() {
  const monitoringStatesPromise = fetchMonitoringStates()

  return (
    <>
      <Grid size={6}>
        <Suspense>
          <StatusCard
            cardName={ListMonitoringCardName.completed}
            type='completed'
            promise={monitoringStatesPromise}
          />
        </Suspense>
      </Grid>
      <Grid size={6}>
        <Suspense>
          <StatusCard
            cardName={ListMonitoringCardName.pending}
            type='pending'
            promise={monitoringStatesPromise}
          />
        </Suspense>
      </Grid>
    </>
  )
}
