import Await from '@/lib/components/await'
import {
  ListChipNames,
  ListPriorityField,
  ListSearchParameter,
  ListStatusField,
} from '@/lib/constants/text-const'
import { fetchMonitoringStates } from '@/lib/services/queries/task'
import SortSelectorChip from '@/ui/dashboard/page/block-of-chips/task-sort'
import { TaskParamChip } from '@/ui/dashboard/page/block-of-chips/task-status-chip'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { Suspense } from 'react'

export default function BlockOfChips() {
  const monitoringStatesPromise = fetchMonitoringStates()
  const {
    completed: nameCompleted,
    pending,
    priorityHigh,
    priorityLow,
  } = ListChipNames
  const { completed, in_progress } = ListStatusField
  const { high, low } = ListPriorityField
  const { status, priority } = ListSearchParameter

  return (
    <Stack
      direction={{ xs: 'row', md: 'column' }}
      spacing={1}
      sx={{
        mt: 1,
        alignItems: { xs: 'center', md: 'normal' },
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        rowGap: 1.3,
      }}
    >
      <TaskParamChip
        chipName={priorityHigh}
        filterValue={high}
        filteringParam={priority}
      />
      <TaskParamChip
        chipName={priorityLow}
        filterValue={low}
        filteringParam={priority}
      />
      <Suspense fallback={<Fallback />}>
        <Await promise={monitoringStatesPromise}>
          <TaskParamChip
            chipName={nameCompleted}
            filterValue={completed}
            filteringParam={status}
          />
        </Await>
      </Suspense>
      <Suspense fallback={<Fallback />}>
        <Await promise={monitoringStatesPromise}>
          <TaskParamChip
            chipName={pending}
            filterValue={in_progress}
            filteringParam={status}
          />
        </Await>
      </Suspense>
      <Suspense>
        <SortSelectorChip />
      </Suspense>
    </Stack>
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
