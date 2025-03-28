import { authConfig } from '@/auth.config'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { EmailAndPasswordSchema } from './lib/zod/schema/user'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = EmailAndPasswordSchema.safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          const user = await getUser(email)
          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)
          console.log('passwordsMatch', passwordsMatch)

          if (passwordsMatch) return user
        }

        return null
      },
    }),
  ],
})

async function getUser(email: string) {
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
