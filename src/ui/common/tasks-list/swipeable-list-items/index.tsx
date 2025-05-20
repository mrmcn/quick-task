'use client'

import { TextFieldsNameAttributeList } from '@/lib/constants/text-const'
import { updateTaskDetails, updateTaskTitle } from '@/lib/services/actions/task'
import { TaskData } from '@/lib/services/queries/task'
import { formatSearchParams } from '@/lib/utils/format-search-params'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import { useSwipeProps } from '@/lib/utils/hooks/use-get-swipe-props'
import { EditableText } from '@/ui/common/forms/editable-text'
import textFieldSx from '@/ui/common/forms/text-fields/text-field-sx'
import { DeleteTaskBtn } from '@/ui/common/tasks-list/swipeable-list-items/delete-task-btn'
import { UpdateTaskPriority } from '@/ui/common/tasks-list/swipeable-list-items/update-priority'
import UpdateTaskStatus from '@/ui/common/tasks-list/swipeable-list-items/update-status-form'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'
import { useSwipeable } from 'react-swipeable'

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
            <TaskTitleEditable
              searchParamsToGoBack={searchParamsToGoBack}
              task={task}
            />
          }
          secondary={
            <TaskDetailsEditable
              searchParamsToGoBack={searchParamsToGoBack}
              task={task}
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
function TaskTitleEditable({ task, searchParamsToGoBack }: TaskEditableProps) {
  return (
    <EditableText
      renderEditedText={(props) => (
        <>
          <TextField
            type='text'
            name='title'
            id='title'
            required
            size='small'
            sx={textFieldSx('1.4rem')}
            {...props}
          />
          <HiddenInputs
            searchParamsToGoBack={searchParamsToGoBack}
            taskId={task.id}
          />
        </>
      )}
      renderViewText={(props, data) => (
        <Typography
          variant='h5'
          {...props}
        >
          {data}
        </Typography>
      )}
      action={updateTaskTitle}
      data={task.title}
    />
  )
}

function TaskDetailsEditable({
  searchParamsToGoBack,
  task,
}: TaskEditableProps) {
  return (
    <EditableText
      renderEditedText={(props) => (
        <>
          <TextField
            type='text'
            name='details'
            id='details'
            required
            multiline
            size='small'
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
              '& .MuiInputBase-root': {
                bgcolor: 'primary.light',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              },
            }}
            {...props}
          />
          <HiddenInputs
            searchParamsToGoBack={searchParamsToGoBack}
            taskId={task.id}
          />
        </>
      )}
      renderViewText={(props, data) => (
        <Typography
          variant='body1'
          {...props}
        >
          {data}
        </Typography>
      )}
      action={updateTaskDetails}
      data={task.details}
    />
  )
}

function HiddenInputs({ searchParamsToGoBack, taskId }: HiddenInputsProps) {
  return (
    <>
      <input
        type='hidden'
        name={TextFieldsNameAttributeList.id}
        value={taskId}
      />
      <input
        type='hidden'
        name='searchParams'
        value={searchParamsToGoBack}
      />
    </>
  )
}

function getTaskStatus(task: TaskData, authenticated: boolean) {
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

function getHiddenComponentProps(
  translateX: number,
  width: number | string,
  left?: number | string,
  right?: number | string,
) {
  const positionStyle =
    left !== undefined ? { left } : right !== undefined ? { right } : {}
  const transform =
    left !== undefined
      ? `translateX(calc(-${width}px + ${Math.max(0, translateX)}px))`
      : `translateX(calc(${width}px + ${Math.min(0, translateX)}px))`
  return { positionStyle, transform }
}

function listItemSx(translateX: number) {
  return {
    pr: 0,
    ml: 3,
    display: 'flex',
    alignItems: 'stretch',
    transition: 'transform 0.2s ease-out',
    transform: `translateX(${translateX}px)`,
    backgroundColor: 'primary.light',
  }
}

interface TaskItem {
  task: TaskData
  searchParamsObject?: Props
  authenticated: boolean
}

type Props = SearchParamsObject | undefined

interface HiddenComponentProps {
  children: ReactNode
  left?: number | string
  right?: number | string
  width: number | string
  translateX: number
}

interface TaskEditableProps {
  task: TaskData
  searchParamsToGoBack: string
}

interface HiddenInputsProps {
  taskId: TaskData['id']
  searchParamsToGoBack: string
}
