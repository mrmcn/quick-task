import { FetchData } from '@/lib/services/types'
import { use } from 'react'
import { HandleError } from '../utils/error-handling/type'

// This component is used to enable the use of a fallback UI while awaiting a 'promise'.
// The 'promise' is used to fetch data for pre-filling the form.

{
  /* <Await promise={promise} >
{(props)=><MyComponent {...props} />}
</Await> */
}

export default function Await<T>({
  promise,
  errorElement,
  children,
}: AwaitProps<T>) {
  const { data, error } = use(promise)

  if (error && errorElement) return errorElement(error)
  if (error) throw error
  if (data) return children(data)
  return undefined
}

interface AwaitProps<T> {
  promise: FetchData<T>
  children: (props: T) => React.ReactNode
  errorElement?: (error: HandleError) => React.ReactNode
}
