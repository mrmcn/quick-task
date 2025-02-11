import Box from '@mui/material/Box'
import { $Enums } from '@prisma/client'
import AccordionTask from './accordion-task'

export default function ViewTasks({ tasks }: { tasks: AccordionTaskProps[] }) {
  const listItem = tasks.map(({ id, summary, details, priority, status }) => (
    <AccordionTask
      key={id}
      id={id}
      summary={summary}
      details={details}
      priority={priority}
      status={status}
    />
  ))

  return <Box sx={{ mt: '5vh' }}>{listItem}</Box>
}

export interface AccordionTaskProps {
  id: string
  summary: string
  details: string
  priority: $Enums.Priority
  status: $Enums.Status
}
