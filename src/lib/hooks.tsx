import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { $Enums } from '@prisma/client'
import { useState } from 'react'

export function useVisibility() {
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

export function useChoosingPriority(initialState: $Enums.Priority) {
  const [changePriority, setChangePriority] = useState(initialState)

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: $Enums.Priority | null,
  ) => {
    if (newAlignment !== null) setChangePriority(newAlignment)
  }
  return { changePriority, handleAlignment }
}
