'use client'

import Await from '@/lib/components/await'
import { HandleError } from '@/lib/utils/error-handling/type'
import TextEditing from '@/ui/common/forms/editable-text/text-editing'
import {
  Data,
  EditableTextProps,
  RenderViewText,
} from '@/ui/common/forms/editable-text/types'
import Skeleton from '@mui/material/Skeleton'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Dispatch, JSX, SetStateAction, Suspense, useState } from 'react'

/**
 * The EditableText component provides inline text editing functionality.
 * It toggles between a viewing and an editing state.
 */
export function EditableText({
  renderEditedText, // Function to render the input field for editing. Receives TextFieldProps.
  renderViewText, // Function to render the text for viewing. Receives TypographyProps and data.
  action, // Next.js Server Action to save the edited text.
  data, // The data to display. Can be a string or a FetchData promise.
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)

  const viewingText = getViewingText(data, setIsEditing, renderViewText)

  if (isEditing)
    return (
      <TextEditing
        action={action}
        renderEditedText={renderEditedText}
        setIsEditing={setIsEditing}
        data={data}
      />
    )

  return <>{viewingText}</>
}

/**
 * Function to get the JSX element that displays the text in the viewing state.
 * Handles both synchronous strings and asynchronous promises.
 */
function getViewingText(
  data: Data, // The data to display. Can be a string or a FetchData promise.
  setIsEditing: Dispatch<SetStateAction<boolean>>, // Function to set the editing state.
  renderViewText: RenderViewText, // Function to render the text for viewing.
): JSX.Element {
  const typographyProps = getTypographyProps(setIsEditing)
  const viewingText =
    typeof data !== 'string' ? (
      <Suspense fallback={<Skeleton width={40} />}>
        <Await
          promise={data.promise}
          errorElement={errorElement}
        >
          {(res) => renderViewText(typographyProps, res[data.key])}
        </Await>
      </Suspense>
    ) : (
      renderViewText(typographyProps, data)
    )

  return viewingText
}

const errorElement = (error: HandleError) => (
  <Typography color='error'>{error.message}</Typography>
)

/**
 * Function to generate props for the Typography element that displays the text for viewing.
 * Includes a click handler to enter the editing state.
 */
function getTypographyProps(
  setIsEditing: Dispatch<SetStateAction<boolean>>,
): TypographyProps {
  const handleClick = () => {
    setIsEditing(true) // Enter editing state on click.
  }
  const typographyProps: TypographyProps = {
    color: 'secondary',
    onClick: handleClick,
    style: { cursor: 'pointer', display: 'inline-block' }, // Indicates that the element is clickable and restricts its width to the content.
  }
  return typographyProps
}
