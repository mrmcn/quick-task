'use client'

import { ListBtnNames } from '@/lib/constants/text-const'
import { deleteTask } from '@/lib/services/actions/task'
import HiddenInputs from '@/ui/common/tasks-list/swipeable-list-items/hidden-inputs'
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
      <HiddenInputs
        taskId={taskId}
        dynamicField={{ name: 'searchParams', value: searchParamsToGoBack }}
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
