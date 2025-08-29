import { fetchUser } from '@/lib/services/queries/user/fetchUser'

export const mockedFetchUserUniqueData = jest.mocked(fetchUser.uniqueData)
