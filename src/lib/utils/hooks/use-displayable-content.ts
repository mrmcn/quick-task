import { FetchData } from '@/lib/services/queries/task'
import { use } from 'react'

export function useDisplayableContent(data: string | FetchData<string>) {
  if (typeof data === 'string') {
    return data
  }
  const resolvedData = use(data)

  if (resolvedData.data !== undefined) return resolvedData.data
  return resolvedData.error
}
