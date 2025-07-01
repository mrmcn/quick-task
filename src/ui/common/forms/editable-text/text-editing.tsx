'use client'

import { ListBtnNames } from '@/lib/constants/text-const'
import { useDisplayableContent } from '@/lib/utils/hooks/use-displayable-content'
import {
  Content,
  TextEditingProps,
} from '@/ui/common/forms/editable-text/types'
import RenderErrors from '@/ui/common/forms/render-errors'
import { RenderProps } from '@/ui/common/forms/text-fields/types'
import { CircularProgress, InputAdornment } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Dispatch, SetStateAction, useActionState } from 'react'

/**
 * The TextEditing component displays the form for editing the text.
 * It uses a server action to save the changes.
 */
export default function TextEditing({
  renderEditedText, // Function to render the input field for editing. Receives TextFieldProps.
  action, // Next.js Server Action to save the edited text.
  setIsEditing, // Function to set the editing state to false after saving or canceling.
  data, // The original data to display in the input field. Can be a string or a FetchData promise.
}: TextEditingProps) {
  const [state, formAction, isPending] = useActionState(action, undefined)
  const content = useDisplayableContent(data) // Gets the content ready for display (resolved promise or string).

  const editedText = renderEditedText(
    getTextFieldProps(isPending, setIsEditing, content),
  )

  return (
    <form action={formAction}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {editedText}
        <Button
          type='submit'
          disabled={isPending}
          sx={{ color: 'secondary.dark' }}
          onMouseDown={(e) => {
            e.preventDefault()
          }} // Prevents focus loss from the input field when clicking "Save".
        >
          {ListBtnNames.save}
        </Button>
      </Box>
      {/* Displays error messages from the server action. */}
      <RenderErrors state={state} />
    </form>
  )
}

/**
 * Function to generate props for the input field in the editing state.
 * Includes handling for loading state and blur event.
 */
function getTextFieldProps(
  isPending: boolean, // Whether the server action is currently pending.
  setIsEditing: Dispatch<SetStateAction<boolean>>, // Function to set the editing state.
  content: Content, // The current content to display in the input field.
): RenderProps {
  const endAdornment = isPending ? (
    <InputAdornment position='end'>
      <CircularProgress
        size={20}
        color='secondary'
      />
    </InputAdornment>
  ) : undefined
  const handleBlur = () => {
    setIsEditing(false) // Exit editing state on blur.
  }
  const onBlurWithPending = !isPending ? handleBlur : undefined // Prevents exiting editing state while saving.

  return {
    defaultValue: content,
    disabled: isPending,
    autoFocus: true,
    onBlur: onBlurWithPending,
    margin: 'none',
    size: 'small',
    slotProps: {
      input: {
        endAdornment: endAdornment,
      },
    },
  }
}
