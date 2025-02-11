import { auth } from '@/auth'
import { deleteTask } from '@/lib/actions'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionActions from '@mui/material/AccordionActions'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { AccordionTaskProps } from './view-tasks'

export default async function AccordionTask({
  id,
  summary,
  details,
  status,
}: AccordionTaskProps) {
  const session = await auth()
  const viewStatus = status === 'in_progress' ? 'in progress' : 'completed'

  return (
    <Accordion elevation={5}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ display: 'flex' }}
        aria-controls={`panel${summary}-content`}
        id={`panel${summary}-header`}
      >
        <Typography
          component='span'
          sx={{ flexGrow: 1 }}
        >
          <Box sx={{ fontSize: 20 }}>{summary}</Box>
        </Typography>
        <Typography
          color={status === 'completed' ? 'success' : 'textSecondary'}
          sx={{ mr: '2vw' }}
        >
          {viewStatus}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          color='textPrimary'
          sx={{ ml: 5 }}
        >
          {details}
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button
          component={Link}
          href={`/dashboard/${id}/edit`}
        >
          Edit
        </Button>
        <Button
          onClick={deleteTask.bind(null, id)}
          disabled={!session}
        >
          Delete
        </Button>
      </AccordionActions>
    </Accordion>
  )
}
