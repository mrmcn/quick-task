import { PasswordInputType } from '@/lib/constants/text-const'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
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
