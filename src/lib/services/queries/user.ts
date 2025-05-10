import { auth } from '@/auth'
import { HOME_URL } from '@/lib/constants/url'
import prisma from '@/lib/prisma'
import { handleError } from '@/lib/utils/error-handling'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import { FetchData } from './task'

// await new Promise((resolve) => setTimeout(resolve, 3000))

export async function fetchUserData(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export async function fetchUserEmail(): FetchData<UserData> {
  const session = await auth()

  if (!session) redirect(HOME_URL)
  const userId = session.user.id
  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        email: true,
      },
    })

    return { data: userData.email }
  } catch (error) {
    return { error: handleError(error) }
  }
}

export async function fetchUserName(): FetchData<UserData> {
  const session = await auth()

  if (!session) redirect(HOME_URL)
  const userId = session.user.id
  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        name: true,
      },
    })
    return { data: userData.name }
  } catch (error) {
    return { error: handleError(error) }
  }
}

export type UserData = User['name' | 'email']
