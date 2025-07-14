import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * @function useNextNavigation
 * @description A custom React hook that combines and provides convenient access
 * to three essential Next.js navigation hooks: `useSearchParams`, `usePathname`, and `useRouter`.
 *
 * @returns  - An object containing:
 * - `searchParams`: The `URLSearchParams` object of the current URL.
 * - `pathname`: A string representing the current URL pathname.
 * - `router`: The Next.js Router instance, allowing for programmatic navigation.
 */
export function useNextNavigation() {
  // Get the current search parameters from the URL.
  const searchParams = useSearchParams()
  // Get the current pathname from the URL.
  const pathname = usePathname()
  // Get the Next.js router instance.
  const router = useRouter()

  // Return an object containing all obtained navigation data.
  return { searchParams, pathname, router }
}
