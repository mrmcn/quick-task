import {
  testPrismaSelectTasksPerPage,
  testResponseFetchErrorDB,
  testSearchParamsObject,
  testTasksRequestParams,
} from '@/lib/constants/test-const'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'
import { mockedFetchUserUniqueData } from '@/lib/test-mocked-function/fetch-user-unique-data'
import { prepareTaskFetchParams } from '@/lib/utils/helpers/prepare-task-fetch-params/index'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { testSession } from '../../../../../__mocks__/next-auth'
import { getValidateSearchParams } from '../get-search-params/searchParams'

jest.mock('@/lib/utils/helpers/get-search-params/searchParams')
jest.mock('@/lib/services/queries/user/fetchUser')

describe('prepareTaskFetchParams', () => {
  test('should return valid response when uniqueData is successful', async () => {
    await expect(
      prepareTaskFetchParams(testSession.user.id, testSearchParamsObject),
    ).resolves.toEqual(testTasksRequestParams)
    expect(fetchUser.uniqueData).toHaveBeenCalledWith(
      testPrismaSelectTasksPerPage,
    )
    expect(getValidateSearchParams).toHaveBeenCalledWith(testSearchParamsObject)
  })
  test('should throw an error when uniqueData fails', async () => {
    mockedFetchUserUniqueData.mockResolvedValueOnce(testResponseFetchErrorDB)
    await expect(
      prepareTaskFetchParams(testSession.user.id, testSearchParamsObject),
    ).rejects.toBeInstanceOf(PrismaClientKnownRequestError)
  })
})
