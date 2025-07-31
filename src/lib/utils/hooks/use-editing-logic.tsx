import { useDisplayableContent } from '@/lib/utils/hooks/use-displayable-content'
import { TextEditingProps } from '@/ui/common/forms/editable-text/types'
import { RenderProps } from '@/ui/common/forms/types'
import { CircularProgress, InputAdornment } from '@mui/material'
import { useActionState } from 'react'

/**
 * @function useEditingLogic
 * @description A custom hook that encapsulates the logic for managing the text editing state.
 * It handles interaction with Server Actions, prepares content for display,
 * generates props for the input field, and manages the logic for exiting editing mode.
 *
 * @param props - The props passed to the `TextEditing` component.
 *
 * @returns An object containing:
 * - `state`: The current state of the Server Action (success or error result).
 * - `formAction`: The Server Action function to be passed to the form's `action` prop.
 * - `isPending`: A boolean, `true` if the Server Action is awaiting a response.
 * - `editedText`: The JSX element of the rendered input field with all necessary props.
 */
export function useEditingLogic(props: TextEditingProps) {
  const [state, formAction, isPending] = useActionState(props.action, undefined)

  // The `useDisplayableContent` hook resolves a promise or directly gets a string from `props.data`.
  // Ensures that `content` is always a ready-to-display string.
  const content = useDisplayableContent(props.data)

  // Define `endAdornment` for the input field: a loading indicator if the action is pending.
  const endAdornment = isPending ? (
    <InputAdornment position='end'>
      <CircularProgress
        size={20}
        color='secondary'
      />
    </InputAdornment>
  ) : undefined // If not pending, no adornment.

  // Event handler for the `onBlur` event of the input field: exits editing mode.
  const handleBlur = () => {
    props.setIsEditing(false) // Sets the `isEditing` state of the EditableText component to `false`.
  }

  // Conditional `onBlur` handler: only allows exiting editing mode when the Server Action
  // is not in a "pending" state, to prevent premature closing.
  const onBlurWithPending = !isPending ? handleBlur : undefined

  // Object of props that will be passed to the `props.renderEditedText` function
  // to configure the input field (e.g., a Material-UI TextField).
  const renderEditedTextProps: RenderProps = {
    defaultValue: content, // Initial value of the input field.
    disabled: isPending, // Disables the field if the action is pending.
    autoFocus: true, // Automatically focuses the field on render.
    onBlur: onBlurWithPending, // Apply the conditional blur handler.
    margin: 'none', // No outer margins.
    size: 'small', // Small size for the input field.
    slotProps: {
      input: {
        endAdornment: endAdornment, // Adornment at the end of the input (loading indicator).
      },
    },
  }

  // Call `props.renderEditedText` with the prepared props
  // to get the actual JSX element of the input field.
  const editedText = props.renderEditedText(renderEditedTextProps)

  return { state, formAction, isPending, editedText }
}
