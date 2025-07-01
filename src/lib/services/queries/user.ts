import { AUTH_DATA_SELECT, AuthListDto } from '@/lib/db/selects'
import { userRepository } from '@/lib/repositories/prisma/user'
import { FetchData, FetchUser } from '@/lib/services/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/type'
import { getSessionData } from '@/lib/utils/helpers/get-session-data'
import { Prisma, User } from '@prisma/client'

// await new Promise((resolve) => setTimeout(resolve, 3000))

async function authData(email: User['email']): FetchData<AuthListDto> {
  try {
    const response = await userRepository.getSelectUser(
      { email },
      AUTH_DATA_SELECT,
    )

    return { data: response }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return { error: handleError(error as HandleErrorProps) }
  }
}

async function uniqueData<K extends Prisma.UserSelect>(
  select: K,
): FetchData<Prisma.UserGetPayload<{ select: K }>> {
  const { userId: id } = await getSessionData()

  try {
    const response = await userRepository.getSelectUser({ id }, select)

    return { data: response }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

// async function uniqueData<K extends ScalarUserFields>(
//   param: K,
// ): FetchUniqueUserData<K> {
//   const { userId: id } = await getSessionData()
//   const select = { [param]: true } as Prisma.UserSelect

//   try {
//     const response = await userRepository.getSelectUser({ id }, select)

//     return { data: response[param] as UserFieldType<K> }
//   } catch (error) {
//     return { error: handleError(error as HandleErrorProps) }
//   }
// }

export const fetchUser: FetchUser = {
  authData,
  uniqueData,
}
