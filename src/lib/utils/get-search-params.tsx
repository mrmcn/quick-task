import { Status } from '@prisma/client'
import {
  ListDefaultSearchParameter,
  ListSearchParameter,
} from '../constants/text-const'

export const getSearchParams = (
  searchParamsObject: OptionalSearchParamsObject,
) => {
  const { filter, page, query, sorting } = ListSearchParameter
  const { defaultFilter, defaultPage, defaultQuery, defaultSort } =
    ListDefaultSearchParameter

  return {
    query: (searchParamsObject?.[query] as string) || defaultQuery,
    currentPage: Number(searchParamsObject?.[page] || defaultPage),
    sort: (searchParamsObject?.[sorting] as string) || defaultSort,
    filter: (searchParamsObject?.[filter] as Status) || defaultFilter,
  }
}

export type SearchParamsObject = {
  [key: string]: string | string[] | undefined
}

export interface SearchParamsObjectProps {
  searchParamsObject?: OptionalSearchParamsObject
}

export type OptionalSearchParamsObject = SearchParamsObject | undefined
