'use client'

import { ListBtnNames, ListTaskField } from '@/lib/constants/text-const'
import { DASHBOARD_EDIT_URL, SIGNIN_URL } from '@/lib/constants/url'
import { deleteTask } from '@/lib/services/actions/task'
import { TaskData } from '@/lib/services/queries/task'
import { formatSearchParams } from '@/lib/utils/format-search-params'
import { SearchParamsObject } from '@/lib/utils/get-search-params'
import { useGetSwipeProps } from '@/lib/utils/hooks/use-get-swipe-props'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Session } from 'next-auth'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { useSwipeable } from 'react-swipeable'
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
  const { href, renderTaskStatus } = getTaskNavigationAndStatus(
    task,
    session,
    searchParamsObject,
  )
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
          primary={task.title}
          secondary={task.details}
          color='secondary'
          slotProps={{
            primary: {
              id: `task-${task.title}`,
              variant: 'h5',
              color: 'secondary',
            },
            secondary: { variant: 'body1', color: 'secondary' },
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
        <Button
          component={Link}
          href={href}
          color='secondary'
        >
          Edit
        </Button>
        <DeleteTaskBtn
          taskId={task.id}
          searchParamsToGoBack=''
        />
      </HiddenComponent>
    </Box>
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

// Function: getTaskNavigationAndStatus
// Determines the navigation URL (edit or sign-in) and the task status component to render
// based on the user's session.
function getTaskNavigationAndStatus(
  task: TaskData,
  session: Session | null,
  searchParamsObject?: Props,
) {
  if (session)
    return {
      href: `${DASHBOARD_EDIT_URL(task.id)}${formatSearchParams(
        searchParamsObject,
      )}`, // URL for editing the task.
      renderTaskStatus: (
        <UpdateTaskStatus
          id={task.id}
          title={task.title}
          status={task.status}
        />
      ), // Component to display and update the task status.
    }

  return {
    href: SIGNIN_URL, // URL for the sign-in page if no session.
    renderTaskStatus: (
      <Checkbox
        color='secondary'
        sx={{ mr: 10 }}
      />
    ),
  }
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
