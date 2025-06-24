'use client'

import { updateTaskDetails, updateTaskTitle } from '@/lib/services/actions/task'
import { formatSearchParams } from '@/lib/utils/helpers/format-search-params'
import { useSwipeProps } from '@/lib/utils/hooks/use-get-swipe-props'
import { EditableText } from '@/ui/common/forms/editable-text'
import TaskTextField from '@/ui/common/forms/text-fields/task-text-field'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import { DeleteTask } from '@/ui/common/tasks-list/swipeable-list-items/delete-task-btn'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import {
  hiddenComponentSx,
  listItemSx,
} from '@/ui/common/tasks-list/swipeable-list-items/styles'
import { UpdateTaskPriority } from '@/ui/common/tasks-list/swipeable-list-items/update-priority'
import UpdateTaskStatus from '@/ui/common/tasks-list/swipeable-list-items/update-status-form'
import {
  EditedComponentProps,
  TaskEditableProps,
  TaskItem,
} from '@/ui/common/tasks-list/types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useSwipeable } from 'react-swipeable'

const slotProps = {
  primary: { component: 'div' },
  secondary: { component: 'div' },
} as const

// Displays a task list item with swipe functionality to reveal "Update task priority" and "Delete task" actions.
// It utilizes a custom hook useSwipeProps for handling swipe logic.
export default function TaskListItemSwipeable({
  task,
  searchParamsObject,
  authenticated,
}: TaskItem) {
  const {
    translateX,
    leftHiddenWidth,
    rightHiddenWidth,
    onSwipedLeft,
    onSwipedRight,
    onSwiping,
    delta,
    trackMouse,
  } = useSwipeProps()
  const swipeHandlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    onSwiping,
    delta,
    trackMouse,
  })
  const renderTaskStatus = authenticated ? (
    <UpdateTaskStatus
      id={task.id}
      title={task.title}
      status={task.status}
    />
  ) : (
    <Checkbox
      color='secondary'
      sx={{ mr: 10 }}
    />
  )
  const searchParamsToGoBack = formatSearchParams(searchParamsObject)
  const primary = (
    <TaskFieldEditable
      fieldName='title'
      fontSize='1.4rem'
      searchParamsToGoBack={searchParamsToGoBack}
      task={task}
      typographyVariant='h5'
      action={updateTaskTitle}
    />
  )
  const secondary = (
    <TaskFieldEditable
      fieldName='details'
      fontSize='1rem'
      searchParamsToGoBack={searchParamsToGoBack}
      task={task}
      typographyVariant='body1'
      action={updateTaskDetails}
      multiline
      rows={4}
    />
  )

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Wrapper for the left hidden action (Update Priority) */}
      <Box sx={hiddenComponentSx(translateX, leftHiddenWidth, 0)}>
        <UpdateTaskPriority task={task} />
      </Box>
      <ListItem
        {...swipeHandlers}
        sx={listItemSx(translateX)}
      >
        <ListItemText
          primary={primary}
          secondary={secondary}
          color='secondary'
          slotProps={slotProps}
        />
        {renderTaskStatus}
      </ListItem>
      {/*  Wrapper for the right hidden actions (Delete) */}
      <Box sx={hiddenComponentSx(translateX, rightHiddenWidth, 0)}>
        <DeleteTask
          taskId={task.id}
          searchParamsToGoBack={searchParamsToGoBack}
        />
      </Box>
    </Box>
  )
}

// Render Props Pattern: The EditableText component uses render props (renderTextField and renderTypography)
//   to allow the parent component to define how the text field and typography are rendered based on the editing state
function TaskFieldEditable({
  task,
  searchParamsToGoBack,
  fieldName,
  fontSize,
  typographyVariant,
  action,
  ...rest
}: TaskEditableProps) {
  return (
    <EditableText
      renderEditedText={(props) => (
        <Field
          fieldName={fieldName}
          fontSize={fontSize}
          searchParamsToGoBack={searchParamsToGoBack}
          task={task}
          {...props}
          {...rest}
        />
      )}
      renderViewText={(props, data) => (
        <Typography
          variant={typographyVariant}
          {...props}
        >
          {data}
        </Typography>
      )}
      action={action}
      data={task[fieldName]}
    />
  )
}

function Field({
  searchParamsToGoBack,
  task,
  fieldName,
  fontSize,
  ...rest
}: EditedComponentProps) {
  return (
    <>
      <TaskTextField
        name={fieldName}
        id={fieldName}
        sx={sxEditableTextProps(fontSize)}
        {...rest}
      />
      <HiddenInputs
        taskId={task.id}
        dynamicField={{ name: 'searchParams', value: searchParamsToGoBack }}
      />
    </>
  )
}
