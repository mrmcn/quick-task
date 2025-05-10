import { FetchData } from '@/lib/services/queries/task'
import { use } from 'react'

// This component is used to enable the use of a fallback UI while awaiting a 'promise'.
// The 'promise' is used to fetch data for pre-filling the form.

{
  /* <Await />}>
{(props)=><MyComponent {...props} />}
</Await> */
}

export default function Await<T>({
  promise,
  errorElement,
  children,
}: AwaitEmailProps<T>) {
  const { data, error } = use(promise)

  if (error) return errorElement

  return children(data)
}

interface AwaitEmailProps<T> {
  promise: FetchData<T>
  children: (props: T) => React.ReactNode
  errorElement?: React.ReactNode
}
