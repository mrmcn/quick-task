import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Priority, Task } from '@prisma/client'
import { useState } from 'react'
import { TaskIdData } from './services/queries/task'
import { PasswordInputType } from './constants/text-const'

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

export function usePriorityState(task: TaskIdData | undefined) {
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
