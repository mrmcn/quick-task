'use client'

import { ListFormNames, ListPlaceholder } from '@/lib/constants/text-const'
import { createTask } from '@/lib/services/actions/task'
import BackButton from '@/ui/common/back-btn'
import FormContainer from '@/ui/common/forms/form-container'
import FormWrapperUsesActionStateAndRendersErrors, {
  RenderWrappedComponentProps,
} from '@/ui/common/forms/form-use-action-state'
import DetailsTextField from '@/ui/common/forms/text-fields/task/details'
import TitleTextField from '@/ui/common/forms/text-fields/task/title'

export default function CreateTaskPage() {
  return (
    <>
      <BackButton />
      <FormWrapperUsesActionStateAndRendersErrors
        action={createTask}
        renderWrappedComponent={(props) => <FormContent props={props} />}
      />
    </>
  )
}

function FormContent({ props }: { props: RenderWrappedComponentProps }) {
  return (
    <FormContainer
      formName={ListFormNames.createTask}
      {...props}
    >
      <TitleTextField
        placeholder={ListPlaceholder.createTitle}
        margin='normal'
      />
      <DetailsTextField
        placeholder={ListPlaceholder.createDetails}
        margin='normal'
      />
    </FormContainer>
  )
}
