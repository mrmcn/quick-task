import {
  ListError,
  ListMonitoringCardName,
  ListMonitoringCardNameProps,
} from '@/lib/constants/text-const'
import {
  fetchMonitoringStates,
  MonitoringStatesProps,
} from '@/lib/services/queries/task'
import Await from '@/lib/utils/await'
import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { ReactNode, Suspense } from 'react'

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
          <CardWrapper cardName={ListMonitoringCardName.completed}>
            <Suspense fallback={<Fallback />}>
              <Await promise={monitoringStatesPromise}>
                <MonitoringData type='completed' />
              </Await>
            </Suspense>
          </CardWrapper>
        </Grid>
        <Grid size={6}>
          <CardWrapper cardName={ListMonitoringCardName.pending}>
            <Suspense fallback={<Fallback />}>
              <Await promise={monitoringStatesPromise}>
                <MonitoringData type='pending' />
              </Await>
            </Suspense>
          </CardWrapper>
        </Grid>
        <Grid size={12}>
          <CardWrapper cardName={ListMonitoringCardName.progress}>
            <Suspense fallback={<Fallback />}>
              <Await promise={monitoringStatesPromise}>
                <MonitoringData type='progress' />
              </Await>
            </Suspense>
          </CardWrapper>
        </Grid>
      </Grid>
    </Box>
  )
}

function CardWrapper({ cardName, children }: CardWrapperProps) {
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
        {children}
      </CardContent>
    </Card>
  )
}

function MonitoringData({ type, data }: MonitoringDataProps) {
  const value = data?.[type]

  return <Typography align='center'>{value ?? ListError.noData}</Typography>
}

function Fallback() {
  return (
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
  )
}

interface CardWrapperProps {
  cardName: ListMonitoringCardNameProps
  children: ReactNode
}

interface MonitoringDataProps {
  type: keyof MonitoringStatesProps
  data?: MonitoringStatesProps
}
