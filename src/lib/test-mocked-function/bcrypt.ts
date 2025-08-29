import { MockCompare, MockHash } from '@/lib/utils/types'
import bcrypt from 'bcrypt'

export const mockedBcryptCompare = jest.mocked<MockCompare>(bcrypt.compare)
export const mockedBcryptHash = jest.mocked<MockHash>(bcrypt.hash)
