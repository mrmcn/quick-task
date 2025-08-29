import { authConfig } from '@/auth.config'
import { AUTH_DATA_SELECT } from '@/lib/db/selects'
import { fetchUser } from '@/lib/services/queries/user/fetchUser'
import { userSchemes } from '@/lib/utils/zod/schema/user'
import { validateData } from '@/lib/utils/zod/validate'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// Initialize NextAuth with the configuration.
// Export `auth`, `signIn`, and `signOut` for use in the application.
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig, // Spread the base settings from auth.config.ts
  providers: [
    // Configure the Credentials provider for username/password authentication.
    Credentials({
      // The `authorize` function is executed when a user attempts to sign in.
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

        // If validation fails, no user is found, or passwords don't match, return `null`.
        // `null` tells NextAuth that authentication failed.
        return null
      },
    }),
  ],
})
