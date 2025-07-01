import { PAGE_VALUE, PageValue } from '@/lib/constants/data/ui-config'
import { ListPhrases } from '@/lib/constants/text-const'
import { fetchUser } from '@/lib/services/queries/user'
import PageSelect from '@/ui/user/page/setting-list/list-items/tasks-per-page/page-select'
import sxListItemIconProps from '@/ui/user/page/setting-list/styles'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default async function ListItemTasksPerPage() {
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
  const { data } = await fetchUser.uniqueData({ tasksPerPage: true })
  const taskPerPage = data?.tasksPerPage || 3

  if (PAGE_VALUE.includes(taskPerPage as PageValue)) {
    return taskPerPage as PageValue
  } else {
    return 3
  }
}
