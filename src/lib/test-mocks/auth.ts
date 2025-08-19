import { auth } from '@/auth'
import { Session } from 'next-auth'

export const mockedNotAuth = jest.mocked<() => Promise<Session | null>>(auth)
