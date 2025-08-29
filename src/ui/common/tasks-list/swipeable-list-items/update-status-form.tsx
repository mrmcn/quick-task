'use client'

import { useTaskStatusLogic } from '@/lib/utils/hooks/use-task-status-logic'
import { StyledForm } from '@/ui/common/tasks-list/styled-form'
import { sxTasksList } from '@/ui/common/tasks-list/styles'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import { EditStatusFormProps } from '@/ui/common/tasks-list/types'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * @component UpdateTaskStatus
 * @description The `UpdateTaskStatus` component allows the user to change the status of a task
 * (e.g., between "completed" and "in progress") using a checkbox.
 * It integrates with the `updateTaskStatus` server action for asynchronous database updates.
 * Displays a loading indicator while the action is pending and an error message if an error occurs.
 *
 * @param id - The unique identifier of the task whose status needs to be updated.
 * @param status - The current status of the task from the Prisma enum.
 * @param ariaLabelledById - The ID of the element that serves as a label for the checkbox for accessibility.
 *
 * @returns A form with a checkbox to change status, or a loading indicator/error message.
 */
export default function UpdateTaskStatus({
  id,
  status,
  ariaLabelledById,
}: EditStatusFormProps) {
  const { checked, handleChange, dynamicField, action, pending, state } =
    useTaskStatusLogic(status)

  if (pending)
    return (
      <CircularProgress
        size={15}
        sx={sxTasksList.statusProgress}
      />
    )

  if (state?.status === 'error') return <Box>{state.error.message}</Box>

  return (
    <StyledForm
      action={action}
      sx={sxTasksList.statusForm}
    >
      <Checkbox
        onChange={handleChange}
        edge='end'
        checked={checked}
        sx={sxTasksList.statusCheckbox}
        aria-labelledby={ariaLabelledById}
      />
      <HiddenInputs
        taskId={id}
        dynamicField={dynamicField}
      />
    </StyledForm>
  )
}
