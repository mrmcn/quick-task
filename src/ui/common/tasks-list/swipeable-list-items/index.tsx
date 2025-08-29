'use client'

import { formatSearchParams } from '@/lib/utils/helpers/format-search-params'
import { useSwipeProps } from '@/lib/utils/hooks/use-get-swipe-props'
import { sxTasksList } from '@/ui/common/tasks-list/styles'
import { DeleteTask } from '@/ui/common/tasks-list/swipeable-list-items/delete-task-btn'
import { ListItemContent } from '@/ui/common/tasks-list/swipeable-list-items/list-item-content'
import { UpdateTaskPriority } from '@/ui/common/tasks-list/swipeable-list-items/update-priority'
import { TaskItem } from '@/ui/common/tasks-list/types'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import { useMemo } from 'react'

/**
 * The TaskListItemSwipeable component displays an individual task list item
 * with swipe functionality to reveal hidden actions (update priority and delete).
 *
 * It uses the custom hook `useSwipeProps` to manage swipe logic
 * and dynamically renders the task status (checkbox for unauthenticated, form for authenticated).
 * The task title and details are editable fields.
 *
 * @param task - The task object to be displayed.
 * @param searchParamsObject - The search parameters object used to preserve navigation state.
 * @param authenticated - A boolean indicating whether the user is authenticated.
 * @returns A React component for a swipeable task list item.
 */
export default function TaskListItemSwipeable({
  task,
  searchParamsObject,
  authenticated,
}: TaskItem) {
  const { translateX, leftHiddenWidth, rightHiddenWidth, swipeHandlers } =
    useSwipeProps()

  const searchParamsToGoBack = useMemo(
    () => formatSearchParams(searchParamsObject),
    [searchParamsObject],
  )

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Wrapper for the left hidden action (Update Priority). */}
      <Box sx={sxTasksList.hiddenBox(translateX, leftHiddenWidth, { left: 0 })}>
        <UpdateTaskPriority task={task} />
      </Box>
      <ListItem
        {...swipeHandlers} // Apply swipe handlers to the ListItem.
        sx={sxTasksList.listItem(translateX)}
      >
        <ListItemContent
          searchParamsToGoBack={searchParamsToGoBack}
          task={task}
          authenticated={authenticated}
        />
      </ListItem>
      {/* Wrapper for the right hidden actions (Delete). */}
      <Box
        sx={sxTasksList.hiddenBox(translateX, rightHiddenWidth, { right: 0 })}
      >
        <DeleteTask
          taskId={task.id}
          searchParamsToGoBack={searchParamsToGoBack}
          authenticated={authenticated}
        />
      </Box>
    </Box>
  )
}
