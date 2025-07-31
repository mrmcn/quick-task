import { authConfig } from '@/auth.config'
import NextAuth from 'next-auth'

// Initialize NextAuth with the imported configuration
// and export `auth` (the middleware) as the default export.
// This makes the authentication middleware available to Next.js.
export default NextAuth(authConfig).auth

/**
 * @constant config
 * @description Configuration object for Next.js Middleware.
 * Defines the routes to which this middleware should be applied.
 *
 * @property matcher - An array of path patterns for which the middleware will execute.
 * This specific pattern excludes:
 * - `/api` routes (API endpoints)
 * - `_next/static` (Next.js static assets)
 * - `_next/image` (Next.js optimized images)
 * - `.*\\.png$` (any `.png` files)
 * This ensures the middleware runs only for pages and not for static resources or API calls.
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
