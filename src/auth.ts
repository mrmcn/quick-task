import { authConfig } from '@/auth.config'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { fetchUserData } from './lib/services/queries/user'
import { EmailAndPasswordSchema } from './lib/zod/schema/user'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = EmailAndPasswordSchema.safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          const { data } = await fetchUserData(email)
          if (!data) return null

          const passwordsMatch = await bcrypt.compare(password, data.password)

          if (passwordsMatch) return data
        }

        return null
      },
    }),
  ],
})
