import { CountPagesProps } from '@/ui/dashboard/page/pagination'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { SelectChangeEvent } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Priority, Task } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { PasswordInputType } from './constants/text-const'
import { TaskId } from './services/queries/task'
import { debounce } from './utils/debounce'
import { paginationError } from './utils/error-handling'

export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show)
  }, [])

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    },
    [],
  )

  const handleMouseUpPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    },
    [],
  )

  return {
    input: {
      endAdornment: (
        <InputAdornment position='end'>
          <IconButton
            aria-label={
              showPassword ? 'hide the password' : 'display the password'
            }
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            onMouseUp={handleMouseUpPassword}
            edge='end'
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    },
    type: showPassword ? PasswordInputType.text : PasswordInputType.password,
  }
}

export function usePriorityState(task: TaskId | undefined) {
  const [changePriority, setPriority] = useState(
    task?.priority ?? Priority['low'],
  ) // editForm or createForm, for toggle btn
  const handlePriority = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      newPriority: Task['priority'] | null,
    ) => {
      if (newPriority !== null) setPriority(newPriority)
    },
    [],
  )

  return { changePriority, handlePriority }
}

export function useUrlReplacement() {
  const { searchParams, pathname, router } = useNextNavigation()

  const debounceSearch = debounce((searchParameter) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (searchParameter) {
      params.set('query', searchParameter)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
  })

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      debounceSearch(e.target.value)
    },
    [debounceSearch],
  )

  return handleSearch
}

export function useSortParams() {
  const { searchParams, pathname, router } = useNextNavigation()
  const sortParamsString = searchParams.get('sort')

  const selectValue = useMemo(
    () => parseSortParams(sortParamsString),
    [sortParamsString],
  )

  const getNewSortParams = useCallback(createNewSortParams, [])

  const handleSortChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const newSearchParams = getNewSortParams(e.target.value)

      if (!newSearchParams) return

      const params = new URLSearchParams(searchParams)
      params.set('sort', JSON.stringify(newSearchParams))
      router.push(`${pathname}?${params.toString()}`)
    },
    [getNewSortParams, searchParams, router, pathname],
  )

  return { handleSortChange, selectValue }
}

export function usePagination(countPages: CountPagesProps) {
  const { searchParams, pathname, router } = useNextNavigation()
  const pageParam = Number(searchParams.get('page'))

  const error = paginationError(countPages, pageParam)

  const currentPage = pageParam
  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, pageNumber: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', pageNumber.toString())
      router.replace(`${pathname}?${params.toString()}`)
    },
    [searchParams, router, pathname],
  )
  return { currentPage, handlePageChange, error }
}

// -------------------------------------------------------------------------------------------------------------------------------------

export function useNextNavigation() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  return { searchParams, pathname, router }
}

function parseSortParams(sortParamsString: string | null): string {
  if (!sortParamsString) return ''

  try {
    const parsedSort = JSON.parse(sortParamsString)
    return Object.entries(parsedSort)
      .map(([key, value]) => `${key} ${value}`)
      .join('')
  } catch (error) {
    console.error('Error JSON:', error)
    return ''
  }
}

function createNewSortParams(
  newSortingData: string,
): { [key: string]: string } | null {
  if (!newSortingData) return null

  const [field, order] = newSortingData.split(' ')

  if (!field || !order) return null

  return {
    [field]: order,
  }
}
