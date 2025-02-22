import { TaskFormProps } from '@/ui/dashboard/task-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { $Enums } from '@prisma/client'
import { useState } from 'react'

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
    type: showPassword ? 'text' : 'password',
  }
}

export function useTaskForm(task: TaskFormProps | null) {
  const [changePriority, setPriority] = useState(task?.priority ?? 'low') // editForm or createForm, for toggle btn

  const handlePriority = (
    event: React.MouseEvent<HTMLElement>,
    newPriority: $Enums.Priority | null,
  ) => {
    if (newPriority !== null) setPriority(newPriority)
  }
  return { changePriority, handlePriority }
}
