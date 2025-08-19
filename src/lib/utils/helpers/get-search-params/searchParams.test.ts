import {
  testParamPage,
  testParamPriority,
  testParamQuery,
  testParamSort,
  testParamStatus,
} from '@/lib/constants/test-const'
import { DefaultSearchParameterList } from '@/lib/constants/text-const'
import { getSearchParams } from '@/lib/utils/helpers/get-search-params/searchParams'
import { ParamValueMap } from '@/lib/utils/types'

// Destructure constants for default values.
// These values are used if the corresponding search parameter is missing from the URL.
const {
  defaultStatus,
  defaultPage,
  defaultQuery,
  defaultSort,
  defaultPriority,
} = DefaultSearchParameterList
const expectedSearchParamsAllDefault: ParamValueMap = {
  page: defaultPage,
  priority: defaultPriority,
  query: defaultQuery,
  sort: defaultSort,
  status: defaultStatus,
}
const getExpectedSearchParams = (
  overrides: Partial<ParamValueMap> = {},
): ParamValueMap => ({
  ...expectedSearchParamsAllDefault,
  ...overrides,
})
const searchParamsAllDefault = {}

describe('getSearchParams', () => {
  test('returns default cases for each parameter because they are absent in searchParamsObject', () => {
    expect(getSearchParams(searchParamsAllDefault)).toEqual(
      getExpectedSearchParams(),
    )
  })
  test('returns page, the rest are defaults because they are absent', () => {
    expect(getSearchParams(testParamPage)).toEqual(
      getExpectedSearchParams(testParamPage),
    )
  })
  test('returns priority, the rest are defaults because they are absent', () => {
    expect(getSearchParams(testParamPriority)).toEqual(
      getExpectedSearchParams(testParamPriority),
    )
  })
  test('returns query, the rest are defaults because they are absent', () => {
    expect(getSearchParams(testParamQuery)).toEqual(
      getExpectedSearchParams(testParamQuery),
    )
  })
  test('returns sort, the rest are defaults because they are absent', () => {
    expect(getSearchParams(testParamSort)).toEqual(
      getExpectedSearchParams(testParamSort),
    )
  })
  test('returns status, the rest are defaults because they are absent', () => {
    expect(getSearchParams(testParamStatus)).toEqual(
      getExpectedSearchParams(testParamStatus),
    )
  })
})
