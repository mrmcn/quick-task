/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextAuthConfig } from 'next-auth'
import { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true

        return false
      } else return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session({ session, token }) {
      console.log('session')

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
