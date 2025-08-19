import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import { useCallback, useState } from 'react'

/**
 * @function usePasswordVisibility
 * @description A custom React hook for managing the visibility of a password input field.
 * It provides a state to control whether the password is displayed as plain text,
 * along with event handlers and an `IconButton` component (with Material-UI icons)
 * to toggle this visibility.
 *
 * @returns  - An object containing:
 * - `visibilityToggle`: A React element (IconButton) that serves as the visibility toggle icon.
 * - `type`: A string ('text' or 'password') to be passed to the `type` attribute of an `input` element
 * to control the password's visibility.
 */
export function usePasswordVisibility() {
  // State to track whether to show the password (true) or hide it (false).
  const [showPassword, setShowPassword] = useState(false)

  /**
   * @callback handleClickShowPassword
   * @description A memoized click event handler to toggle the `showPassword` state.
   * It inverts the current `showPassword` value.
   */
  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show) // Toggles the showPassword value
  }, []) // No dependencies, as the function does not rely on external values.

  /**
   * @callback handleMouseDownPassword
   * @description A memoized `onMouseDown` event handler for the toggle button.
   * It calls `event.preventDefault()` to prevent the password input field from losing focus
   * when the button is pressed down.
   * @param  event - The mouse event object.
   */
  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault() // Prevents the input field from losing focus
    },
    [], // No dependencies.
  )

  /**
   * @callback handleMouseUpPassword
   * @description A memoized `onMouseUp` event handler for the toggle button.
   * It calls `event.preventDefault()` to prevent the password input field from losing focus
   * when the button is released.
   * @param event - The mouse event object.
   */
  const handleMouseUpPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault() // Prevents the input field from losing focus
    },
    [], // No dependencies.
  )

  return {
    // The IconButton element that displays the eye or eye-off icon
    // and toggles password visibility on click.
    visibilityToggle: (
      <IconButton
        aria-label={showPassword ? 'hide the password' : 'display the password'} // Adds accessibility for screen readers
        onClick={handleClickShowPassword} // Click handler
        onMouseDown={handleMouseDownPassword} // Mouse down handler
        onMouseUp={handleMouseUpPassword} // Mouse up handler
        edge='end' // Positions the button at the end (right) of the input field
      >
        {/* Displays the appropriate icon based on the showPassword state */}
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    ),
    // Determines the input field type: 'text' to show password, 'password' to hide.
    type: showPassword ? 'text' : 'password',
  }
}
