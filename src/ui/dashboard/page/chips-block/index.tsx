import { LIST_CHIPS_CONFIG } from '@/lib/constants/data/ui-config'
import { fetchTask } from '@/lib/services/queries/task/task'
import { AsyncChipContent } from '@/ui/dashboard/page/chips-block/async-chip-content'
import ChipContent from '@/ui/dashboard/page/chips-block/chip-content'
import SortSelectorChip from '@/ui/dashboard/page/chips-block/sort-selector-chip'
import { sxDashboardPage } from '@/ui/dashboard/page/styles'
import Stack from '@mui/material/Stack'
import { Suspense } from 'react'

/**
 * @function ChipsBlock
 * @description A Server Component responsible for rendering the filter and sort chips block.
 * It initiates asynchronous data fetching on the server and dynamically renders chips based on their configuration.
 *
 * @returns A container with all filter chips and the sort selector.
 */
export default function ChipsBlock() {
  const statusStatePromise = fetchTask.statusCounts()

  // Iterate through the chip configurations to generate the corresponding components.
  const listTask = LIST_CHIPS_CONFIG.map((chipConfig) => {
    // If the chip is marked as asynchronous, use AsyncChipContent.
    if (chipConfig.asyncChip)
      return (
        <AsyncChipContent
          key={chipConfig.chipName}
          chipConfig={chipConfig}
          statusStatePromise={statusStatePromise}
        />
      )
    // If the chip is not asynchronous, use the standard ChipContent.
    return (
      <ChipContent
        key={chipConfig.chipName}
        chipConfig={chipConfig}
      />
    )
  })

  return (
    <Stack
      direction={{ xs: 'row', md: 'column' }}
      spacing={1}
      sx={sxDashboardPage.stack}
    >
      {listTask}
      {/* SortSelectorChip is a client component (it uses `useSearchParams`).
          We wrap it in Suspense so that its asynchronous operations (if any, or simply for better control)
          do not block the rendering of the rest of the block. */}
      <Suspense>
        <SortSelectorChip />
      </Suspense>
    </Stack>
  )
}
