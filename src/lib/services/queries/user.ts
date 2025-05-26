import prisma from '@/lib/prisma'
import { handleError, HandleErrorProps } from '@/lib/utils/error-handling'
import { getSessionData } from '@/lib/utils/get-session-data'
import { User } from '@prisma/client'
import { FetchData } from './task'

// await new Promise((resolve) => setTimeout(resolve, 3000))

export async function fetchUserData(email: string): FetchData<User> {
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

export async function fetchUserEmail(): FetchData<UserEmail> {
  const { userId } = await getSessionData()

  try {
    const { email } = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        email: true,
      },
    })

    return { data: email }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

export async function fetchUserName(): FetchData<UserName> {
  const { userId } = await getSessionData()

  try {
    const { name } = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        name: true,
      },
    })
    return { data: name }
  } catch (error) {
    return { error: handleError(error as HandleErrorProps) }
  }
}

type UserName = User['name']
type UserEmail = User['email']
export type UserData = UserName | UserEmail
export type FetchUserData = FetchData<UserData>
