import prisma from '@/lib/prisma'
import { handleError, HandleErrorProps } from '@/lib/utils/error-handling'
import { getSessionData } from '@/lib/utils/get-session-data'
import { Prisma, User } from '@prisma/client'
import { FetchData } from './task'

// await new Promise((resolve) => setTimeout(resolve, 3000))

export async function fetchUserAllData(email: User['email']): FetchData<User> {
  try {
    const response = await prisma.user.findUniqueOrThrow({
      where: { email: email },
    })

    return { data: response }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return { error: handleError(error as HandleErrorProps) }
  }
}

export async function fetchUniqueUserData<K extends ScalarUserFields>(
  param: K,
): FetchUniqueUserData<K> {
  const { userId: id } = await getSessionData()
  const select = { [param]: true } as Prisma.UserSelect

  try {
    const response = await prisma.user.findUniqueOrThrow({
      where: { id },
      select,
    })

    return { data: response[param] as UserFieldType<K> }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

type ScalarUserFields = keyof User
export type UserFieldType<K extends ScalarUserFields> = User[K]
export type FetchUniqueUserData<K extends ScalarUserFields> = FetchData<
  UserFieldType<K>
>
