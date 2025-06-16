import { UserFieldType } from '@/lib/services/queries/types'
import { Data, TaskFieldType } from '@/ui/common/forms/editable-text'
import { User } from '@prisma/client'
import { use } from 'react'

export function useDisplayableContent(data: Data): Content {
  if (data instanceof Promise) {
    const resolvedData = use(data)
    const content = resolvedData.data ?? resolvedData.error?.message
    return content
  } else return data
}

export type Content = UserFieldType<keyof User> | TaskFieldType
