import { TaskId } from '@/lib/services/queries/task'

export default function InputWithTaskIdAndSearchParams({
  data,
  searchParamsString,
}: Props) {
  if (data)
    return (
      <>
        <input
          type='hidden'
          name='id'
          value={data.id}
        />
        <input
          type='hidden'
          name='searchParams'
          value={searchParamsString}
        />
      </>
    )
  return null
}

interface Props {
  data?: TaskId
  searchParamsString: string
}
