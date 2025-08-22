import { mockedAuth } from '@/lib/test-mocks/auth'
import { expectedAuthData } from '@/lib/utils/helpers/get-session-data/__mocks__/session'
import { getSessionData } from '@/lib/utils/helpers/get-session-data/session'
import { redirect } from 'next/navigation'

describe('getSessionData', () => {
  test('when the user is authenticated', async () => {
    await expect(getSessionData()).resolves.toEqual(expectedAuthData)
  })
  test('when the user is not authenticated', async () => {
    mockedAuth.mockResolvedValueOnce(null)

    await getSessionData()
    expect(redirect).toHaveBeenCalledWith('/signin')
  })
})
