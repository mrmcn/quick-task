import { ErrorList, NameAttributeList } from '@/lib/constants/text-const'
import { updateTaskPriority } from '@/lib/services/actions/task'
import { sxTasksList } from '@/ui/common/tasks-list/styles'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import LowPriorityIcon from '@mui/icons-material/LowPriority'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { $Enums, Priority } from '@prisma/client'
import { useActionState, useMemo } from 'react'

/**
 * @function useTaskPriorityLogic
 * @description A custom hook to encapsulate all logic related to changing a task's priority.
 * It manages the server action state, calculates the appropriate icon,
 * the next priority value, and prepares data for hidden fields.
 *
 * @param priority - The current task priority from the Prisma enum.
 *
 * @returns An object containing:
 * - `icon`: A JSX element of the icon, representing the current priority or the toggle action.
 * - `dynamicField`: A memoized object containing the `name` and `value` for the hidden priority field.
 * - `formAction`: The Server Action function to be passed to the form's `action` prop.
 * - `isPending`: A boolean, `true` if the Server Action is awaiting a response.
 * - `errorMessage`: A JSX element displaying an error message, or `null` if no error.
 */
export function useTaskPriorityLogic(priority: $Enums.Priority) {
  const [state, formAction, isPending] = useActionState(
    updateTaskPriority,
    undefined,
  )

  // Check if the task's current priority is high.
  const highStatus = priority === Priority.high

  // Determine which icon to display.
  // If priority is high, show the icon to switch to low priority.
  // Otherwise, show the combined icon to switch to high priority.
  // MUI icon components are already optimized, so useMemo is not necessary here.
  const icon = highStatus ? (
    <LowPriorityIcon />
  ) : (
    <Box sx={sxTasksList.priorityBoxIcon}>
      <ArrowUpwardIcon sx={sxTasksList.arrowUpwardIcon} />
      <PriorityHighIcon sx={sxTasksList.priorityHighIcon} />
    </Box>
  )

  // Determine the priority value that will be set on the next click:
  // If the current priority is high, the next will be low; otherwise, it will be high.
  const value = highStatus ? Priority.low : Priority.high

  // Generate an error message if the server action completed with an 'error' status.
  const errorMessage =
    state?.status === 'error' ? (
      <Typography
        variant='caption'
        color='error'
      >
        {ErrorList.failed}
      </Typography>
    ) : null // If no errors, the variable remains `null`, and the component does not render.

  // Memoize the `dynamicField` object. This is important for optimization because
  // `dynamicField` is an object, and without `useMemo`, it would be recreated on every re-render,
  // even if its content hasn't changed. This helps avoid unnecessary updates to the child component.
  const dynamicField = useMemo(
    () => ({
      name: NameAttributeList.priority, // The HTML `name` attribute for the hidden field (priority).
      value: value, // The new priority value (high/low).
    }),
    [value],
  )

  return { icon, value, formAction, isPending, errorMessage, dynamicField }
}
