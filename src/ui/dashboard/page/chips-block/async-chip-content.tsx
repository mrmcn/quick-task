'use client'

import Await from '@/lib/components/await'
import ChipContent from '@/ui/dashboard/page/chips-block/chip-content'
import { sxDashboardPage } from '@/ui/dashboard/page/styles'
import { AsyncChipContentProps } from '@/ui/dashboard/page/types'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import { Suspense } from 'react'

/**
 * @function AsyncChipContent
 * @description A client component that renders a chip with asynchronous content.
 * It uses React Suspense and the `Await` component to manage the loading state
 * and display a skeleton while data is being fetched.
 *
 * @param chipConfig - Configuration for the chip (name, filtering parameter, etc.).
 * @param statusStatePromise - A Promise that resolves with monitoring state data.
 * This Promise is passed from the parent server component `ChipsBlock`.
 * @returnsThe `ChipContent` component or a `Fallback` skeleton.
 */
export function AsyncChipContent({
  chipConfig,
  statusStatePromise,
}: AsyncChipContentProps) {
  return (
    // Wrap the asynchronous content in Suspense to display the Fallback while the promise resolves.
    <Suspense fallback={<Fallback />}>
      {/* The Await component unwraps the promise, and its result (res) is passed to ChipContent. */}
      <Await promise={statusStatePromise}>
        {(res) => (
          // Render ChipContent with the received asynchronous data and chip configuration.
          <ChipContent
            data={res} // Data received from the resolved promise.
            chipConfig={chipConfig} // Chip configuration.
          />
        )}
      </Await>
    </Suspense>
  )
}

/**
 * @function Fallback
 * @description A helper component that displays a skeleton for `AsyncChipContent`
 * while its data is loading.
 *
 * @returns A Material-UI Chip component with a Skeleton inside.
 */
function Fallback() {
  return (
    <Chip
      variant='outlined'
      label={<Skeleton width={30} />}
      sx={sxDashboardPage.chipFallback}
    />
  )
}
