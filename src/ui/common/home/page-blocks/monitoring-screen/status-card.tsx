'use client'

import {
  ListError,
  ListMonitoringCardNameProps,
} from '@/lib/constants/text-const'
import { FetchData, MonitoringStatesProps } from '@/lib/services/queries/task'
import Await from '@/lib/utils/await'
import { useFilterParams } from '@/lib/utils/hooks/use-filter-params'
import { CardContent, Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

export function StatusCard({ cardName, type, promise }: Props) {
  const { handleChange, isActive } = useFilterParams(type)
  const bgColor = isActive ? 'primary.main' : 'primary.dark'

  return (
    <Card
      component='article'
      raised={isActive}
      sx={{
        bgcolor: bgColor,
        color: 'primary.contrastText',
      }}
    >
      <CardActionArea onClick={handleChange}>
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
      </CardActionArea>
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
