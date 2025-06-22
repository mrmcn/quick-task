import { ListChipNames, ListSearchParameter } from '@/lib/constants/text-const'
import { ChipsConfigProps } from '@/ui/dashboard/page/chips-block/types'
import { Priority, Status } from '@prisma/client'

const LIST_CHIPS_CONFIG: ChipsConfigProps[] = [
  {
    chipName: ListChipNames.priorityHigh,
    filterValue: Priority.high,
    filteringParam: ListSearchParameter.priority,
    asyncChip: false,
  },
  {
    chipName: ListChipNames.priorityLow,
    filterValue: Priority.low,
    filteringParam: ListSearchParameter.priority,
    asyncChip: false,
  },
  {
    chipName: ListChipNames.completed,
    filterValue: Status.completed,
    filteringParam: ListSearchParameter.status,
    asyncChip: true,
  },
  {
    chipName: ListChipNames.pending,
    filterValue: Status.in_progress,
    filteringParam: ListSearchParameter.status,
    asyncChip: true,
  },
]

export default LIST_CHIPS_CONFIG
