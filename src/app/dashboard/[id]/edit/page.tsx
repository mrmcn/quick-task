import { ListButtonNames, ListFormNames } from '@/lib/constants/text-const'
import { deleteTask, updateTask } from '@/lib/services/actions/task'
import { fetchTaskIdData, TaskId } from '@/lib/services/queries/task'
import FormWrapperActionState from '@/ui/common/form/form-wrapper-action-state'
import Await from '@/lib/utils/await'
import DetailsTextField from '@/ui/common/form/text-fields/task/details'
import InputWithTaskId from '@/ui/common/form/text-fields/task/input-id'
import TitleTextField from '@/ui/common/form/text-fields/task/title'
import PriorityToggleBtns from '@/ui/dashboard/priority-toggle-btns'
import Button from '@mui/material/Button'
import { Suspense } from 'react'

export default async function EditTaskPage(props: EditTaskPageProps) {
  const params = await props.params
  const id = params.id
  const TaskIdDataPromise = fetchTaskIdData(id)

  return (
    <>
      <FormWrapperActionState
        action={updateTask}
        formName={ListFormNames.updateTask}
      >
        <Suspense fallback={<TitleTextField />}>
          <Await promise={TaskIdDataPromise}>
            <TitleTextField />
          </Await>
        </Suspense>
        <Suspense fallback={<DetailsTextField />}>
          <Await promise={TaskIdDataPromise}>
            <DetailsTextField />
          </Await>
        </Suspense>
        <Suspense fallback={<PriorityToggleBtns />}>
          <Await promise={TaskIdDataPromise}>
            <PriorityToggleBtns />
          </Await>
        </Suspense>
        <Suspense>
          <Await promise={TaskIdDataPromise}>
            <InputWithTaskId />
          </Await>
        </Suspense>
      </FormWrapperActionState>
      <Suspense fallback={<DeleteTaskBtn />}>
        <Await promise={TaskIdDataPromise}>
          <DeleteTaskBtn />
        </Await>
      </Suspense>
    </>
  )
}

function DeleteTaskBtn({ data }: Props) {
  const taskId = data?.id

  return (
    <form action={deleteTask}>
      <Button
        type='submit'
        color='error'
        disabled={!data}
      >
        {ListButtonNames.deleteTask}
      </Button>
      <input
        type='hidden'
        name='id'
        value={taskId}
      />
    </form>
  )
}

interface Props {
  data?: TaskId
}

interface EditTaskPageProps {
  params: Promise<{ id: string }>
}
