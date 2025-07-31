import { NameAttributeList } from '@/lib/constants/text-const'
import { updateTaskStatus } from '@/lib/services/actions/task'
import { $Enums, Status } from '@prisma/client'
import { ChangeEvent, useActionState, useCallback, useMemo } from 'react'

/**
 * @function useTaskStatusLogic
 * @description A custom hook to encapsulate all logic related to changing a task's status.
 * It manages the server action state, calculates the next status value,
 * determines if the checkbox should be checked, and provides a handler to initiate the update.
 *
 * @param status - The current status of the task.
 *
 * @returns An object containing:
 * - `handleChange`: A callback function to handle checkbox changes.
 * - `checked`: A boolean indicating whether the checkbox is checked.
 * - `state`: The current state of the Server Action (result or error).
 * - `action`: The Server Action function to be passed to the form's `action` prop.
 * - `pending`: A boolean, `true` if the Server Action is awaiting a response.
 * - `dynamicField`: A memoized object containing the `name` and `value` for the hidden status field.
 */
export function useTaskStatusLogic(status: $Enums.Status) {
  const [state, action, pending] = useActionState(updateTaskStatus, undefined)

  // Memoized callback for handling checkbox changes.
  // `useCallback` ensures this function is not redefined on every re-render of the hook,
  // as its logic does not depend on changing values.
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.currentTarget.form?.requestSubmit() // Programmatically submit the form.
  }, [])

  // Calculate the next status value: if completed, then "in_progress", otherwise "completed".
  // `value` is not separately memoized with `useMemo` because it's used as a dependency for `dynamicField`,
  // which already memoizes `value` within itself.
  const value =
    status === Status.completed ? Status.in_progress : Status.completed

  // Determine if the checkbox should be checked: if the status includes "completed", then yes.
  const checked = status.includes(Status.completed)

  // Memoize the dynamicField object. This is important for optimization because
  // `dynamicField` is an object, and without `useMemo`, it would be recreated on every re-render,
  // even if its content hasn't changed, potentially causing unnecessary updates to the child component.
  const dynamicField = useMemo(
    () => ({
      name: NameAttributeList.status, // The HTML `name` attribute for the hidden field.
      value: value, // The calculated status value to be passed.
    }),
    [value],
  )

  return { handleChange, checked, state, action, pending, dynamicField }
}
