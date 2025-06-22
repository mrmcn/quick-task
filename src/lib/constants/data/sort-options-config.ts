import { ListBtnNames, ListSortingParameter } from '@/lib/constants/text-const'

export const sortOptionsConfig = [
  { value: ListSortingParameter.titleAsc, content: ListBtnNames.titleAtoZ },
  { value: ListSortingParameter.titleDesc, content: ListBtnNames.titleZtoA },
  {
    value: ListSortingParameter.dateDesc,
    content: ListBtnNames.newestToOldest,
  },
  { value: ListSortingParameter.dateAsc, content: ListBtnNames.oldestToNewest },
] as const
