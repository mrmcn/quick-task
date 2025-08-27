import {
  searchParamsEmptyObject,
  testEmptySearchParams,
  testSearchParamsObjectWithQuery,
  testWithSearchParams,
} from '@/lib/constants/test-const'
import { formatSearchParams } from '@/lib/utils/helpers/format-search-params/index'

// Describes a test suite for the formatSearchParams function.
// This groups all related tests under a single logical block.
describe('formatSearchParams', () => {
  // This test checks a basic scenario with a single parameter.
  // It's a "sanity" test that confirms the function works in the simplest case.
  test('should correctly format an object with a single parameter', () => {
    // We assert that the function's return value matches the expected string.
    expect(formatSearchParams(testSearchParamsObjectWithQuery)).toBe(
      testWithSearchParams,
    )
  })

  // This test checks a crucial edge case: an empty object.
  // It helps ensure the function correctly handles a lack of data.
  test('should return an empty query string for an empty object', () => {
    // We verify that the function returns the correct string.
    expect(formatSearchParams(searchParamsEmptyObject)).toBe(
      testEmptySearchParams,
    )
  })

  // This test checks another critical edge case: an undefined input.
  // It confirms that the function is robust and handles a missing argument gracefully.
  test('should return an empty query string if the object is not provided', () => {
    // We verify that the function correctly handles an undefined value.
    expect(formatSearchParams(undefined)).toBe(testEmptySearchParams)
  })
})
