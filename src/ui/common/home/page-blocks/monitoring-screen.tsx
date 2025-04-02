import {
  ListError,
  ListMonitoringCardName,
  ListMonitoringCardNameProps,
} from '@/lib/constants/text-const'
import {
  FetchData,
  fetchMonitoringStates,
  MonitoringStatesProps,
} from '@/lib/services/queries/task'
import Await from '@/lib/utils/await'
import { CardContent, Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

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

function StatusCard({ cardName, type, promise }: Props) {
  return (
    <Card
      component='article'
      raised
      sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
    >
      <CardContent>
        <Typography
          variant='h6'
          align='center'
        >
          {cardName}
        </Typography>
        <Suspense fallback={<Fallback />}>
          <Await promise={promise}>
            <CardData type={type} />
          </Await>
        </Suspense>
      </CardContent>
    </Card>
  )
}

function CardData({ type, data }: CardContentProps) {
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

interface Props {
  cardName: ListMonitoringCardNameProps
  type: keyof MonitoringStatesProps
  promise: FetchData<MonitoringStatesProps>
}

interface CardContentProps {
  type: keyof MonitoringStatesProps
  data?: MonitoringStatesProps
}
