import AccordionTask from '@/ui/common/accordion-tasks/accordion-task'
import { Box } from '@mui/material'
import { $Enums } from '@prisma/client'

export default function TasksDisplay({
  tasks,
}: {
  tasks: AccordionTaskProps[]
}) {
  const listItem = tasks.map(({ id, summary, details, priority }) => (
    <AccordionTask
      key={id}
      id={id}
      summary={summary}
      details={details}
      priority={priority}
    />
  ))

  return <Box sx={{ mt: '5vh' }}>{listItem}</Box>
}

export interface AccordionTaskProps {
  id: string
  summary: string
  details: string
  priority: $Enums.Priority
}
