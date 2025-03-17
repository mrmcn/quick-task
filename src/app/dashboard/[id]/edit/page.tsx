import {
  ButtonName,
  FormName,
  TextFieldLabel,
  TextFieldLabelProps,
} from '@/lib/constants/text-const'
import { updateTask } from '@/lib/services/actions/task'
import { fetchTaskIdData } from '@/lib/services/queries/task'
import FormWrapperActionState from '@/ui/common/form/form-wrapper-action-state'
import { MyTextField } from '@/ui/common/form/text-fields/custom-text-field'
import SuspenseTaskTextField from '@/ui/common/form/text-fields/suspense-task-field'
import SuspenseDeleteTaskBtn from '@/ui/dashboard/edit/delete-task-btn'
import PriorityToggleBtns from '@/ui/dashboard/priority-toggle-btns'
import Button from '@mui/material/Button'
import { Suspense } from 'react'

export default async function EditTaskPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const id = params.id
  const TaskIdDataPromise = fetchTaskIdData(id)

  return (
    <>
      <FormWrapperActionState
        action={updateTask}
        formName={FormName.updateTask}
      >
        <Suspense fallback={<FallbackField label={TextFieldLabel.summary} />}>
          <SuspenseTaskTextField
            type='summary'
            promise={TaskIdDataPromise}
          />
        </Suspense>
        <Suspense fallback={<FallbackField label={TextFieldLabel.details} />}>
          <SuspenseTaskTextField
            type='details'
            promise={TaskIdDataPromise}
          />
        </Suspense>
        <Suspense fallback={<PriorityToggleBtns />}>
          <PriorityToggleBtns promise={TaskIdDataPromise} />
        </Suspense>
      </FormWrapperActionState>
      <Suspense fallback={<FallbackBtn />}>
        <SuspenseDeleteTaskBtn promise={TaskIdDataPromise} />
      </Suspense>
    </>
  )
}

function FallbackField({ label }: FallbackFieldProps) {
  return (
    <MyTextField
      label={label}
      margin='dense'
    />
  )
}

function FallbackBtn() {
  return (
    <Button
      disabled
      color='error'
    >
      {ButtonName.deleteTask}
    </Button>
  )
}

interface FallbackFieldProps {
  label: TextFieldLabelProps
}
