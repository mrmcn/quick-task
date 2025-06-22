import type { DefaultSession, NextAuthConfig } from 'next-auth'
import 'next-auth/jwt'
import { PAGES } from './lib/constants/url'

export const authConfig = {
  pages: {
    signIn: PAGES.SIGNIN,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith(PAGES.DASHBOARD)
      const isOnUser = nextUrl.pathname.startsWith(PAGES.USER)

      if (isOnDashboard || isOnUser) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL(PAGES.DASHBOARD, nextUrl))
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
