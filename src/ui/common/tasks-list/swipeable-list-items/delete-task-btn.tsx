'use client'

import { BtnNamesList } from '@/lib/constants/text-const'
import { deleteTask } from '@/lib/services/actions/task'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import { DeleteTaskProps } from '@/ui/common/tasks-list/types'
import Button from '@mui/material/Button'
import { useMemo } from 'react'
import { useFormStatus } from 'react-dom'

/**
 * @function DeleteTask
 * @description A button component responsible for deleting a task.
 * It wraps an HTML form to perform the delete action via a server action.
 * The component passes necessary data (task ID and search parameters for navigation)
 * through hidden form fields.
 *
 * @param taskId - The unique identifier of the task to be deleted.
 * @param searchParamsToGoBack - Serialized search parameters to return to after the deletion.
 * @param authenticated - A boolean indicating whether the user is authenticated.
 * @returns A JSX element containing the form with the delete button and hidden inputs.
 */
export function DeleteTask({
  taskId,
  searchParamsToGoBack,
  authenticated,
}: DeleteTaskProps) {
  const dynamicField = useMemo(() => {
    return { name: 'searchParams', value: searchParamsToGoBack }
  }, [searchParamsToGoBack])

  return (
    <form action={deleteTask}>
      {/* Component: BtnWithUseFormStatus - Separated to utilize the useFormStatus hook */}
      <BtnWithUseFormStatus authenticated={authenticated} />
      <HiddenInputs
        taskId={taskId}
        dynamicField={dynamicField}
      />
    </form>
  )
}

/**
 * @function BtnWithUseFormStatus
 * @description An internal helper button component that utilizes the `useFormStatus` hook
 * to track the form submission state. This allows for dynamically changing the button's state
 * (disabling, showing a loading indicator) while a server action is in progress.
 *
 * @param authenticated - A boolean indicating whether the user is authenticated.
 * @returns A Material-UI Button JSX element.
 */
function BtnWithUseFormStatus({ authenticated }: { authenticated: boolean }) {
  const { pending } = useFormStatus() // Hook to get the pending state of the form submission.
  const btnContent = authenticated
    ? BtnNamesList.deleteTask
    : BtnNamesList.signIntoDelete

  return (
    <Button
      type='submit'
      color='warning'
      disabled={pending || !authenticated} // Disable the button during submission or if not authenticated.
      loading={pending} // Show a loading indicator during submission.
      loadingPosition='end'
    >
      {btnContent}
    </Button>
  )
}
