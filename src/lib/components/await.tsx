import { use } from 'react'
import { FetchData } from '../services/queries/types'

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

  if (error) return errorElement

  return children(data)
}

interface AwaitProps<T> {
  promise: FetchData<T>
  children: (props: T) => React.ReactNode
  errorElement?: React.ReactNode
}
