import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useNextNavigation() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  return { searchParams, pathname, router }
}
