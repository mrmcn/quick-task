'use client'

import { NameAttributeList } from '@/lib/constants/text-const'
import { updateTaskDetails, updateTaskTitle } from '@/lib/services/actions/task'
import { EditableText } from '@/ui/common/forms/editable-text'
import TaskTextField from '@/ui/common/forms/text-fields/task-text-field'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import { sxTasksList } from '@/ui/common/tasks-list/styles'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import UpdateTaskStatus from '@/ui/common/tasks-list/swipeable-list-items/update-status-form'
import {
  AuthAndTask,
  ListItemContentProps,
  TaskEditableProps,
} from '@/ui/common/tasks-list/types'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useMemo } from 'react'

// Props for the primary and secondary slots within ListItemText,
// allowing them to render as div elements.
const slotProps = {
  primary: { component: 'div' },
  secondary: { component: 'div' },
} as const

const { title, details } = NameAttributeList

export function ListItemContent({
  searchParamsToGoBack,
  task,
  authenticated,
}: ListItemContentProps) {
  return (
    <>
      <ListItemText
        primary={
          <TaskFieldEditable
            fieldName={title}
            fontSize='1.4rem'
            searchParamsToGoBack={searchParamsToGoBack}
            task={task}
            typographyVariant='h5'
            action={updateTaskTitle}
          />
        }
        secondary={
          <TaskFieldEditable
            fieldName={details}
            fontSize='1rem'
            searchParamsToGoBack={searchParamsToGoBack}
            task={task}
            typographyVariant='body1'
            action={updateTaskDetails}
            multiline
            rows={4}
          />
        }
        color='secondary'
        slotProps={slotProps}
      />
      <RenderTaskStatus
        authenticated={authenticated}
        task={task}
      />
    </>
  )
}

function RenderTaskStatus({ task, authenticated }: AuthAndTask) {
  if (authenticated)
    return (
      <UpdateTaskStatus
        id={task.id}
        ariaLabelledById={`task-title-${task.id}`}
        status={task.status}
      />
    )
  return (
    <Checkbox // Simple checkbox for unauthenticated users.
      color='secondary'
      sx={sxTasksList.checkbox}
    />
  )
}

/**
 * **Render Props Pattern**: The `EditableText` component uses Render Props
 * (`renderEditedText` and `renderViewText`) to allow the parent component
 * to define how the text field and typography are rendered based on the editing state.
 *
 * `TaskFieldEditable` wraps `EditableText`, providing it with concrete components
 * (TextField for editing and Typography for viewing) and logic.
 *
 * @param TaskEditableProps - Properties required for rendering an editable task field.
 * @returns An `EditableText` component with defined render functions.
 */
function TaskFieldEditable({
  task,
  searchParamsToGoBack,
  fieldName,
  fontSize,
  typographyVariant,
  action,
  ...rest
}: TaskEditableProps) {
  const dynamicField = useMemo(() => {
    return { name: NameAttributeList.searchParams, value: searchParamsToGoBack }
  }, [searchParamsToGoBack])

  return (
    <EditableText
      // Function that renders the input field when the text is in edit mode.
      renderEditedText={(props) => (
        <>
          <TaskTextField
            name={fieldName}
            id={fieldName}
            sx={sxEditableTextProps(fontSize)}
            {...props} // Pass remaining props (e.g., multiline, rows).
            {...rest} // Additional props for the text field.
          />
          <HiddenInputs
            taskId={task.id}
            dynamicField={dynamicField}
          />
        </>
      )}
      // Function that renders the text when it's in view mode.
      renderViewText={(props, data) => (
        <Typography
          id={`task-title-${task.id}`}
          variant={typographyVariant}
          {...props} // Pass props from EditableText (e.g., onClick).
        >
          {data}
        </Typography>
      )}
      action={action}
      data={task[fieldName]} // Current data of the field (title or details).
    />
  )
}
