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
        // 1. Validate the input credentials (email and password) using a Zod schema.
        const validData = validateData(
          credentials, // The object containing username/email and password.
          userSchemes.emailAndPasswordInput, // The schema for validation.
        )

        // If the data is valid, proceed.
        if (validData) {
          // 2. Fetch user data from the database by email.
          // Use `AUTH_DATA_SELECT` to retrieve only the necessary fields (specifically the hashed password).
          const { data } = await fetchUser.uniqueData(AUTH_DATA_SELECT, {
            email: validData.email,
          })

          // If no user is found with the given email, return `null`.
          if (!data) return null

          // 3. Compare the provided password with the hashed password from the database.
          const passwordsMatch = await bcrypt.compare(
            validData.password, // Password provided by the user.
            data.password, // Hashed password from the database.
          )

          // 4. If passwords match, return the user data (the object that will be saved in the session).
          if (passwordsMatch) return data
        }

        // If validation fails, no user is found, or passwords don't match, return `null`.
        // `null` tells NextAuth that authentication failed.
        return null
      },
    }),
  ],
})
