import { authConfig } from '@/auth.config'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { fetchUserAllData } from './lib/services/queries/user'
import { validateAuthData } from './lib/zod/validate'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validData = validateAuthData(credentials)
        if (validData) {
          const { data } = await fetchUserAllData(validData.email)
          if (!data) return null

          const passwordsMatch = await bcrypt.compare(
            validData.password,
            data.password,
          )

          if (passwordsMatch) return data
        }

        return null
      },
    }),
  ],
})
