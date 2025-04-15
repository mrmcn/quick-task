import { Priority, Status } from '@prisma/client'
import {
  ListDefaultSearchParameter,
  ListSearchParameter,
} from '../constants/text-const'

export const getSearchParams = (
  searchParamsObject: OptionalSearchParamsObject,
) => {
  const { status, page, query, sorting, priority } = ListSearchParameter
  const {
    defaultStatus,
    defaultPage,
    defaultQuery,
    defaultSort,
    defaultPriority,
  } = ListDefaultSearchParameter

  return {
    query: (searchParamsObject?.[query] as string) || defaultQuery,
    currentPage: Number(searchParamsObject?.[page] || defaultPage),
    sort: (searchParamsObject?.[sorting] as string) || defaultSort,
    status: (searchParamsObject?.[status] as Status) || defaultStatus,
    priority: (searchParamsObject?.[priority] as Priority) || defaultPriority,
  }
}

export type SearchParamsObject = {
  [key: string]: string | string[] | undefined
}

export interface SearchParamsObjectProps {
  searchParamsObject?: OptionalSearchParamsObject
}

export type OptionalSearchParamsObject = SearchParamsObject | undefined
