import { SearchParamsObject } from '@/lib/utils/types'

/**
 * @function formatSearchParams
 * @description Formats an object of search parameters into a URL query string.
 * This function converts an object where keys are parameter names and values are
 * either single strings or arrays of strings, into a URL-compatible format,
 * e.g., `?key1=value1&key2=valueA&key2=valueB`.
 *
 * @param  - An object containing the search parameters.
 * Keys are parameter names, and values are strings or arrays of strings.
 * Can be `undefined` if no parameters are provided.
 * @returns  - The formatted query string, starting with a question mark (`?`),
 * or an empty string if `searchParamsObject` is not provided or is empty.
 */
export function formatSearchParams(
  searchParamsObject?: SearchParamsObject,
): string {
  const params = new URLSearchParams()

  if (searchParamsObject) {
    // Iterate over all keys (parameter names) in the provided searchParamsObject.
    for (const key in searchParamsObject) {
      const value = searchParamsObject[key] // Get the value for the current key.

      // If the value is an array (e.g., `categories: ['sport', 'news']`),
      // iterate over each array element and append it as a separate parameter with the same key.
      // This creates a URL like `?categories=sport&categories=news`.
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v))
      }
      // If the value is not `undefined` (and not an array), append it as a single parameter.
      // This handles individual values, e.g., `query: 'hello'`.
      else if (value !== undefined) {
        params.append(key, value.toString())
      }
    }
  }

  return `?${params.toString()}`
}
