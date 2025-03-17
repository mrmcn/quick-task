import { ListError, MonitoringCardName } from '@/lib/constants/text-const'
import {
  fetchMonitoringStates,
  FetchMonitoringStates,
} from '@/lib/services/queries/task'
import { MonitoringStatesProps } from '@/lib/utils/calculator-monitoring-states'
import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { notFound } from 'next/navigation'
import { ReactNode, Suspense, use } from 'react'

export default function MonitoringScreen() {
  const monitoringStatesPromise = fetchMonitoringStates()

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
          <MonitoringCard cardName={MonitoringCardName.completed}>
            <SuspenseItem
              type='completed'
              monitoringStatesPromise={monitoringStatesPromise}
            />
          </MonitoringCard>
        </Grid>
        <Grid size={6}>
          <MonitoringCard cardName={MonitoringCardName.pending}>
            <SuspenseItem
              type='pending'
              monitoringStatesPromise={monitoringStatesPromise}
            />
          </MonitoringCard>
        </Grid>
        <Grid size={12}>
          <MonitoringCard cardName={MonitoringCardName.progress}>
            <SuspenseItem
              type='progress'
              monitoringStatesPromise={monitoringStatesPromise}
            />
          </MonitoringCard>
        </Grid>
      </Grid>
    </Box>
  )
}

function MonitoringCard({ cardName, children }: MonitoringCardProps) {
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
          {cardName}
        </Typography>
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Skeleton width={10} />
            </Box>
          }
        >
          {children}
        </Suspense>
      </CardContent>
    </Card>
  )
}

function SuspenseItem({ type, monitoringStatesPromise }: SuspenseItemProps) {
  const { data, error } = use(monitoringStatesPromise)

  if (error && error.type !== 'database') notFound()
  const value = data?.[type]
  return <Typography align='center'>{value ?? ListError.noData}</Typography>
}

interface SuspenseItemProps {
  type: keyof MonitoringStatesProps
  monitoringStatesPromise: FetchMonitoringStates
}

interface MonitoringCardProps {
  cardName: string
  children: ReactNode
}
