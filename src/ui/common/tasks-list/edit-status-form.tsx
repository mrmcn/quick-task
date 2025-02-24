'use client'

import { updateStatusTasks } from '@/lib/actions'
import Checkbox from '@mui/material/Checkbox'
import { $Enums } from '@prisma/client'
import { TasksListProps } from './tasks-list'

export default function EditStatusForm({
  id,
  status,
  summary,
}: EditStatusFormProps) {
  return (
    <>
      <Checkbox
        name='status'
        onChange={(e) => updateStatusTasks(id, e.target.value as $Enums.Status)}
        value={status === 'completed' ? 'in_progress' : 'completed'}
        edge='end'
        checked={status.includes('completed')}
        inputProps={{ 'aria-labelledby': summary }}
      />
    </>
  )
}

type EditStatusFormProps = Omit<TasksListProps, 'priority' | 'details'>
