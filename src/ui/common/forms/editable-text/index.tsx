'use client'

import Await from '@/lib/components/await'
import { ListError } from '@/lib/constants/text-const'
import { TaskListDto } from '@/lib/repositories/prisma/tasks'
import { ActionProps, StateProps } from '@/lib/services/actions/user'
import { FetchUniqueUserData, UserFieldType } from '@/lib/services/queries/user'
import Skeleton from '@mui/material/Skeleton'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { User } from '@prisma/client'
import { Dispatch, JSX, SetStateAction, Suspense, useState } from 'react'
import { RenderProps } from '../text-fields/my-text-field-props'
import TextEditing from './text-editing'

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
  data: Data, // The data to display.
  setIsEditing: Dispatch<SetStateAction<boolean>>, // Function to set the editing state.
  renderViewText: RenderViewText, // Function to render the text for viewing.
): JSX.Element {
  const typographyProps = getTypographyProps(setIsEditing)
  const viewingText =
    typeof data !== 'string' ? (
      <Suspense fallback={<Skeleton width={40} />}>
        <Await
          promise={data}
          errorElement={<ErrorElement />}
        >
          {(res) => renderViewText(typographyProps, res)}
        </Await>
      </Suspense>
    ) : (
      renderViewText(typographyProps, data)
    )

  return viewingText
}

function ErrorElement() {
  return <Typography color='error'>{ListError.failed}</Typography>
}

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

interface EditableTextProps extends BaseEditableTextProps {
  renderViewText: RenderViewText
}

export interface BaseEditableTextProps {
  data: Data
  action: ActionProps<StateProps>
  renderEditedText: (props: RenderProps) => React.ReactNode
}

type RenderViewText = (
  props: TypographyProps,
  viewData: TaskFieldType | UserFieldType<keyof User>,
) => JSX.Element

export type Data = TaskFieldType | FetchUniqueUserData<keyof User>
export type TaskFieldType = TaskListDto['details' | 'title']
