import {
  searchParamsEmptyObject,
  testSearchParamsObjectWithQuery,
} from '@/lib/constants/test-const'
import { formatSearchParams } from '@/lib/utils/helpers/format-search-params/index'

const expectedEmptyString = '?'
// Expected output: a query string with a single parameter.
const expectedString = '?query=Test+query'

// Describes a test suite for the formatSearchParams function.
// This groups all related tests under a single logical block.
describe('formatSearchParams', () => {
  // This test checks a basic scenario with a single parameter.
  // It's a "sanity" test that confirms the function works in the simplest case.
  test('should correctly format an object with a single parameter', () => {
    // We assert that the function's return value matches the expected string.
    expect(formatSearchParams(testSearchParamsObjectWithQuery)).toBe(
      expectedString,
    )
  })

  // This test checks a crucial edge case: an empty object.
  // It helps ensure the function correctly handles a lack of data.
  test('should return an empty query string for an empty object', () => {
    // We verify that the function returns the correct string.
    expect(formatSearchParams(searchParamsEmptyObject)).toBe(
      expectedEmptyString,
    )
  })

  // This test checks another critical edge case: an undefined input.
  // It confirms that the function is robust and handles a missing argument gracefully.
  test('should return an empty query string if the object is not provided', () => {
    // We verify that the function correctly handles an undefined value.
    expect(formatSearchParams(undefined)).toBe(expectedEmptyString)
  })
})
