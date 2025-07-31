import { PAGES } from '@/lib/constants/routes'
import type { DefaultSession, NextAuthConfig } from 'next-auth'
import 'next-auth/jwt'

/**
 * @constant authConfig
 * @description Configuration object for NextAuth.js.
 * Defines authentication behavior, redirects, and authorization logic.
 */
export const authConfig = {
  // Defines the sign-in page to which the user will be redirected for authentication.
  pages: {
    signIn: PAGES.SIGNIN,
  },
  // Callbacks that run at different stages of the authentication process.
  callbacks: {
    /**
     * @function authorized
     * @description Controls access to pages based on the user's authentication status.
     * Prevents unauthorized access to protected routes and redirects authorized users.
     *
     * @param auth - User session object or `null` if the user is not authenticated.
     * @param request - The request object containing the request URL.
     * @returns `true` if access is allowed, `false` if access is denied (redirects to sign-in page),
     * or `Response.redirect` to redirect authenticated users.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user // Check if the user is logged in.
      // Check if the **request is targeting** the protected dashboard or user pages.
      const isOnDashboard = nextUrl.pathname.startsWith(PAGES.DASHBOARD)
      const isOnUser = nextUrl.pathname.startsWith(PAGES.USER)

      // If the **request is for** the dashboard or user page:
      if (isOnDashboard || isOnUser) {
        if (isLoggedIn) return true // If logged in, allow access.
        return false // If not logged in, deny access (will redirect to the sign-in page).
      } else if (isLoggedIn) {
        // If the user is logged in and the **request is NOT for** a protected page,
        // redirect them to the dashboard.
        return Response.redirect(new URL(PAGES.DASHBOARD, nextUrl))
      }

      // Allow access to all other pages (e.g., sign-in page, public pages).
      return true
    },

    /**
     * @function jwt
     * @description Adds the user's ID to the JWT token.
     * This allows the user's ID to be stored in the token, which will be accessible in the session.
     *
     * @param token - The current JWT token.
     * @param user - The user object returned from the authentication provider.
     * @returns The modified token.
     */
    jwt({ token, user }) {
      if (user) {
        token.id = user.id // Add the user's ID to the token.
      }
      return token // Return the updated token.
    },

    /**
     * @function session
     * @description Adds the user's ID from the token to the session object.
     * This makes the user's ID accessible via `useSession` in client components.
     *
     * @param session - The current session object.
     * @param token - The JWT token containing the user's ID.
     * @returns The modified session object.
     */
    session({ session, token }) {
      return {
        ...session, // Spread existing session properties.
        user: {
          ...session.user, // Spread existing properties of the user object within the session.
          id: token.id, // Add the user's ID from the token to the user object in the session.
        },
      }
    },
  },
  // Authentication providers (e.g., Google, GitHub, Credentials).
  // These will be defined in auth.ts, which imports this auth.config.
  providers: [],
} satisfies NextAuthConfig // Use `satisfies` to check the type without changing the object.

// Type extensions for NextAuth.
// This informs TypeScript about the additional properties we're adding to the Session and JWT objects.

declare module 'next-auth' {
  // Extend the `Session` interface to include `id` for the user.
  interface Session {
    user: {
      id: string // Add `id` as a required field to the user object in the session.
    } & DefaultSession['user'] // Preserve other standard user properties.
  }
}

declare module 'next-auth/jwt' {
  // Extend the `JWT` interface to include an optional `id`.
  interface JWT {
    id?: string // Add `id` as an optional field to the JWT token.
  }
}
