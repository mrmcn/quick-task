import {
  FetchData,
  MonitoringStatesProps,
  TaskId,
} from '@/lib/services/queries/task'
import { UserNameAndEmail } from '@/lib/services/queries/user'
import { notFound } from 'next/navigation'
import { cloneElement, isValidElement, ReactElement, use } from 'react'

// This component is used to enable the use of a fallback UI while awaiting a 'promise'.
// The 'promise' is used to fetch data for pre-filling the form.

export default function Await({ promise, children }: AwaitEmailProps) {
  const { data, error } = use(promise)

  if (error) notFound()

  if (isValidElement(children)) {
    return cloneElement(children, { data })
  }

  return null
}

interface AwaitEmailProps {
  promise: FetchData<UserNameAndEmail | TaskId | MonitoringStatesProps>
  children: ReactElement<{
    data: UserNameAndEmail | TaskId | MonitoringStatesProps | null | undefined
  }>
}
