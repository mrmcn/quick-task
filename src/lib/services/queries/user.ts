import { auth } from '@/auth'
import { ListPhrases } from '@/lib/constants/text-const'
import { HOME_URL } from '@/lib/constants/url'
import prisma from '@/lib/prisma'
import { handleError } from '@/lib/utils/error-handling'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import { FetchData } from './task'

// await new Promise((resolve) => setTimeout(resolve, 3000));

export default async function fetchUserData(): FetchData<UserNameAndEmail> {
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
    const userName = userData.name ?? ListPhrases.user

    return { data: { name: userName, email: userData.email } }
  } catch (error) {
    return { error: handleError(error) }
  }
}

export type UserNameAndEmail = Pick<User, 'name' | 'email'>
