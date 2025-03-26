import { SearchParamsProps } from '@/app/dashboard/page'

export const formatSearchParams = (searchParams: SearchParamsProps) => {
  const searchParamsString = searchParams
    ? new URLSearchParams(searchParams).toString()
    : ''
  if (searchParamsString) return `?${searchParamsString}`
  return ''
}
