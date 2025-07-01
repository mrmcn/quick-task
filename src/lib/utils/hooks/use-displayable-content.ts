import { Content, Data } from '@/ui/common/forms/editable-text/types'
import { use } from 'react'

export function useDisplayableContent(data: Data): Content {
  if (typeof data !== 'string') {
    const resolved = use(data.promise)
    return resolved.data ? resolved.data[data.key] : resolved.error?.message
  } else return data
}
