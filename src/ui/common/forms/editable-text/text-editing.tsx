'use client'

import { BtnNamesList } from '@/lib/constants/text-const'
import { useEditingLogic } from '@/lib/utils/hooks/use-editing-logic'
import { TextEditingProps } from '@/ui/common/forms/editable-text/types'
import RenderErrors from '@/ui/common/forms/render-errors'
import { sxForms } from '@/ui/common/forms/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

/**
 * @component TextEditing
 * @description The `TextEditing` component displays the form for editing the text.
 * It uses a server action to save the changes.
 * All state logic and data preparation are encapsulated within the `useEditingLogic` custom hook.
 *
 * @param props - The component's props, including:
 * - `renderEditedText`: A function to render the input field for editing.
 * - `action`: The Next.js Server Action to save the edited text.
 * - `setIsEditing`: A function to set the editing state to false (exit editing mode).
 * - `data`: The original data to display in the input field (string or promise).
 *
 * @returns A form with a text editing field and a "Save" button.
 */
export default function TextEditing(props: TextEditingProps) {
  const { editedText, formAction, isPending, state } = useEditingLogic(props)

  return (
    <form action={formAction}>
      <Box sx={sxForms.textEditingBox}>
        {editedText}
        <Button
          type='submit'
          disabled={isPending}
          sx={sxForms.textEditingBtn}
          // `onMouseDown` prevents focus loss from the input field when clicking "Save",
          // allowing `onBlur` to trigger only after successful saving or cancellation.
          onMouseDown={(e) => e.preventDefault()}
        >
          {BtnNamesList.save}
        </Button>
      </Box>
      <RenderErrors state={state} />
    </form>
  )
}
