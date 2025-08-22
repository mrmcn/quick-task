import {
  searchParamsEmptyObject,
  testSearchParamsObjectWithPage,
  testSearchParamsObjectWithPriority,
  testSearchParamsObjectWithQuery,
  testSearchParamsObjectWithSort,
  testSearchParamsObjectWithStatus,
  testValidParamPage,
  testValidParamPriority,
  testValidParamQuery,
  testValidParamSort,
  testValidParamStatus,
} from '@/lib/constants/test-const'
import { DefaultSearchParameterList } from '@/lib/constants/text-const'
import { getValidateSearchParams } from '@/lib/utils/helpers/get-search-params/searchParams'
import { ValidateParamValueMap } from '@/lib/utils/types'

// Destructure constants for default values.
// These values are used if the corresponding search parameter is missing from the URL.
const {
  defaultStatus,
  defaultPage,
  defaultQuery,
  defaultSort,
  defaultPriority,
} = DefaultSearchParameterList
const expectedSearchParamsAllDefault: ValidateParamValueMap = {
  page: Number(defaultPage),
  priority: defaultPriority,
  query: defaultQuery,
  sort: defaultSort,
  status: defaultStatus,
}
const getExpectedSearchParams = (
  overrides: Partial<ValidateParamValueMap> = {},
): ValidateParamValueMap => ({
  ...expectedSearchParamsAllDefault,
  ...overrides,
})

describe('getSearchParams', () => {
  test('returns default cases for each parameter because they are absent in searchParamsObject', () => {
    expect(getValidateSearchParams(searchParamsEmptyObject)).toEqual(
      getExpectedSearchParams(),
    )
  })
  test('returns page, the rest are defaults because they are absent', () => {
    expect(getValidateSearchParams(testSearchParamsObjectWithPage)).toEqual(
      getExpectedSearchParams(testValidParamPage),
    )
  })
  test('returns priority, the rest are defaults because they are absent', () => {
    expect(getValidateSearchParams(testSearchParamsObjectWithPriority)).toEqual(
      getExpectedSearchParams(testValidParamPriority),
    )
  })
  test('returns query, the rest are defaults because they are absent', () => {
    expect(getValidateSearchParams(testSearchParamsObjectWithQuery)).toEqual(
      getExpectedSearchParams(testValidParamQuery),
    )
  })
  test('returns sort, the rest are defaults because they are absent', () => {
    expect(getValidateSearchParams(testSearchParamsObjectWithSort)).toEqual(
      getExpectedSearchParams(testValidParamSort),
    )
  })
  test('returns status, the rest are defaults because they are absent', () => {
    expect(getValidateSearchParams(testSearchParamsObjectWithStatus)).toEqual(
      getExpectedSearchParams(testValidParamStatus),
    )
  })
})
