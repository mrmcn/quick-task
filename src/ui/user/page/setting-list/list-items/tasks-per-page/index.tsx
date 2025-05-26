import { ListPhrases } from '@/lib/constants/text-const'
import { fetchUserData } from '@/lib/services/queries/user'
import { getSessionData } from '@/lib/utils/get-session-data'
import PageSelect from '@/ui/user/page/setting-list/list-items/tasks-per-page/page-select'
import sxListItemIconProps from '@/ui/user/page/setting-list/styles/sx-list-item-icon-props'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default async function TasksPerPage() {
  const taskPerPage = await getTaskPerPage()

  return (
    <ListItem secondaryAction={<PageSelect taskPerPage={taskPerPage} />}>
      <ListItemIcon sx={sxListItemIconProps()}>
        <FormatListNumberedIcon />
      </ListItemIcon>
      <ListItemText slotProps={{ primary: { color: 'secondary' } }}>
        {ListPhrases.tasksPerPage}
      </ListItemText>
    </ListItem>
  )
}

async function getTaskPerPage() {
  const { userEmail } = await getSessionData()
  const response = userEmail ? await fetchUserData(userEmail) : null
  const taskPerPage = response?.data?.tasksPerPage.toString() || '3'
  return taskPerPage
}
