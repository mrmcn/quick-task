import { ListFormNames, ListPlaceholder } from '@/lib/constants/text-const'
import { createTask } from '@/lib/services/actions/task'
import FormWrapperActionState from '@/ui/common/form/form-wrapper-action-state'
import DetailsTextField from '@/ui/common/form/text-fields/task/details'
import TitleTextField from '@/ui/common/form/text-fields/task/title'
import PriorityToggleBtns from '@/ui/dashboard/priority-toggle-btns'

export default async function CreateTaskPage() {
  return (
    <>
      <FormWrapperActionState
        action={createTask}
        formName={ListFormNames.createTask}
      >
        <TitleTextField placeholder={ListPlaceholder.createTitle} />
        <DetailsTextField placeholder={ListPlaceholder.createDetails} />
        <PriorityToggleBtns />
      </FormWrapperActionState>
    </>
  )
}
