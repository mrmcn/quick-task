import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import { useCallback, useState } from 'react'

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
    visibilityToggle: (
      <IconButton
        aria-label={showPassword ? 'hide the password' : 'display the password'}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
        edge='end'
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    ),
    type: showPassword ? 'text' : 'password',
  }
}
