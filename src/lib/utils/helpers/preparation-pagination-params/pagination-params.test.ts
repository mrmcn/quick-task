import {
  testErrorPaginationParams,
  testInvalidTotalPagesResponses,
  testPaginationParamsWithCurrentPage1,
  testParamABCPage,
  testParamOnePage,
  testParamPage,
  testResponseWithError,
  testResponseWithValidData,
  testSuccessfulLimitParams,
  testSuccessPaginationParams,
} from '@/lib/constants/test-const'
import { ResponseObject, UserTasksResult } from '@/lib/services/types'
import { preparationPaginationParams } from '@/lib/utils/helpers/preparation-pagination-params/pagination-params'
import { ValueCurrentQueryParameter } from '@/lib/utils/types'

const testFunction = (
  testPage: ValueCurrentQueryParameter = testParamPage,
  testResponseResult: ResponseObject<UserTasksResult> = testResponseWithValidData.totalTwoPages,
) => preparationPaginationParams(testPage, testResponseResult)

describe('preparationPaginationParams - valid cases', () => {
  test('should return PaginationSuccessResult when preparationPaginationParams arguments are valid and currentPage = totalPages', () => {
    expect(testFunction()).toEqual(testSuccessPaginationParams)
  })
  test('should return currentPage equal to 1 when valueCurrentQueryParameter is null', () => {
    expect(testFunction(null)).toEqual(testPaginationParamsWithCurrentPage1)
  })
  test('should return PaginationSuccessResult when totalPages and currentPage equal firstPage', () => {
    expect(
      testFunction(testParamOnePage, testResponseWithValidData.totalOnePage),
    ).toEqual(testSuccessfulLimitParams.totalOnePage)
  })
})
describe('preparationPaginationParams - invalid totalPages', () => {
  test('should return PaginationErrorResult when userTasksResult has an error', () => {
    expect(testFunction(testParamPage, testResponseWithError)).toEqual(
      testErrorPaginationParams,
    )
  })
  test('should return PaginationErrorResult when totalPages is not a number', () => {
    expect(
      testFunction(testParamPage, testInvalidTotalPagesResponses.invalidType),
    ).toEqual(testErrorPaginationParams)
  })
  test('should return PaginationErrorResult when totalPages is less than 1', () => {
    expect(
      testFunction(testParamPage, testInvalidTotalPagesResponses.lessOne),
    ).toEqual(testErrorPaginationParams)
  })
  test('should return PaginationErrorResult when totalPages is undefined', () => {
    expect(
      testFunction(testParamPage, testInvalidTotalPagesResponses.undefined),
    ).toEqual(testErrorPaginationParams)
  })
})
describe('preparationPaginationParams - invalid currentPage', () => {
  test('should return PaginationErrorResult when valueCurrentQueryParameter is less than 1', () => {
    expect(testFunction('0')).toEqual(testErrorPaginationParams)
  })
  test('should return PaginationErrorResult when valueCurrentQueryParameter is not an integer', () => {
    expect(testFunction('1.5')).toEqual(testErrorPaginationParams)
  })
  test('should return PaginationErrorResult when valueCurrentQueryParameter is not a number (e.g. "abc")', () => {
    expect(testFunction(testParamABCPage)).toEqual(testErrorPaginationParams)
  })
  test('should return PaginationErrorResult when currentPage is greater to countPages', () => {
    expect(testFunction('3')).toEqual(testErrorPaginationParams)
  })
})
