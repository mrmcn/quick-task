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
  // State to track whether the input field is visible (true) or hidden (false).
  const [isInputVisible, setIsInputVisible] = useState(false)

  /**
   * @function handleSearchIconClick
   * @description A click event handler function that sets the `isInputVisible` state to `true`,
   * making the input field visible.
   */
  const handleSearchIconClick = () => {
    setIsInputVisible(true)
  }

  /**
   * @function handleOnBlur
   * @description A blur event handler function for the input field.
   * If the input field's value is empty after losing focus, it becomes hidden.
   *
   * @param {React.FocusEvent<HTMLInputElement>} e - The focus event object, containing information about the target element.
   */
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Check if the length of the target element's value is 0.
    if (e.target.value.length === 0) {
      // If the field is empty, set `isInputVisible` to `false`, hiding the field.
      setIsInputVisible(false)
    }
  }

  return { isInputVisible, handleOnBlur, handleSearchIconClick }
}
