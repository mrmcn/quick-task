import { authConfig } from '@/auth.config'
import { fetchUser } from '@/lib/services/queries/user'
import { userSchemes } from '@/lib/utils/zod/schema/user'
import { validateData } from '@/lib/utils/zod/validate'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { AUTH_DATA_SELECT } from './lib/db/selects'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validData = validateData(
          credentials,
          userSchemes.emailAndPasswordInput,
        )
        if (validData) {
          const { data } = await fetchUser.uniqueData(AUTH_DATA_SELECT, {
            email: validData.email,
          })
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
