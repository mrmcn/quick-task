'use client'

import { ListBtnNames, ListTaskField } from '@/lib/constants/text-const'
import { deleteTask } from '@/lib/services/actions/task'
import Button from '@mui/material/Button'
import { useFormStatus } from 'react-dom'

// A button component responsible for deleting a task. It wraps a form to perform the delete action.
export function DeleteTaskBtn({
  taskId,
  searchParamsToGoBack,
}: DeleteTaskBtnProps) {
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

interface DeleteTaskBtnProps {
  taskId: string
  searchParamsToGoBack: string
}
