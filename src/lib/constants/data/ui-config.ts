import {
  ListBtnNames,
  ListChipNames,
  ListSearchParameter,
  ListSortingParameter,
} from '@/lib/constants/text-const'
import { ChipsConfigProps } from '@/ui/dashboard/page/chips-block/types'
import { Priority, Status } from '@prisma/client'

export const LIST_CHIPS_CONFIG: ChipsConfigProps[] = [
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

export const sortOptionsConfig = [
  { value: ListSortingParameter.titleAsc, content: ListBtnNames.titleAtoZ },
  { value: ListSortingParameter.titleDesc, content: ListBtnNames.titleZtoA },
  {
    value: ListSortingParameter.dateDesc,
    content: ListBtnNames.newestToOldest,
  },
  { value: ListSortingParameter.dateAsc, content: ListBtnNames.oldestToNewest },
] as const

export const PAGE_VALUE = [3, 4, 5, 7, 10] as const
export type PageValue = (typeof PAGE_VALUE)[number]
export const SWIPE_HIDDEN_WIDTH_MOBILE = 60
export const SWIPE_HIDDEN_WIDTH_DESKTOP = 100
export const SWIPE_THRESHOLD_PERCENTAGE = 0.3
