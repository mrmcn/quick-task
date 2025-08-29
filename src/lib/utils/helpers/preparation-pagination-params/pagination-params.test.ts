import {
  testErrorPaginationParams,
  testInvalidTotalPagesResponses,
  testPaginationParamsWithCurrentPage1,
  testParamPage,
  testResponseWithError,
  testResponseWithValidData,
  testSuccessPaginationParams,
} from '@/lib/constants/test-const'
import { ResponseObject, UserTasksResult } from '@/lib/services/types'
import { preparationPaginationParams } from '@/lib/utils/helpers/preparation-pagination-params/pagination-params'
import { ValueCurrentQueryParameter } from '@/lib/utils/types'

const testFunction = (
  testPage: ValueCurrentQueryParameter = testParamPage,
  testResponseResult: ResponseObject<UserTasksResult> = testResponseWithValidData,
) => preparationPaginationParams(testPage, testResponseResult)

describe('preparationPaginationParams', () => {
  test('should return PaginationSuccessResult when preparationPaginationParams arguments are valid', () => {
    expect(testFunction()).toEqual(testSuccessPaginationParams)
  })
  test('should return currentPage equal to 1 when valueCurrentQueryParameter is null', () => {
    expect(testFunction(null)).toEqual(testPaginationParamsWithCurrentPage1)
  })
  test('should return PaginationErrorResult when userTasksResult has an error', () => {
    expect(
      preparationPaginationParams(testParamPage, testResponseWithError),
    ).toEqual(testErrorPaginationParams)
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
  test('should return PaginationErrorResult when valueCurrentQueryParameter is less than 1', () => {
    expect(testFunction('0')).toEqual(testErrorPaginationParams)
  })
  test('should return PaginationErrorResult when valueCurrentQueryParameter is not an integer', () => {
    expect(testFunction('1.5')).toEqual(testErrorPaginationParams)
  })
  test('should return PaginationErrorResult when currentPage is greater than or equal to countPages', () => {
    expect(testFunction('5')).toEqual(testErrorPaginationParams)
  })
})
