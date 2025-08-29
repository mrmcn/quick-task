'use client'

import Await from '@/lib/components/await'
import { HandleError } from '@/lib/utils/error-handling/types'
import { useEditableTextLogic } from '@/lib/utils/hooks/use-editable-text-logic'
import TextEditing from '@/ui/common/forms/editable-text/text-editing'
import { EditableTextProps } from '@/ui/common/forms/editable-text/types'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

/**
 * @const ErrorElement
 * @description A component that displays an error message when asynchronous data fails to load.
 * @param error - The error object containing the message.
 * @returns A Typography component with the error message.
 */
const ErrorElement = (error: HandleError) => (
  <Typography color='error'>{error.message}</Typography>
)

/**
 * @component EditableText
 * @description The `EditableText` component provides inline text editing functionality.
 * It toggles between a viewing state (displaying text) and an editing state (displaying an input field).
 *
 * @param renderEditedText - Function to render the input field for the editing state.
 * @param renderViewText - Function to render the text for the viewing state.
 * @param action - Next.js Server Action to save the edited text to the database.
 * @param data - The data to display. Can be a string or a promise-like object for asynchronous loading.
 *
 * @returnsA component that toggles between displaying and editing text.
 */
export function EditableText({
  renderEditedText,
  renderViewText,
  action,
  data,
}: EditableTextProps) {
  const { typographyProps, isEditing, setIsEditing } = useEditableTextLogic()

  if (isEditing)
    return (
      <TextEditing
        action={action}
        renderEditedText={renderEditedText}
        setIsEditing={setIsEditing}
        data={data}
      />
    )

  if (typeof data !== 'string')
    return (
      <Suspense fallback={<Skeleton width={40} />}>
        <Await
          promise={data.promise}
          errorElement={ErrorElement}
        >
          {(res) => renderViewText(typographyProps, res[data.key])}
        </Await>
      </Suspense>
    )

  return renderViewText(typographyProps, data)
}
