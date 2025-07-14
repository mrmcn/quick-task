import { userRepository } from '@/lib/repositories/prisma/user'
import { FetchData, FetchUser } from '@/lib/services/types'
import { handleError } from '@/lib/utils/error-handling'
import { HandleErrorProps } from '@/lib/utils/error-handling/type'
import { getSessionData } from '@/lib/utils/helpers/get-session-data'
import { Prisma } from '@prisma/client'

/**
 * Retrieves unique user data from the database.
 * By default, it uses the user ID from the current session
 * if `where` is not explicitly provided.
 *
 * @param select A Prisma select object specifying the fields to be returned.
 * @param where An optional Prisma UserWhereUniqueInput condition for finding a unique user.
 * If not provided, the user ID from the current session will be used.
 */
async function uniqueData<K extends Prisma.UserSelect>(
  select: K,
  where?: Prisma.UserWhereUniqueInput,
): FetchData<Prisma.UserGetPayload<{ select: K }>> {
  // If no specific search condition is provided,
  // we default to using the user ID from the current session.
  if (!where) {
    const { userId: id } = await getSessionData()
    where = { id }
  }

  try {
    const response = await userRepository.getSelectUser(where, select)

    return { data: response }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

/**
 * An object that aggregates functions for fetching user data.
 * Currently includes `uniqueData` for retrieving unique user records.
 */
export const fetchUser: FetchUser = {
  uniqueData,
}
