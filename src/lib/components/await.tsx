import {
  FetchData,
  MonitoringStatesProps,
  TaskId,
  UserTasksResult,
} from '@/lib/services/queries/task'
import { notFound } from 'next/navigation'
import { cloneElement, isValidElement, ReactElement, use } from 'react'
import { UserData } from '../services/queries/user'

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
  promise: FetchData<
    UserData | TaskId | MonitoringStatesProps | UserTasksResult
  >
  children: ReactElement<{
    data: UserData | TaskId | MonitoringStatesProps | UserTasksResult
  }>
}
