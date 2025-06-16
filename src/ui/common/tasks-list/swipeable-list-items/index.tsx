'use client'

import { TextFieldsNameAttributeListValue } from '@/lib/constants/text-const'
import { TaskListDto } from '@/lib/repositories/prisma/tasks'
import { updateTaskDetails, updateTaskTitle } from '@/lib/services/actions/task'
import { ActionProps, StateProps } from '@/lib/services/actions/types'
import { formatSearchParams } from '@/lib/utils/format-search-params'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import { useSwipeProps } from '@/lib/utils/hooks/use-get-swipe-props'
import { EditableText } from '@/ui/common/forms/editable-text'
import { RenderProps } from '@/ui/common/forms/text-fields/types'
import sxEditableTextProps from '@/ui/common/styles/sx-editable-text-props'
import { DeleteTaskBtn } from '@/ui/common/tasks-list/swipeable-list-items/delete-task-btn'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import {
  getHiddenComponentProps,
  listItemSx,
} from '@/ui/common/tasks-list/swipeable-list-items/styles'
import { UpdateTaskPriority } from '@/ui/common/tasks-list/swipeable-list-items/update-priority'
import UpdateTaskStatus from '@/ui/common/tasks-list/swipeable-list-items/update-status-form'
import { TypographyVariant } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import { useSwipeable } from 'react-swipeable'
import TaskTextField from '../../forms/text-fields/task-text-field'

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
  const renderTaskStatus = getTaskStatus(task, authenticated)
  const searchParamsToGoBack = formatSearchParams(searchParamsObject)

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Component: HiddenComponent - Wrapper for the left hidden action (Update Priority) */}
      <HiddenComponent
        width={leftHiddenWidth}
        translateX={translateX}
        left={0}
      >
        <UpdateTaskPriority task={task} />
      </HiddenComponent>
      <ListItem
        {...swipeHandlers}
        sx={listItemSx(translateX)}
      >
        <ListItemText
          primary={
            <TaskFieldEditable
              fieldName='title'
              fontSize='1.4rem'
              searchParamsToGoBack={searchParamsToGoBack}
              task={task}
              typographyVariant='h5'
              action={updateTaskTitle}
            />
          }
          secondary={
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
          }
          color='secondary'
          slotProps={{
            primary: { component: 'div' },
            secondary: { component: 'div' },
          }}
        />
        {renderTaskStatus}
      </ListItem>
      {/* Component: HiddenComponent - Wrapper for the right hidden actions (Delete) */}
      <HiddenComponent
        width={rightHiddenWidth}
        translateX={translateX}
        right={0}
      >
        <DeleteTaskBtn
          taskId={task.id}
          searchParamsToGoBack={searchParamsToGoBack}
        />
      </HiddenComponent>
    </Box>
  )
}

// A wrapper component for the hidden elements (Update Priority and Delete buttons) that appear on swipe.
// It's positioned absolutely to the left or right and translated based on translateX.
function HiddenComponent({
  children,
  left,
  right,
  width,
  translateX,
}: HiddenComponentProps) {
  const { positionStyle, transform } = getHiddenComponentProps(
    translateX,
    width,
    left,
    right,
  )

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-out',
        transform: transform,
        ...positionStyle,
      }}
    >
      {children}
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

function getTaskStatus(task: TaskListDto, authenticated: boolean) {
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
  return renderTaskStatus
}

interface TaskItem {
  task: TaskListDto
  searchParamsObject?: SearchParamsObject
  authenticated: boolean
}

interface HiddenComponentProps {
  children: ReactNode
  left?: number | string
  right?: number | string
  width: number | string
  translateX: number
}

interface TaskEditableProps extends RenderProps {
  task: TaskListDto
  searchParamsToGoBack: string
  fieldName: Extract<TextFieldsNameAttributeListValue, 'title' | 'details'>
  fontSize: string
  typographyVariant: TypographyVariant
  action: ActionProps<StateProps>
}

type EditedComponentProps = Omit<
  TaskEditableProps,
  'typographyVariant' | 'action'
>
