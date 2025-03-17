import { auth } from '@/auth'
import { Phrases } from '@/lib/constants/text-const'
import { HOME_URL } from '@/lib/constants/url'
import prisma from '@/lib/prisma'
import { handleError, HandleErrorProps } from '@/lib/utils/error-handling'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'

// await new Promise((resolve) => setTimeout(resolve, 3000));

export default async function fetchUserData(): FetchUserData {
  const session = await auth()

  if (!session) redirect(HOME_URL)
  const userId = session.user.id
  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    })
    const userName = userData.name ?? Phrases.user

    return { data: { name: userName, email: userData.email } }
  } catch (error) {
    return { error: handleError(error) }
  }
}

export type FetchUserData = Promise<
  | {
      data: UserNameAndEmail
      error?: undefined
    }
  | {
      error: HandleErrorProps
      data?: undefined
    }
>

export type UserNameAndEmail = Pick<User, 'name' | 'email'>
