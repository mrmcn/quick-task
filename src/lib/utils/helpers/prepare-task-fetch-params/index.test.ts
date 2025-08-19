import { mockBadResponses, testError } from '@/lib/constants/test-const'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'
import {
  testSearchParamsObject,
  testTaskWhereInput,
} from '@/lib/utils/helpers/get-search-params/__mocks__/searchParams'
import { prepareTaskFetchParams } from '@/lib/utils/helpers/prepare-task-fetch-params/index'
import { testSession } from '../../../../../__mocks__/next-auth'

jest.mock('@/lib/utils/helpers/get-search-params/searchParams')
jest.mock('@/lib/services/queries/user/fetchUser')

describe('prepareTaskFetchParams', () => {
  test('should return valid response when uniqueData is successful', async () => {
    await expect(
      prepareTaskFetchParams(testSession.user.id, testSearchParamsObject),
    ).resolves.toEqual(testTaskWhereInput)
  })
  test('should throw an error when uniqueData fails', async () => {
    jest
      .mocked(fetchUser.uniqueData)
      .mockResolvedValueOnce(mockBadResponses.errorDB)
    await expect(
      prepareTaskFetchParams(testSession.user.id, testSearchParamsObject),
    ).rejects.toThrow(testError)
  })
})
