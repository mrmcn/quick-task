import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Priority, Task } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { PasswordInputType } from './constants/text-const'
import { TaskId } from './services/queries/task'
import { debounce } from './utils/debounce'

export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

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
  const handlePriority = (
    event: React.MouseEvent<HTMLElement>,
    newPriority: Task['priority'] | null,
  ) => {
    if (newPriority !== null) setPriority(newPriority)
  }

  return { changePriority, handlePriority }
}

export function useUrlReplacement() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = debounce((value) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  })
  return handleSearch
}
