import { useState } from 'react'

/**
 * @function useEditableTextLogic
 * @description A custom hook to encapsulate the logic related to the text editing state.
 * It manages the `isEditing` state and provides props for the `Typography` component,
 * including a click handler to enter editing mode.
 *
 * @returns An object containing:
 * - `typographyProps`: An object of props for the `Typography` component, including `onClick`.
 * - `isEditing`: A boolean indicating whether the component is in editing mode.
 * - `setIsEditing`: A function to change the `isEditing` state.
 */
export function useEditableTextLogic() {
  // State to track whether the component is in editing mode.
  const [isEditing, setIsEditing] = useState(false)

  // Click handler that sets `isEditing` to `true`, transitioning to editing mode.
  const handleClick = () => {
    setIsEditing(true)
  }

  // Object of props for the Typography component, including styles and the click handler.
  // This object is created only once on the hook's initial render and does not change,
  // as all its values are static or depend on `setIsEditing`, which is stable.
  const typographyProps = {
    color: 'secondary', // Text color.
    onClick: handleClick, // Click handler to enter editing mode.
    style: { cursor: 'pointer', display: 'inline-block' }, // Styles for the cursor and element display.
  }

  // Return all necessary values and functions for use in the EditableText component.
  return { typographyProps, isEditing, setIsEditing }
}
