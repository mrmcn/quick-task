import { Status } from '@prisma/client'

export const getSearchParams = (searchParams: SearchParamsProps) => {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const sort = searchParams?.sort || '{}'
  const filter = searchParams?.filter

  return { query, currentPage, sort, filter }
}

export type SearchParamsProps =
  | {
      query?: string
      page?: string
      sort?: string
      filter: Status
    }
  | undefined
