'use client'

import { HandleErrorProps } from '@/lib/utils/error-handling'
import Pagination from '@mui/material/Pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function PaginationRow({ data }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  if (data.error) return null
  const currentPage = Number(searchParams.get('page')) || 1
  const createPageURL = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number,
  ) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Pagination
      count={data.data}
      page={currentPage}
      onChange={createPageURL}
      sx={{ mt: 2 }}
    />
  )
}

interface Props {
  data:
    | {
        data: number
        error?: undefined
      }
    | {
        error: HandleErrorProps
        data?: undefined
      }
}
