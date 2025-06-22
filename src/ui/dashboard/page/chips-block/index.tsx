import { LIST_CHIPS_CONFIG } from '@/lib/constants/data/ui-config'
import { fetchTask } from '@/lib/services/queries/task'
import { AsyncChipContent } from '@/ui/dashboard/page/chips-block/async-chip-content'
import ChipContent from '@/ui/dashboard/page/chips-block/chip-content'
import SortSelectorChip from '@/ui/dashboard/page/chips-block/sort-selector-chip'
import { chipsBlock } from '@/ui/dashboard/page/chips-block/styles'
import Stack from '@mui/material/Stack'
import { Suspense } from 'react'

export default function ChipsBlock() {
  const statusStatePromise = fetchTask.statusCounts()
  const listTask = LIST_CHIPS_CONFIG.map((chipConfig) => {
    if (chipConfig.asyncChip)
      return (
        <AsyncChipContent
          key={chipConfig.chipName}
          chipConfig={chipConfig}
          statusStatePromise={statusStatePromise}
        />
      )
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
      sx={chipsBlock.stackSx}
    >
      {listTask}
      <Suspense>
        <SortSelectorChip />
      </Suspense>
    </Stack>
  )
}
