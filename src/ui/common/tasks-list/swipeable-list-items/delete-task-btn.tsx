'use client'

import { ListBtnNames } from '@/lib/constants/text-const'
import { deleteTask } from '@/lib/services/actions/task'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
import { DeleteTaskProps } from '@/ui/common/tasks-list/types'
import Button from '@mui/material/Button'
import { useFormStatus } from 'react-dom'

// A button component responsible for deleting a task. It wraps a form to perform the delete action.
export function DeleteTask({
  taskId,
  searchParamsToGoBack,
  authenticated,
}: DeleteTaskProps) {
  return (
    <form action={deleteTask}>
      {/* Component: BtnWithUseFormStatus - Separated to utilize the useFormStatus hook */}
      <BtnWithUseFormStatus authenticated={authenticated} />
      <HiddenInputs
        taskId={taskId}
        dynamicField={{ name: 'searchParams', value: searchParamsToGoBack }}
      />
    </form>
  )
}

// Component: BtnWithUseFormStatus
// Separated to utilize the useFormStatus hook for tracking form submission state.
function BtnWithUseFormStatus({ authenticated }: { authenticated: boolean }) {
  const { pending } = useFormStatus() // Hook to get the pending state of the form submission.
  const btnContent = authenticated
    ? ListBtnNames.deleteTask
    : ListBtnNames.signIntoDelete

  return (
    <Button
      type='submit'
      color='warning'
      disabled={pending || !authenticated} // Disable the button during submission or if not authenticated.
      loading={pending} // Show a loading indicator during submission.
      loadingPosition='end'
    >
      {btnContent} {/* The text for the delete button. */}
    </Button>
  )
}
