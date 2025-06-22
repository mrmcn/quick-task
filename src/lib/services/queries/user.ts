import prisma from '@/lib/db/prisma'
import {
  FetchData,
  FetchUniqueUserData,
  FetchUser,
  ScalarUserFields,
  UserFieldType,
} from '@/lib/services/queries/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/type'
import { getSessionData } from '@/lib/utils/helpers/get-session-data'
import { Prisma, User } from '@prisma/client'

// await new Promise((resolve) => setTimeout(resolve, 3000))

async function allData(email: User['email']): FetchData<User> {
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

async function uniqueData<K extends ScalarUserFields>(
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

export const fetchUser: FetchUser = {
  allData,
  uniqueData,
}
