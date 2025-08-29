import { FetchData } from '@/lib/services/types'
import { HandleError } from '@/lib/utils/error-handling/types'
import { use } from 'react'

/**
 * The `Await` component (a Higher-Order Component) for handling asynchronous data.
 *
 * This component allows you to declaratively manage loading, success, and error states
 * for Promises consumed via React's `use` hook. It's ideal for pre-filling forms
 * or displaying asynchronously fetched data, while leveraging React's Suspense
 * and Error Boundary capabilities.
 *
 * @template T - The type of data expected from the Promise.
 *
 * @param props - The properties for the Await component.
 * @param props.promise - The Promise containing asynchronous data.
 * This Promise will be "unwrapped" by the `use()` hook,
 * and React Suspense will be activated while awaiting its resolution.
 * @param  props.children - A render prop function
 * that receives the successfully loaded data (`T`) as an argument. It's responsible
 * for rendering the UI after the Promise successfully resolves.
 * @param [props.errorElement] - An optional render prop function
 * that receives an error object (`HandleError`) as an argument. It's responsible for rendering
 * UI in case of an error during Promise resolution. If not provided, the error will be
 * re-thrown for the nearest Error Boundary to catch.
 *
 * @returns  - A React element that renders data, an error,
 * or `undefined` (if data is still loading and the component is in a Suspense state).
 *
 * @example
 * ```tsx
 * // Example Usage:
 * import { fetchDataForForm } from '@/lib/api'; // Assume this returns a Promise
 * import MyForm from './MyForm';
 *
 * function MyPage() {
 * const dataPromise = fetchDataForForm(); // Your Promise
 *
 * return (
 * <Suspense fallback={<LoadingSpinner />}>
 * <ErrorBoundary fallback={<div>Something went wrong loading form data.</div>}>
 * <Await promise={dataPromise} errorElement={(error) => <ErrorDisplay error={error} />}>
 * {(formData) => <MyForm initialData={formData} />}
 * </Await>
 * </ErrorBoundary>
 * </Suspense>
 * );
 * }
 * ```
 */
export default function Await<T>({
  promise,
  errorElement,
  children,
}: AwaitProps<T>) {
  const { data, error } = use(promise)

  // If the Promise was rejected and an `errorElement` is provided, render the custom error UI.
  if (error && errorElement) {
    return errorElement(error)
  }
  // If the Promise was rejected but no `errorElement` is provided, re-throw the error.
  // This allows the nearest React Error Boundary to handle it.
  if (error) {
    throw error
  }
  // If the Promise successfully resolved, pass the data to the `children` function for rendering.
  if (data) {
    return children(data)
  }
  // If the Promise is not yet resolved (i.e., no `data` and no `error`),
  // it means the component is in a pending (Suspense) state.
  // In this case, it returns `undefined`, allowing the Suspense Boundary to render its fallback.
  return undefined
}

/**
 * Interface for the properties of the `Await` component.
 *
 * @template T - The type of data expected from the Promise.
 */
interface AwaitProps<T> {
  /**
   * The Promise that returns data of type `T`. This Promise will be "unwrapped" by the `use` hook.
   */
  promise: FetchData<T>
  /**
   * A render prop function that receives the successfully loaded data (`T`)
   * and returns a React element to be rendered.
   */
  children: (props: T) => React.ReactNode
  /**
   * An optional render prop function that receives an error object (`HandleError`)
   * and returns a React element to display the error UI.
   * If not provided, errors will be re-thrown.
   */
  errorElement?: (error: HandleError) => React.ReactNode
}
