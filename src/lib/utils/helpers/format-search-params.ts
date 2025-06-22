import { SearchParamsObject } from '@/lib/utils/helpers/get-search-params'

export function formatSearchParams(searchParamsObject: Props): string {
  const params = new URLSearchParams()
  for (const key in searchParamsObject) {
    const value = searchParamsObject[key]
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v)) // Append multiple values for the same key
    } else if (value !== undefined) {
      params.append(key, value) // Append a single value for the key
    }
  }

  return `?${params.toString()}`
}

type Props = SearchParamsObject | undefined
