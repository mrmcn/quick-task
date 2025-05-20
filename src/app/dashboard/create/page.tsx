'use client'

import {
  ListBtnNames,
  ListFormNames,
  ListLabels,
  ListPlaceholder,
  TextFieldsNameAttributeList,
} from '@/lib/constants/text-const'
import { createTask } from '@/lib/services/actions/task'
import PageFormContainer from '@/ui/common/forms/form-container'
import DetailsTextField from '@/ui/common/forms/text-fields/task/details'
import TitleTextField from '@/ui/common/forms/text-fields/task/title'
import { useActionState } from 'react'

export default function CreateTaskPage() {
  const [state, formAction, isPending] = useActionState(createTask, undefined)

  return (
    <form action={formAction}>
      <PageFormContainer
        formName={ListFormNames.createTask}
        btnName={ListBtnNames.save}
        disabled={isPending}
        state={state}
      >
        <TitleTextField
          name={TextFieldsNameAttributeList.title}
          label={ListLabels.title}
          placeholder={ListPlaceholder.createTitle}
          margin='normal'
        />
        <DetailsTextField
          name={TextFieldsNameAttributeList.details}
          label={ListLabels.details}
          placeholder={ListPlaceholder.createDetails}
          margin='normal'
        />
      </PageFormContainer>
    </form>
  )
}
