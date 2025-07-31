'use client'

import Await from '@/lib/components/await'
import { HandleError } from '@/lib/utils/error-handling/type'
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
  // Call the custom hook to encapsulate state logic and get Typography props.
  const { typographyProps, isEditing, setIsEditing } = useEditableTextLogic()

  // If the component is in editing mode, render the TextEditing component.
  if (isEditing)
    return (
      <TextEditing
        action={action} // The Server Action for saving data.
        renderEditedText={renderEditedText} // Function for rendering the input field.
        setIsEditing={setIsEditing} // Function to exit editing mode.
        data={data} // The current data.
      />
    )

  // If the data is asynchronous (an object with a promise), use Suspense and Await.
  if (typeof data !== 'string')
    return (
      <Suspense fallback={<Skeleton width={40} />}>
        {/* The Await component waits for the promise to resolve and passes the result to its children. */}
        <Await
          promise={data.promise} // The promise to be resolved.
          errorElement={ErrorElement} // Component to display if the promise rejects.
        >
          {/* A callback that renders the text after the data is fetched. */}
          {(res) => renderViewText(typographyProps, res[data.key])}
        </Await>
      </Suspense>
    )

  // If the data is synchronous (a string), simply render the text.
  return renderViewText(typographyProps, data)
}
