import { ListFormNames, ListPlaceholder } from '@/lib/constants/text-const'
import { createTask } from '@/lib/services/actions/task'
import FormWrapperActionState from '@/ui/common/form-action-state/form-wrapper'
import DetailsTextField from '@/ui/common/form-action-state/text-fields/task/details'
import TitleTextField from '@/ui/common/form-action-state/text-fields/task/title'

export default async function CreateTaskPage() {
  return (
    <FormWrapperActionState
      action={createTask}
      formName={ListFormNames.createTask}
    >
      <TitleTextField placeholder={ListPlaceholder.createTitle} />
      <DetailsTextField placeholder={ListPlaceholder.createDetails} />
    </FormWrapperActionState>
  )
}
