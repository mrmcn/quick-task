import { createTask } from '@/lib/services/actions/task'
import { FormName } from '@/lib/constants/text-const'
import FormWrapperActionState from '@/ui/common/form/form-wrapper-action-state'
import TaskDetailsTextField from '@/ui/common/form/text-fields/task-details'
import TaskTitleTextField from '@/ui/common/form/text-fields/task-title'
import PriorityToggleBtns from '@/ui/dashboard/priority-toggle-btns'

export default async function CreateTaskPage() {
  return (
    <>
      <FormWrapperActionState
        action={createTask}
        formName={FormName.createTask}
      >
        <TaskTitleTextField />
        <TaskDetailsTextField />
        <PriorityToggleBtns />
      </FormWrapperActionState>
    </>
  )
}
