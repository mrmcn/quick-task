import { useState } from 'react'

/**
 * @function useVisibility
 * @description A custom React hook for managing the visibility of an input field.
 *
 * @returns  - An object containing:
 * - `isInputVisible`: A boolean indicating whether the element is currently visible.
 * - `handleOnBlur`: An `onBlur` event handler for the input field. Hides the field if it's empty.
 * - `handleSearchIconClick`: A click event handler that makes the element visible.
 */
export function useVisibility() {
  const [isInputVisible, setIsInputVisible] = useState(false)
  const handleSearchIconClick = () => {
    setIsInputVisible(true)
  }
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setIsInputVisible(false)
    }
  }

  return { isInputVisible, handleOnBlur, handleSearchIconClick }
}
