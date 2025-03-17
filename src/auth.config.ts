import type { NextAuthConfig } from 'next-auth'
import { type DefaultSession } from 'next-auth'
import 'next-auth/jwt'
import { DASHBOARD_URL, SIGNIN_URL, USER_URL } from './lib/constants/url'

export const authConfig = {
  pages: {
    signIn: SIGNIN_URL,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith(DASHBOARD_URL)
      const isOnUser = nextUrl.pathname.startsWith(USER_URL)
      if (isOnDashboard || isOnUser) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL(DASHBOARD_URL, nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
  }
}
