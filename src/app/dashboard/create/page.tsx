'use client'

import {
  BtnNamesList,
  FormNamesList,
  LabelsList,
  NameAttributeList,
  PlaceholderList,
} from '@/lib/constants/text-const'
import { createTask } from '@/lib/services/actions/task'
import PageFormContainer from '@/ui/common/forms/form-container'
import TaskTextField from '@/ui/common/forms/text-fields/task-text-field'
import { useActionState } from 'react'

/**
 * @function CreateTaskPage
 * @description The component for the new task creation page.
 * This page provides a form for entering the title and details of a task,
 * and handles form submission using the `createTask` server action.
 *
 * @returnsA JSX element representing the task creation page.
 */
export default function CreateTaskPage() {
  const [state, formAction, isPending] = useActionState(createTask, undefined)

  return (
    <form action={formAction}>
      <PageFormContainer
        formName={FormNamesList.createTask}
        btnName={BtnNamesList.save}
        disabled={isPending}
        state={state}
      >
        <TaskTextField
          name={NameAttributeList.title}
          id={NameAttributeList.title}
          label={LabelsList.title}
          placeholder={PlaceholderList.createTitle}
          margin='normal'
        />
        <TaskTextField
          name={NameAttributeList.details}
          id={NameAttributeList.details}
          label={LabelsList.details}
          placeholder={PlaceholderList.createDetails}
          margin='normal'
          multiline
          rows={4}
        />
      </PageFormContainer>
    </form>
  )
}
