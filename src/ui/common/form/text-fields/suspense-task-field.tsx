import { ListError, TextFieldLabel } from '@/lib/constants/text-const'
import { FetchTaskData, TaskIdData } from '@/lib/services/queries/task'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { MyTextField } from './custom-text-field'

const noDataTemplate: Partial<TaskIdData> = {
  id: ListError.noData,
  summary: ListError.noData,
  details: ListError.noData,
}

export default function SuspenseTaskTextField({
  type,
  promise,
}: SuspenseProps) {
  const { data, error } = promise ? use(promise) : {}

  if (error && error.type !== 'database') notFound()
  const defaultValue = error ? noDataTemplate[type] : data?.[type] || undefined

  return (
    <MyTextField
      label={TextFieldLabel.summary}
      type='text'
      name='summary'
      id='summary'
      required
      defaultValue={defaultValue}
      margin='dense'
    />
  )
}

interface SuspenseProps {
  type: keyof TaskIdData
  promise: FetchTaskData<TaskIdData>
}
