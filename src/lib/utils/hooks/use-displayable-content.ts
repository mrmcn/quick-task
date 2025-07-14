import { Content, Data } from '@/ui/common/forms/editable-text/types'
import { use } from 'react'

/**
 * @function useDisplayableContent
 * @description A React hook that determines how to retrieve content for display
 * within a component. It can accept either a direct string (`string`) or a `Data` object
 * containing a `Promise`. If it's a `Promise`, the hook uses React's `use()` function
 * to "unwrap" (resolve) the promise and get the desired data
 * or an error message.
 *
 * @param  data - The input data, which can be either:
 * - `string`: Directly displayable text.
 * - `{ promise: Promise<any>, key: string }`: An object containing a promise
 * (expected to resolve to an object with a `data` or `error` field)
 * and a key to extract the value from the `data` field.
 * @returns  - The displayable content, which is a string:
 * - The original string, if `data` was a string.
 * - The value retrieved from `resolved.data[data.key]`, if the promise resolved successfully.
 * - The error message from `resolved.error?.message`, if the promise rejected.
 */
export function useDisplayableContent(data: Data): Content {
  // Check if the input data is a string.
  if (typeof data !== 'string') {
    // If the data is not a string, it means it's an object containing a promise.
    // Use the `use()` hook to unwrap the promise.
    // React's `use()` automatically handles loading/error states
    // and simplifies components consuming async data.
    const resolved = use(data.promise) // 'data.promise' is an awaited result, containing either `data` or `error`

    // Check if there is data in the resolved promise.
    // If `resolved.data` exists, return the value at the specified `key`.
    // Otherwise (if `resolved.error` exists), return the error message.
    return resolved.data ? resolved.data[data.key] : resolved.error?.message
  } else {
    // If the data is a string, return it directly.
    return data
  }
}
