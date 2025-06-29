import {
  ListDefaultSearchParameter,
  ListSearchParameter,
} from '@/lib/constants/text-const'
import { Priority, Status } from '@prisma/client'

const { status, page, query, sorting, priority } = ListSearchParameter
const {
  defaultStatus,
  defaultPage,
  defaultQuery,
  defaultSort,
  defaultPriority,
} = ListDefaultSearchParameter

export const getSearchParams = (searchParamsObject?: SearchParamsObject) => {
  return {
    query: (searchParamsObject?.[query] as string) || defaultQuery,
    currentPage: Number(searchParamsObject?.[page] || defaultPage),
    sort: (searchParamsObject?.[sorting] as string) || defaultSort,
    status: (searchParamsObject?.[status] as Status) || defaultStatus,
    priority: (searchParamsObject?.[priority] as Priority) || defaultPriority,
  }
}

export type SearchParamsObject = {
  [key: string]: string | string[]
}
