import { auth } from '@/auth'
import { MockAuth } from '@/lib/utils/types'

export const mockedAuth = jest.mocked<MockAuth>(auth)
