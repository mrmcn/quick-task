import { ButtonName } from '@/lib/constants/text-const'
import { deleteTask } from '@/lib/services/actions/task'
import { FetchTaskData, TaskIdData } from '@/lib/services/queries/task'
import Button from '@mui/material/Button'
import { use } from 'react'

export default function SuspenseDeleteTaskBtn({ promise }: SuspenseProps) {
  const { data } = use(promise)

  return (
    <form action={deleteTask}>
      <Button
        type='submit'
        color='error'
      >
        {ButtonName.deleteTask}
      </Button>
      <input
        type='hidden'
        name='id'
        value={data?.id}
      />
    </form>
  )
}

interface SuspenseProps {
  promise: FetchTaskData<TaskIdData>
}
