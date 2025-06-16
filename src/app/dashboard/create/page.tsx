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
import TaskTextField from '@/ui/common/forms/text-fields/task-text-field'
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
        <TaskTextField
          name={TextFieldsNameAttributeList.title}
          id={TextFieldsNameAttributeList.title}
          label={ListLabels.title}
          placeholder={ListPlaceholder.createTitle}
          margin='normal'
        />
        <TaskTextField
          name={TextFieldsNameAttributeList.details}
          id={TextFieldsNameAttributeList.details}
          label={ListLabels.details}
          placeholder={ListPlaceholder.createDetails}
          margin='normal'
          multiline
          rows={4}
        />
      </PageFormContainer>
    </form>
  )
}
