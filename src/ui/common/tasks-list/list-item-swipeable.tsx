'use client'

import { ListBtnNames, ListTaskField } from '@/lib/constants/text-const'
import {
  deleteTask,
  updateTaskDetails,
  updateTaskTitle,
} from '@/lib/services/actions/task'
import { TaskData } from '@/lib/services/queries/task'
import { formatSearchParams } from '@/lib/utils/format-search-params'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import { useGetSwipeProps } from '@/lib/utils/hooks/use-get-swipe-props'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Task } from '@prisma/client'
import { Session } from 'next-auth'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSwipeable } from 'react-swipeable'
import DetailsTextField from '../form-action-state/text-fields/task/details'
import TitleTextField from '../form-action-state/text-fields/task/title'
import EditForm from './editing-form'
import { UpdateTaskPriority } from './update-priority'
import UpdateTaskStatus from './update-status-form'

// Component: TaskListItemSwipeable
// Displays a task list item with swipe functionality to reveal "Edit" and "Delete" actions.
// It utilizes a custom hook useGetSwipeProps for handling swipe logic.
export default function TaskListItemSwipeable({
  task,
  searchParamsObject,
  session,
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
  } = useGetSwipeProps()
  const swipeHandlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    onSwiping,
    delta,
    trackMouse,
  })
  const renderTaskStatus = getTaskStatus(task, session)

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
        sx={{
          pr: 0,
          ml: 3,
          display: 'flex',
          alignItems: 'stretch',
          transition: 'transform 0.2s ease-out',
          transform: `translateX(${translateX}px)`,
          backgroundColor: 'primary.light',
        }}
      >
        <ListItemText
          primary={
            <TaskViewOrEdit
              searchParamsObject={searchParamsObject}
              task={task}
              type={ListTaskField.title}
            />
          }
          secondary={
            <TaskViewOrEdit
              searchParamsObject={searchParamsObject}
              task={task}
              type={ListTaskField.details}
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
      {/* Component: HiddenComponent - Wrapper for the right hidden actions (Edit and Delete) */}
      <HiddenComponent
        width={rightHiddenWidth}
        translateX={translateX}
        right={0}
      >
        <DeleteTaskBtn
          taskId={task.id}
          searchParamsToGoBack=''
        />
      </HiddenComponent>
    </Box>
  )
}

function getTitleOrDetails(
  type: keyof Task,
  task: TaskData,
  setIsEditing: Dispatch<SetStateAction<boolean>>,
) {
  const handleBlur = () => setIsEditing(false)

  if (type === 'title')
    return {
      textField: (
        <TitleTextField
          data={task}
          onBlur={handleBlur}
        />
      ),
      action: updateTaskTitle,
      variantTypography: 'h5' as const,
    }
  return {
    textField: (
      <DetailsTextField
        data={task}
        onBlur={handleBlur}
      />
    ),
    action: updateTaskDetails,
    variantTypography: 'body1' as const,
  }
}

function TaskViewOrEdit({
  task,
  searchParamsObject,
  type,
}: TitleTaskEditFormProps) {
  const [isEditing, setIsEditing] = useState(false)

  const searchParamsToGoBack = formatSearchParams(searchParamsObject)
  const { textField, action, variantTypography } = getTitleOrDetails(
    type,
    task,
    setIsEditing,
  )

  if (isEditing)
    return (
      <EditForm action={action}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {textField}
          <input
            type='hidden'
            name={ListTaskField.id}
            value={task.id}
          />
          <input
            type='hidden'
            name='searchParams'
            value={searchParamsToGoBack}
          />
        </Box>
      </EditForm>
    )

  return (
    <Typography
      id={`task-${task[type]}`}
      variant={variantTypography}
      color='secondary'
      onClick={() => setIsEditing(true)}
      style={{ cursor: 'pointer', display: 'inline-block' }} // Вказуємо, що елемент клікабельний та обмежуємо його ширину змістом контенту.
    >
      {task[type]}
    </Typography>
  )
}

// Component: HiddenComponent
// A wrapper component for the hidden elements (Edit and Delete buttons) that appear on swipe.
// It's positioned absolutely to the left or right and translated based on translateX.
function HiddenComponent({
  children,
  left,
  right,
  width,
  translateX,
}: HiddenComponentProps) {
  const positionStyle =
    left !== undefined ? { left } : right !== undefined ? { right } : {}
  const transform =
    left !== undefined
      ? `translateX(calc(-${width}px + ${Math.max(0, translateX)}px))`
      : `translateX(calc(${width}px + ${Math.min(0, translateX)}px))`

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

// Component: DeleteTaskBtn
// A button component responsible for deleting a task. It wraps a form to perform the delete action.
function DeleteTaskBtn({ taskId, searchParamsToGoBack }: DeleteTaskBtnProps) {
  return (
    <form action={deleteTask}>
      {/* Component: BtnWithUseFormStatus - Separated to utilize the useFormStatus hook */}
      <BtnWithUseFormStatus />
      <input
        type='hidden'
        name={ListTaskField.id}
        value={taskId} // The ID of the task to be deleted.
      />
      <input
        type='hidden'
        name='searchParams'
        value={searchParamsToGoBack} // Search parameters to navigate back after deletion.
      />
    </form>
  )
}

// Component: BtnWithUseFormStatus
// Separated to utilize the useFormStatus hook for tracking form submission state.
function BtnWithUseFormStatus() {
  const { pending } = useFormStatus() // Hook to get the pending state of the form submission.

  return (
    <Button
      type='submit'
      color='warning'
      disabled={pending} // Disable the button during submission.
      loading={pending} // Show a loading indicator during submission.
      loadingPosition='end'
    >
      {ListBtnNames.deleteTask} {/* The text for the delete button. */}
    </Button>
  )
}

function getTaskStatus(task: TaskData, session: Session | null) {
  const renderTaskStatus = session ? (
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
  task: TaskData
  searchParamsObject?: Props
  session: Session | null
}

type Props = SearchParamsObject | undefined

interface DeleteTaskBtnProps {
  taskId: string
  searchParamsToGoBack: string
}

interface HiddenComponentProps {
  children: ReactNode
  left?: number | string
  right?: number | string
  width: number | string
  translateX: number
}

interface TitleTaskEditFormProps {
  task: TaskData
  searchParamsObject: Props
  type: keyof TaskData
}
