export const getSearchParams = (searchParams: SearchParamsProps) => {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  return { query, currentPage }
}

export type SearchParamsProps =
  | {
      query?: string
      page?: string
      sort?: string
    }
  | undefined
