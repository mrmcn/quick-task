'use client'
import Await from '@/lib/components/await'
import ChipContent from '@/ui/dashboard/page/chips-block/chip-content'
import { AsyncChipContentProps } from '@/ui/dashboard/page/chips-block/types'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import { Suspense } from 'react'

export function AsyncChipContent({
  chipConfig,
  statusStatePromise,
}: AsyncChipContentProps) {
  return (
    <Suspense fallback={<Fallback />}>
      <Await promise={statusStatePromise}>
        {(res) => (
          <ChipContent
            data={res}
            chipConfig={chipConfig}
          />
        )}
      </Await>
    </Suspense>
  )
}

function Fallback() {
  return (
    <Chip
      variant='outlined'
      label={<Skeleton width={30} />}
      sx={{ width: { md: 125 } }}
    />
  )
}
