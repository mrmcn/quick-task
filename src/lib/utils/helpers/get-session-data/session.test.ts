import { mockedNotAuth } from '@/lib/test-mocks/auth'
import { getSessionData } from '@/lib/utils/helpers/get-session-data/session'
import { redirect } from 'next/navigation'
import { expectedAuthData } from './__mocks__/session'

describe('getSessionData', () => {
  test('when the user is authenticated', async () => {
    await expect(getSessionData()).resolves.toEqual(expectedAuthData)
  })
  test('when the user is not authenticated', async () => {
    mockedNotAuth.mockResolvedValueOnce(null)

    await getSessionData()
    expect(redirect).toHaveBeenCalledWith('/signin')
  })
})
