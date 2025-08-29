'use client'

import { useTaskPriorityLogic } from '@/lib/utils/hooks/use-task-priority-logic'
import { StyledForm } from '@/ui/common/tasks-list/styled-form'
import { sxTasksList } from '@/ui/common/tasks-list/styles'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import { WithTaskProps } from '@/ui/common/tasks-list/types'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'

/**
 * @component UpdateTaskPriority
 * @description The `UpdateTaskPriority` component provides an interface for changing a task's priority.
 * It displays an icon representing the task's current priority,
 * and allows the user to toggle it between high and low priority.
 * The component uses Server Actions to asynchronously update the priority in the database.
 *
 * @param task - The task object, containing its current priority and ID.
 *
 * @returns A form with an icon button to change priority and an error message display.
 */
export function UpdateTaskPriority({ task }: WithTaskProps) {
  const { icon, dynamicField, formAction, isPending, errorMessage } =
    useTaskPriorityLogic(task.priority)

  return (
    <StyledForm
      action={formAction}
      sx={sxTasksList.priorityForm}
    >
      <Box sx={sxTasksList.priorityBoxForm}>
        <IconButton
          type='submit'
          disabled={isPending}
          sx={sxTasksList.priorityIconBtn}
        >
          {icon}
        </IconButton>
      </Box>
      {errorMessage}
      <HiddenInputs
        taskId={task.id}
        dynamicField={dynamicField}
      />
    </StyledForm>
  )
}
