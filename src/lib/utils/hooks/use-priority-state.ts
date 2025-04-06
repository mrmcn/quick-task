import { TaskId } from '@/lib/services/queries/task'
import { Priority, Task } from '@prisma/client'
import { useCallback, useState } from 'react'

export function usePriorityState(task: TaskId | undefined) {
  const [changePriority, setPriority] = useState(
    task?.priority ?? Priority['low'],
  ) // editForm or createForm, for toggle btn
  const handlePriority = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      newPriority: Task['priority'] | null,
    ) => {
      if (newPriority !== null) setPriority(newPriority)
    },
    [],
  )

  return { changePriority, handlePriority }
}
