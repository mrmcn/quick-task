import { TaskId } from '@/lib/services/queries/task'

export default function InputWithTaskId({ data }: Props) {
  if (data)
    return (
      <input
        type='hidden'
        name='id'
        value={data.id}
      />
    )
  return null
}

interface Props {
  data?: TaskId
}
